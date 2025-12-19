
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#002D72] text-white py-4 px-6 shadow-md flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="bg-white p-1 rounded-full">
            <svg className="w-8 h-8 text-[#002D72]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
            </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">해군교육사령부</h1>
          <p className="text-xs opacity-80 uppercase">Republic of Korea Navy Education & Training Command</p>
        </div>
      </div>
      <div className="hidden md:block">
        <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium border border-white/20">
          정예 장병 육성의 요람
        </span>
      </div>
    </header>
  );
};

export default Header;
