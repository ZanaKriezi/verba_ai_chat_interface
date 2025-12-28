import React, { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import './App.css';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ChatResponse {
  response: string;
  timestamp: string;
}

function App(){
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef=useRef<HTMLDivElement>(null);
  const API_URL='http://localhost:5000/api/chat';

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([{
      id: Date.now(),
      text: "Hello! I'm your Verba AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
    }, []);

    const handleSend = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      if(!inputMessage.trim()) return; 

      const userMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.post<ChatResponse>(API_URL, {
          message: userMessage.text
        });

        const botMessage: Message = {
          id: Date.now() + 1,
          text: response.data.response,
          sender: 'bot',
          timestamp: response.data.timestamp
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (err) {
        setError('Failed to fetch response. Please try again.');
      } finally {
        setIsLoading(false);
      }
};

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value);
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return ( 
    <div className="App">
      <div className="chat-container">

        <div className="chat-header">
          <h1>Verba AI Assistant</h1>
          <p>Customer Support Chat</p>
        </div>

        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="timestamp">{formatTime(msg.timestamp)}</span>
              </div>
              </div>
          ))}

          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}          

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSend} className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !inputMessage.trim()}>
            Send
          </button>
        </form>

      </div>
    </div>
  );
}

export default App;

