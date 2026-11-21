import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ activeSection, onNavigate }) {
  const [time, setTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'hero', label: 'About' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'bench', label: 'Interactive Lab' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-8 py-3 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/60 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Natural Brand / Author Title */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400 transition-colors shadow-inner shrink-0">
            <span className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_#22d3ee]" />
          </div>
          <div>
            <div className="font-sans font-bold text-base sm:text-lg md:text-xl text-white tracking-tight leading-tight group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              R. Kiran Bharadwaj
            </div>
            <div className="text-xs md:text-sm text-slate-300 font-sans tracking-normal hidden sm:block mt-0.5 font-medium whitespace-nowrap">
              Embedded Systems & IoT
            </div>
          </div>
        </div>

        {/* Horizontally Scrollable Navigation Tabs */}
        <nav className="flex items-center gap-0.5 sm:gap-1 bg-slate-900/80 border border-slate-800 rounded-full p-1 backdrop-blur-md overflow-x-auto no-scrollbar scroll-smooth min-w-0 shrink">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`shrink-0 px-2.5 sm:px-3.5 py-1 text-xs font-sans font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-cyan-glow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status Controls */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 text-xs font-sans text-slate-300 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-slate-200">Available</span>
            <span className="text-slate-500">•</span>
            <span className="text-[11px] font-mono text-slate-400">{time || '00:00:00'} IST</span>
          </div>
        </div>

      </div>
    </header>
  );
}
