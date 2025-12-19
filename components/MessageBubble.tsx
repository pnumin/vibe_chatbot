
import React from 'react';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.role === Role.BOT;

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${
        isBot 
          ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200' 
          : 'bg-[#002D72] text-white rounded-tr-none'
      }`}>
        {isBot && (
          <div className="text-[10px] font-bold text-[#002D72] mb-1 uppercase tracking-wider">
            ROK Navy Assistant
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div className={`text-[10px] mt-2 opacity-60 ${isBot ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
