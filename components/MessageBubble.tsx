
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.role === Role.BOT;

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-sm ${
        isBot 
          ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200' 
          : 'bg-[#002D72] text-white rounded-tr-none'
      }`}>
        {isBot && (
          <div className="text-[10px] font-bold text-[#002D72] mb-2 uppercase tracking-wider flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
            </svg>
            ROK Navy Assistant
          </div>
        )}
        <div className={`markdown-content text-sm leading-relaxed ${!isBot ? 'text-white' : ''}`}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        <div className={`text-[10px] mt-2 opacity-60 ${isBot ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
