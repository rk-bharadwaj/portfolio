import React from 'react';
import { CircuitBoard, Code2, Wifi } from 'lucide-react';
import { coreExpertise } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function CoreExpertise() {
  const icons = [CircuitBoard, Code2, Wifi];

  const handleCardClick = () => {
    sound.playClick();
  };

  return (
    <section id="expertise" className="py-24 px-4 md:px-8 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-slate-800/60">
          <div>
            <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>What I Do</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
              Core Engineering Disciplines
            </h2>
          </div>
        </div>

        {/* 3-Column Interactive Feature Cards with Glyph Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreExpertise.map((pillar, idx) => {
            const IconComponent = icons[idx];
            const isCyan = pillar.accentColor === 'cyan';

            return (
              <div
                key={pillar.id}
                onClick={handleCardClick}
                className={`group relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${isCyan
                  ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:shadow-cyan-glow'
                  : 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40 hover:shadow-emerald-glow'
                  }`}
              >
                <div>
                  {/* Top Icon & Number */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${isCyan
                      ? 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400 group-hover:scale-110'
                      : 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400 group-hover:scale-110'
                      }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-mono text-slate-500 font-medium">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Pillar Title */}
                  <h3 className={`text-2xl font-sans font-bold text-white mb-4 transition-colors ${isCyan ? 'group-hover:text-cyan-400' : 'group-hover:text-emerald-400'
                    }`}>
                    {pillar.title}
                  </h3>

                  {/* Verbatim Description */}
                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6 font-semibold">
                    "{pillar.description}"
                  </p>

                  {/* Specialized Capability Chips */}
                  <div className="space-y-2 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-full bg-slate-950/70 border border-slate-800 text-slate-300 text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer with Glyph Progress Pill */}
                <div className="pt-6 mt-8 border-t border-slate-800/80 flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2">
                    {/* Micro Glyph Segment Bar */}
                    <span className={`w-2 h-2 rounded-full ${isCyan ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'}`} />
                    <span className={`font-mono text-[11px] font-semibold ${isCyan ? 'text-cyan-400' : 'text-emerald-400'}`}>
                      {pillar.badge}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
