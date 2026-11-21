import React, { useState, useRef } from 'react';
import {
  ExternalLink, Code2, CircuitBoard,
  Check, X, Cpu, ArrowUpRight, ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';
import { projectTabs, featuredProjects } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function ProjectsSection() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleTabChange = (tabId) => {
    sound.playClick();
    setSelectedTab(tabId);
  };

  const scrollCards = (direction) => {
    sound.playClick();
    if (scrollContainerRef.current) {
      const scrollAmount = 370;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenSchematic = (project) => {
    sound.playClick();
    setActiveModalProject(project);
  };

  const handleCloseSchematic = () => {
    sound.playClick();
    setActiveModalProject(null);
  };

  // Filter projects by active tab
  const displayedProjects = featuredProjects.filter(p => {
    if (selectedTab === 'all') return true;
    return p.category === selectedTab;
  });

  return (
    <section id="projects" className="py-24 px-4 md:px-8 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-800/60">
          <div>
            <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Portfolio Projects</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
              Featured Work & Prototypes
            </h2>
          </div>

          <p className="text-slate-400 font-sans text-sm max-w-md leading-relaxed font-semibold">
            Custom RF circuits, ARM Cortex-M firmware, and end-to-end connected IoT systems built from scratch.
          </p>
        </div>

        {/* Category Filter Tabs & Carousel Navigation Controls */}
        <div className="flex items-center justify-between gap-3 mb-8">
          {/* Category Filter Tabs (Horizontally Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {projectTabs.map((tab) => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-200 border ${isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-cyan-glow'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Horizontal Carousel Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => scrollCards('left')}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCards('right')}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Cards - Horizontally Scrollable Row */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
        >
          {displayedProjects.map((project, idx) => {
            const isCyan = project.accent === 'cyan';
            return (
              <div
                key={project.id}
                className="w-[84vw] max-w-[360px] sm:w-[360px] md:w-[390px] shrink-0 snap-start group rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-card-subtle hover:shadow-cyan-glow"
              >
                <div>
                  {/* Visual Header / Diagram Banner (Reduced by 5% in height) */}
                  <div className="h-44 w-full bg-slate-950/90 border-b border-slate-800/80 relative overflow-hidden flex flex-col justify-between p-4">
                    {/* Background circuit grid */}
                    <div className="absolute inset-0 circuit-grid-overlay opacity-25 pointer-events-none" />

                    {/* Top Tag & Status Indicator */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[10px] font-mono font-medium text-slate-200 tracking-wider">
                        {project.badge}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-emerald-400'
                        }`} />
                    </div>

                    {/* Center Schematic Art / Iconography */}
                    <div className="relative z-10 flex items-center justify-center my-auto">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                        {project.category === 'hardware' && <CircuitBoard className="w-6 h-6 text-cyan-400" />}
                        {project.category === 'firmware' && <Cpu className="w-6 h-6 text-emerald-400" />}
                      </div>
                    </div>

                    {/* Bottom Category Label */}
                    <div className="relative z-10 flex items-center justify-between text-xs font-sans text-slate-400">
                      <span>{project.categoryLabel}</span>
                      <span className="text-slate-500 font-mono text-[11px]">0{idx + 1}</span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6">
                    {/* Project Title */}
                    <h3 className="text-xl font-sans font-bold text-white mb-2.5 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* 2-Sentence Summary */}
                    <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4 font-semibold">
                      {project.summary}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1 mb-3">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions: More Details --> */}
                <div className="p-5 pt-0 border-t border-slate-800/80 mt-1 flex items-center justify-between">
                  {project.id === 'rf-transmitter' || project.id === 'stm32-simon' || project.id === 'oled-hill-climb-game' || (project.codeUrl && project.codeUrl !== "https://github.com/rk-bharadwaj" && project.codeUrl !== "https://github.com") ? (
                    <a
                      href={
                        project.id === 'rf-transmitter'
                          ? "https://github.com/rk-bharadwaj/transistor-based-rf-transmitter.git"
                          : project.id === 'stm32-simon'
                          ? "https://github.com/rk-bharadwaj/hk32f103-electronic-memory-sequence-game.git"
                          : project.id === 'oled-hill-climb-game'
                          ? "https://github.com/rk-bharadwaj/oled-hill-climb-game.git"
                          : project.codeUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick()}
                      className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white text-xs font-sans font-semibold flex items-center justify-center gap-2 transition-all group/btn cursor-pointer shadow-sm"
                    >
                      <span>More Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleOpenSchematic(project)}
                      className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white text-xs font-sans font-semibold flex items-center justify-center gap-2 transition-all group/btn cursor-pointer shadow-sm"
                    >
                      <span>More Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Schematics / Demo Modal Drawer */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-3 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                  <span>Engineering Blueprint & Parameters</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-white mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              <button
                onClick={handleCloseSchematic}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content: Specifications Grid */}
            <div className="space-y-4 mb-6">
              <p className="text-xs font-sans text-slate-300 font-semibold">
                Hardware pinouts, bus protocols, and firmware parameters for this build:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {Object.entries(activeModalProject.schematicSpecs).map(([key, val], sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div className="text-slate-200">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs font-sans text-emerald-400 flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4" />
                <span>Bench Tested & Verified</span>
              </span>

              <div className="flex items-center gap-2.5">
                {activeModalProject.codeUrl && (
                  <a
                    href={activeModalProject.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-sans text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  onClick={handleCloseSchematic}
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-sans text-xs font-bold hover:bg-cyan-400 transition-all cursor-pointer"
                >
                  Close Spec
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
