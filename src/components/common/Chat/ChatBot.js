import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './chat.css';

const CHAT_API_URL = process.env.REACT_APP_CHAT_API_URL || 'http://localhost:4001/api/chat';

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages, open]);

    const send = async () => {
        if (!input.trim() || loading) return;
        const text = input.trim();
        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');
        setLoading(true);
        try {
            const resp = await axios.post(CHAT_API_URL, { message: text });
            const reply = resp.data?.reply || 'Xin lỗi, tôi không trả lời được ngay bây giờ.';
            setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
        } catch (e) {
            console.error('Chat error:', e.response ? e.response.data : e.message);
            setMessages(prev => [...prev, { role: 'assistant', text: 'Lỗi khi gọi dịch vụ tư vấn. Vui lòng thử lại sau.' }]);
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <div>
            <div className={`hc-chat-icon ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} title="Tư vấn sản phẩm">
                💬
            </div>

            {open && (
                <div className="hc-chat-window">
                    <div className="hc-chat-header">Tư vấn sản phẩm</div>
                    <div className="hc-chat-body">
                        {messages.length === 0 && (
                            <div className="hc-chat-welcome">Xin chào! Tôi có thể gợi ý món theo sở thích hoặc tìm sản phẩm trong menu cho bạn.</div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`hc-chat-msg ${m.role}`}>
                                <div className="hc-chat-msg-text">{m.text}</div>
                            </div>
                        ))}
                        <div ref={bottomRef}></div>
                    </div>
                    <div className="hc-chat-footer">
                        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKeyDown} placeholder="Hỏi về sản phẩm..." />
                        <button onClick={send} disabled={loading}>{loading ? '...' : 'Gửi'}</button>
                    </div>
                </div>
            )}
        </div>
    )
}
