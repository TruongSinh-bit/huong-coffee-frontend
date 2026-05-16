import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Link } from 'react-router-dom';
import './NewsNotification.css';

const NewsNotification = ({ onNewNotifications, isDropdownOpen }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onStompError: (error) => {
                console.error('STOMP error', error);
            },
            onWebSocketClose: () => {
                console.error('WebSocket connection closed');
            }
        });

        stompClient.onConnect = () => {
            console.log('Connected to WebSocket');

            stompClient.subscribe('/topic/news', (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => {
                    const updatedMessages = [newMessage, ...prevMessages];
                    onNewNotifications(updatedMessages.length);
                    return updatedMessages;
                });
            });
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [onNewNotifications]);

    return (
        <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
            <div className={`dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`} style={{ width: '300px' }}>
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <Link className="dropdown-item" key={msg.newsId} to={`/news/${msg.newsId}`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <strong>{msg.title}</strong>
                            <p className="notification-content">
                                {msg.content}
                            </p>
                        </Link>
                    ))
                ) : (
                    <div className="dropdown-item">No new notifications</div>
                )}
            </div>
        </li>
    );
};

export default NewsNotification;
