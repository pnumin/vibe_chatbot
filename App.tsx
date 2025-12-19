
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import { Message, Role } from './types';
import { getGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: Role.BOT,
      content: "필승! 해군교육사령부 안내 챗봇입니다. 무엇을 도와드릴까요?\n부대 개요, 역사, 편성, 상징 등에 대해 답변해 드릴 수 있습니다.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const botResponseText = await getGeminiResponse(text);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: Role.BOT,
      content: botResponseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#002D72] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#002D72] rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 bg-[#002D72] rounded-full animate-bounce [animation-delay:-.5s]"></div>
                </div>
                <span className="text-xs text-slate-500 font-medium">정보 검색 중...</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-2 text-[10px] text-center text-slate-400">
          이 챗봇은 대한민국 해군교육사령부의 공식 배포 자료를 기반으로 답변합니다.
        </div>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default App;
