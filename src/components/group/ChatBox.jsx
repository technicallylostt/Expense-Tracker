import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import '../../styles/ChatBox.css';

const ChatBox = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="chat-box">
      <h3>Group Chat</h3>
      
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className="message-item">
            <div className="message-header">
              <span className="message-user">{message.user}</span>
              <span className="message-time">{formatTimestamp(message.timestamp)}</span>
            </div>
            <p className="message-text">{message.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button" disabled={!newMessage.trim()}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatBox; 