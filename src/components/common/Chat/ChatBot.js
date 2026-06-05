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
    const textareaRef = useRef(null);

    const autoResize = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        const max = 200; // px, match CSS max-height
        const newH = Math.min(el.scrollHeight, max);
        el.style.height = newH + 'px';
    };

    useEffect(() => {
        if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages, open]);

    // focus textarea when chat opens
    useEffect(() => {
        if (open) {
            const t = setTimeout(() => {
                textareaRef.current?.focus();
            }, 180);
            return () => clearTimeout(t);
        }
    }, [open]);

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

    const handleInputChange = (e) => {
        setInput(e.target.value);
        autoResize();
    };

    

 return (
        <div className="hc-chat-container">

            {/* ── Cửa sổ chat ── */}
            <div className={`hc-chat-window${open ? ' active' : ''}`}>

                {/* Header */}
                <div className="hc-chat-header">
                    <div style={{ flex: 1 }}>
                        <div className="hc-chat-title">Trợ lý AI</div>
                        <div className="hc-chat-status">Đang hoạt động</div>
                    </div>
                </div>

                {/* Body */}
                <div className="hc-chat-body">
                    {messages.length === 0 && (
                        <div className="hc-chat-welcome">
                            <div className="welcome-icon">🤖</div>
                            <p>Xin chào! Tôi có thể giúp gì cho bạn hôm nay?</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`hc-chat-msg ${msg.role}`}>
                            <div className="hc-chat-msg-text">{msg.text}</div>
                        </div>
                    ))}

                    {loading && (
                        <div className="hc-chat-msg assistant">
                            <div className="hc-chat-msg-text typing-indicator">
                                <span /><span /><span />
                            </div>
                        </div>
                    )}

                    {/* Anchor để auto-scroll */}
                    <div ref={bottomRef} />
                </div>

                {/* Footer */}
                <div className="hc-chat-footer">
                    <textarea
                        placeholder="Nhập tin nhắn..."
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={onKeyDown}
                        disabled={loading}
                    />
                    <button
                        className="send-btn"
                        onClick={send}
                        disabled={!input.trim() || loading}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Nút mở/đóng với robot CHIBI cử động ── */}
            <button
                className={`hc-chat-icon${open ? ' open' : ''}`}
                onClick={() => setOpen(v => !v)}
                aria-label="Mở chat"
                aria-expanded={open}
            >
                {open ? (
                    /* Icon X khi đang mở */
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6"  y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    /* Robot Chibi SVG cử động khi đóng */
<svg className="chibi-robot" width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Anten ngôi sao */}
    <g className="cute-antenna">
        <rect x="48" y="20" width="4" height="15" fill="white" />
        <polygon points="50,4 52.5,11 60,11 54,15.5 56.5,23 50,18.5 43.5,23 46,15.5 40,11 47.5,11" fill="#FFE066" />
    </g>
    
    {/* Tai */}
    <rect x="15" y="48" width="18" height="22" rx="6" fill="white" />
    <rect x="67" y="48" width="18" height="22" rx="6" fill="white" />
    
    {/* Khuôn mặt */}
    <rect x="22" y="32" width="56" height="45" rx="22" fill="white" />
    
    {/* Má hồng */}
    <ellipse cx="27" cy="62" rx="7" ry="4" fill="#FFB0C1" />
    <ellipse cx="73" cy="62" rx="7" ry="4" fill="#FFB0C1" />
    
    {/* Mắt to tròn */}
    <g className="cute-eyes">
        {/* Mắt trái */}
        <circle cx="37" cy="51" r="11" fill="#864BFF" />
        <circle cx="41" cy="47" r="3.5" fill="white" /> {/* Đốm sáng */}
        
        {/* Mắt phải */}
        <circle cx="63" cy="51" r="11" fill="#864BFF" />
        <circle cx="67" cy="47" r="3.5" fill="white" /> {/* Đốm sáng */}
    </g>
    
    {/* Miệng cười */}
    <path d="M 43 65 Q 50 73 57 65" fill="none" stroke="#864BFF" strokeWidth="3.5" strokeLinecap="round" />
</svg>
                )}
            </button>

        </div>
    );
}