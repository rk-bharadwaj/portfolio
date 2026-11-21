import React from 'react';
import { Layers, Code2, Globe, Wrench } from 'lucide-react';
import { skillGroups } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function SkillsMatrix() {
  const icons = [Layers, Code2, Globe, Wrench];

  return (
    <section id="skills" className="py-24 px-4 md:px-8 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-slate-800/60">
          <div>
            <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Technical Stack</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
              Skills & Tools
            </h2>
          </div>

          <p className="text-slate-400 font-sans text-sm max-w-md leading-relaxed font-semibold">
            Proficient across hardware prototyping, low-level microcontroller firmware, and connected IoT solutions.
          </p>
        </div>

        {/* 4 Categorized Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, idx) => {
            const Icon = icons[idx];
            const isCyan = group.accent === 'cyan';

            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-card-subtle"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isCyan
                        ? 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400'
                        : 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400'
                        }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-lg sm:text-xl text-white">
                          {group.category}
                        </h3>
                        <span className="text-xs font-sans text-slate-400">
                          {idx === 0 && "Schematic & board design"}
                          {idx === 1 && "Low-level microcontroller code"}
                          {idx === 2 && "Connected interfaces & web apps"}
                          {idx === 3 && "Board servicing & hardware repair"}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-slate-500 font-medium">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Sleek Pill-Shaped Badges */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => sound.playClick()}
                        className={`group px-4 py-2 rounded-full border text-xs sm:text-sm font-sans tracking-normal transition-all duration-200 cursor-pointer flex items-center gap-2 ${isCyan
                          ? 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-cyan-glow'
                          : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-emerald-glow'
                          }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-150 ${isCyan ? 'bg-cyan-400' : 'bg-emerald-400'
                          }`} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-sans text-slate-400">
                  <span>Hands-on project experience</span>
                  <span className={isCyan ? 'text-cyan-400 font-medium font-mono text-[11px]' : 'text-emerald-400 font-medium font-mono text-[11px]'}>
                    PROVEN
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
