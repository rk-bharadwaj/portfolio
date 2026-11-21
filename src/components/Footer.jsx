import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 px-4 md:px-8 border-t border-slate-800 bg-slate-950/70 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Footer Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-slate-800/80 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-white mb-1.5 tracking-tight">
              {personalInfo.name}
            </div>
            <div className="text-xs font-mono text-cyan-400">
              {personalInfo.headline} // {personalInfo.subheadline}
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 text-xs font-mono tracking-wider text-slate-300 hover:text-white transition-all flex items-center gap-2 group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Technical Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{personalInfo.location}</span>
          </div>

          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} {personalInfo.name} • Embedded Systems & IoT Architect
          </div>
        </div>

      </div>
    </footer>
  );
}
