const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

const PORT = process.env.PORT || 4000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
// In-memory conversation store: { conversationId -> [{role:'user'|'assistant', text}, ...] }
const CONVERSATIONS = new Map();
const MAX_HISTORY_ENTRIES = 10; // number of recent turns to include in context
const MAX_HISTORY_CHARS = 800; // maximum characters for summarized history

function summarizeHistory(history) {
    // Create a short summary by keeping role labels and trimming each turn
    const parts = history.map(h => {
        const txt = (h.text || '').replace(/\s+/g, ' ').trim();
        const short = txt.length > 120 ? txt.slice(0, 117).trim() + '...' : txt;
        return `${h.role === 'user' ? 'User' : 'Assistant'}: ${short}`;
    });
    let summary = parts.join(' ; ');
    if (summary.length > MAX_HISTORY_CHARS) summary = summary.slice(summary.length - MAX_HISTORY_CHARS);
    return summary;
}

async function fetchProducts() {
    try {
        const resp = await axios.get(`${BACKEND_URL}/api/services/all-services`, {
            params: { page: 0, size: 500 }
        });
        const data = resp.data;
        if (Array.isArray(data)) return data;
        if (data && data.content) return data.content;
        return [];
    } catch (e) {
        console.error('Failed to fetch products for context:', e.message);
        return [];
    }
}

function buildProductText(products) {
    return products.slice(0, 200).map(p => {
        const name = p.name || p.title || p.serviceName || p.service || 'Unknown';
        const desc = p.description || p.shortDescription || p.detail || '';
        const price = p.price != null ? ` | Giá: ${p.price}` : '';
        return `- ${name}${price}: ${desc}`;
    }).join('\n');
}

function buildPrompt(productText, message) {
    // Ask the model to keep answers very short to save tokens.
    return `Bạn là trợ lý tư vấn sản phẩm của quán cà phê Hương Coffee.
LUÔN trả lời bằng ngôn ngữ tự nhiên, thân thiện. TUYỆT ĐỐI KHÔNG xuất ra JSON hay code block
Chỉ trả lời các câu hỏi liên quan đến sản phẩm trong menu (gợi ý món, mô tả ngắn, so sánh, tìm món theo sở thích).
Nếu gợi ý, liệt kê tối đa 3 món, mỗi món 2-4 từ mô tả. Trả lời bằng tiếng Việt, thân thiện.
Nếu không chắc về giá hoặc tình trạng còn hàng, nói rõ và đề nghị khách xem menu hoặc liên hệ nhân viên.
Nếu khách hỏi món không có trong danh sách: 'Xin lỗi, nhà hàng không có món đó.

DANH SÁCH SẢN PHẨM:
${productText || '(Không tải được danh sách sản phẩm — hãy đề nghị khách thử lại sau.)'}

Khách hàng: ${message}`;
}

function extractGeminiReply(data) {
    const parts = data?.candidates?.[0]?.content?.parts;
    if (parts?.length) return parts.map(p => p.text || '').join('').trim();
    return '';
}

async function callGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 120 }
    };
    const aiResp = await axios.post(url, body);
    return extractGeminiReply(aiResp.data);
}

function fallbackReply(message, products) {
    const lower = message.toLowerCase();
    const matches = products.filter(p => {
        const name = (p.name || p.title || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        return lower.includes(name) || lower.split(' ').some(w => w.length > 2 && (name.includes(w) || desc.includes(w)));
    }).slice(0, 3);

    if (matches.length) {
        // concise suggestions separated by semicolon
        return matches.map(m => `${m.name || m.title}`).join('; ');
    }
    return 'Bạn muốn loại nào: cà phê, trà, ngọt, đặc sản, hay khoảng giá?';
}

app.post('/api/chat', async (req, res) => {
    const { message } = req.body || {};
    const conversationId = req.body.conversationId || req.headers['x-conversation-id'] || req.ip;
    if (!message || !message.trim()) return res.status(400).json({ error: 'Missing message' });

    // load and update conversation history
    const convKey = String(conversationId);
    const history = CONVERSATIONS.get(convKey) || [];
    history.push({ role: 'user', text: message.trim() });
    // keep only recent entries
    if (history.length > MAX_HISTORY_ENTRIES * 2) history.splice(0, history.length - MAX_HISTORY_ENTRIES * 2);
    CONVERSATIONS.set(convKey, history);

    const products = await fetchProducts();
    const productText = buildProductText(products);

    // Build short conversational context from history (last N user+assistant turns)
    const recent = history.slice(-MAX_HISTORY_ENTRIES * 2); // user+assistant pairs
    let contextText = recent.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
    // If history is long, use a summarized form to save tokens
    if (history.length > MAX_HISTORY_ENTRIES * 2) {
        const summary = summarizeHistory(history.slice(-MAX_HISTORY_ENTRIES * 4));
        contextText = 'SUMMARY: ' + summary;
    }

    const prompt = `${contextText ? 'CONTEXT:\n' + contextText + '\n\n' : ''}${buildPrompt(productText, message.trim())}`;

    try {
        let reply = '';
        if (GEMINI_API_KEY) {
            reply = await callGemini(prompt);
        } else {
            reply = fallbackReply(message, products);
        }
        // store assistant reply into conversation history
        if (reply) {
            const hist = CONVERSATIONS.get(convKey) || [];
            hist.push({ role: 'assistant', text: reply });
            if (hist.length > MAX_HISTORY_ENTRIES * 2) hist.splice(0, hist.length - MAX_HISTORY_ENTRIES * 2);
            CONVERSATIONS.set(convKey, hist);
        }
        reply = reply || 'Xin lỗi, tôi không trả lời được ngay bây giờ.';
        return res.json({ reply });
    } catch (e) {
        console.error('Chat proxy error:', e.response ? e.response.data : e.message);
        return res.status(500).json({ error: 'AI request failed' });
    }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Clear conversation history for a given conversationId
app.post('/api/chat/clear', (req, res) => {
    const conversationId = req.body.conversationId || req.headers['x-conversation-id'] || req.ip;
    const convKey = String(conversationId);
    CONVERSATIONS.delete(convKey);
    return res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Chat proxy running on port ${PORT}`));
