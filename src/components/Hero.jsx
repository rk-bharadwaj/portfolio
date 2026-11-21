import React, { useState } from 'react';
import { ArrowDownRight, User, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Hero({ onNavigate }) {
  const [photoError, setPhotoError] = useState(false);

  const handleAction = (target) => {
    sound.playClick();
    onNavigate(target);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 md:px-8 border-b border-slate-800/60 overflow-hidden">

      {/* Subtle organic ambient illumination */}
      <div className="absolute top-1/4 -right-20 w-[32rem] h-[32rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[28rem] h-[28rem] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Availability Status Badge */}
        <div className="flex items-center gap-3 mb-8 text-xs font-sans">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-sans text-xs tracking-wide text-slate-200 font-bold">Available for engineering roles & consulting</span>
          </div>
        </div>

        {/* Main Grid: Headline & Bio (8 cols) + Engineer Photo Slot (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">

          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-8 space-y-6">

            {/* Human Introduction */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-sans text-cyan-400 font-bold tracking-wider flex items-center gap-2 uppercase">
                <span className="w-1.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <span>Hi, I'm {personalInfo.name}</span>
              </p>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-white tracking-tight leading-[1.08]">
                {personalInfo.headline}
              </h1>
            </div>

            {/* Sub-headline */}
            <h2 className="text-xl sm:text-2xl font-sans text-slate-200 font-bold tracking-tight">
              {personalInfo.subheadline}
            </h2>

            {/* Bio Summary */}
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl font-semibold">
              "{personalInfo.bio}"
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => handleAction('projects')}
                className="relative px-7 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-sans text-sm tracking-wide font-bold transition-all duration-200 flex items-center gap-2 shadow-cyan-glow group overflow-hidden"
              >
                <span>View My Projects</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => handleAction('contact')}
                className="px-7 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-200 hover:text-white font-sans text-sm tracking-wide font-medium transition-all duration-200"
              >
                Contact Me
              </button>
            </div>

          </div>

          {/* Right Column: Clean Engineer Photo Frame */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full max-w-xs sm:max-w-sm rounded-3xl bg-slate-900/80 border border-slate-700/70 p-4 backdrop-blur-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 shadow-2xl">

              {/* Top Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-sans text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-200 font-medium">Profile</span>
                </span>
                <span className="text-slate-400 font-ndot text-[11px] tracking-wider uppercase">Full-Stack IoT</span>
              </div>

              {/* Photo Area */}
              <div className="my-3 aspect-[4/5] rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden relative flex items-center justify-center">
                {!photoError ? (
                  <img
                    src="/profile.jpg"
                    alt={personalInfo.name}
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover object-[center_25%] transition-all duration-500 scale-100 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-b from-slate-900 to-slate-950">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white tracking-wide uppercase">
                        {personalInfo.name}
                      </div>
                      <div className="text-xs font-sans text-slate-400 mt-1 font-semibold">
                        Photo placeholder • Ready for image
                      </div>
                    </div>
                  </div>
                )}

                {/* Soft natural vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Bottom Photo Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-sm font-bold text-white tracking-wide uppercase">
                    {personalInfo.name}
                  </div>
                  <div className="text-xs text-cyan-400 font-semibold">
                    Embedded Hardware Architect
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-2 text-xs font-sans text-slate-400 flex items-center justify-between">
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Embedded Systems
                </span>
                <span className="text-slate-400 font-ndot text-[11px] tracking-wider uppercase">PCB & IoT</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Skills Marquee Running Strip */}
      <div className="mt-6 -mx-4 md:-mx-8 border-y border-slate-800/80 bg-slate-950/70 py-3.5 overflow-hidden flex select-none relative">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center shrink-0 gap-8 text-xs font-sans tracking-wider text-slate-300 whitespace-nowrap animate-marquee uppercase pl-4">
          <span className="text-emerald-400 font-bold">• Hardware Prototyping & PCB Design</span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-cyan-400 font-bold">C & C++ Low-Level Firmware</span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-white font-bold">ARM Cortex-M (STM32) & Xtensa (ESP32)</span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-cyan-400 font-bold">Responsive Web Dashboards</span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-white font-bold">Component-Level Hardware Diagnostics</span>
          <span className="text-slate-600 font-bold">•</span>
        </div>
        <div className="flex items-center shrink-0 gap-8 text-xs font-sans tracking-wider text-slate-300 whitespace-nowrap animate-marquee uppercase pl-4" aria-hidden="true">
          <span className="text-emerald-400 font-bold">• Hardware Prototyping & PCB Design</span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-cyan-400 font-bold">C & C++ Low-Level Firmware</span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-white font-bold">ARM Cortex-M (STM32) & Xtensa (ESP32)</span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-cyan-400 font-bold">Responsive Web Dashboards</span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-white font-bold">Component-Level Hardware Diagnostics</span>
          <span className="text-slate-600 font-bold">•</span>
        </div>
      </div>

    </section>
  );
}
