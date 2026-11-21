import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2, Play, RotateCcw, Volume2, VolumeX, Cpu
} from 'lucide-react';

export default function InteractiveBench() {
  // Playable STM32 Simon Game State
  const [simonStatus, setSimonStatus] = useState('IDLE'); // IDLE, SHOWING, PLAYING, GAME_OVER
  const [simonSequence, setSimonSequence] = useState([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [simonScore, setSimonScore] = useState(0);
  const [simonHighScore, setSimonHighScore] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // Dedicated Web Audio Context for STM32 Game Only
  const audioCtxRef = useRef(null);

  const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch (e) { }
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (!next) {
        getAudioContext();
      }
      return next;
    });
  };

  const playGameTone = (freq, duration = 0.25, type = 'triangle') => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) { }
  };

  const playGameSuccess = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [
        { freq: 659.25, delay: 0, dur: 0.15 },
        { freq: 880.00, delay: 0.1, dur: 0.25 }
      ];

      notes.forEach(({ freq, delay, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.18, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
    } catch (e) { }
  };

  const playGameError = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(115, now);
      osc.frequency.linearRampToValueAtTime(75, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) { }
  };

  const playGameStart = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) { }
  };

  const pads = [
    { id: 0, color: 'border-emerald-500 text-emerald-400', activeBg: 'bg-emerald-500 shadow-emerald-glow', name: 'Note E4', freq: 329.63 },
    { id: 1, color: 'border-cyan-500 text-cyan-400', activeBg: 'bg-cyan-500 shadow-cyan-glow', name: 'Note C#4', freq: 277.18 },
    { id: 2, color: 'border-amber-400 text-amber-400', activeBg: 'bg-amber-400 shadow-[0_0_20px_#fbbf24]', name: 'Note A3', freq: 220.00 },
    { id: 3, color: 'border-indigo-400 text-indigo-400', activeBg: 'bg-indigo-400 shadow-[0_0_20px_#818cf8]', name: 'Note E3', freq: 164.81 }
  ];

  const startSimonGame = () => {
    playGameStart();
    const firstStep = Math.floor(Math.random() * 4);
    const newSeq = [firstStep];
    setSimonSequence(newSeq);
    setSimonScore(0);
    setSimonStatus('SHOWING');
    playSimonSequence(newSeq);
  };

  const playSimonSequence = (sequence) => {
    setSimonStatus('SHOWING');
    sequence.forEach((padId, index) => {
      setTimeout(() => {
        highlightPad(padId);
        if (index === sequence.length - 1) {
          setTimeout(() => {
            setSimonStatus('PLAYING');
            setPlayerIndex(0);
          }, 450);
        }
      }, (index + 1) * 550);
    });
  };

  const highlightPad = (padId) => {
    setActivePad(padId);
    playGameTone(pads[padId].freq, 0.25, 'triangle');
    setTimeout(() => {
      setActivePad(null);
    }, 300);
  };

  const handlePadClick = (padId) => {
    if (simonStatus !== 'PLAYING') return;

    highlightPad(padId);

    if (padId === simonSequence[playerIndex]) {
      const nextIndex = playerIndex + 1;
      if (nextIndex === simonSequence.length) {
        const nextScore = simonScore + 1;
        setSimonScore(nextScore);
        if (nextScore > simonHighScore) {
          setSimonHighScore(nextScore);
        }

        playGameSuccess();

        const nextStep = Math.floor(Math.random() * 4);
        const nextSeq = [...simonSequence, nextStep];
        setSimonSequence(nextSeq);
        setSimonStatus('SHOWING');
        setTimeout(() => {
          playSimonSequence(nextSeq);
        }, 800);
      } else {
        setPlayerIndex(nextIndex);
      }
    } else {
      playGameError();
      setSimonStatus('GAME_OVER');
    }
  };

  // ESP32 SSD1306 OLED Physics Engine State
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [simDistance, setSimDistance] = useState(73);
  const [simFuel, setSimFuel] = useState(65);
  const [simCoins, setSimCoins] = useState(11);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const simStateRef = useRef({
    scrollX: 73 * 6,
    distance: 73,
    fuel: 65,
    coins: 11,
    wheelAngle: 0
  });

  useEffect(() => {
    if (!isSimRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const localState = simStateRef.current;

    const render = () => {
      const speed = isDriving && localState.fuel > 0 ? 1.5 : 0.7;
      if (isDriving && localState.fuel > 0) {
        localState.fuel = Math.max(0, localState.fuel - 0.08);
      }
      localState.scrollX += speed;
      localState.distance += speed * 0.12;
      localState.wheelAngle += speed * 0.22;

      // 128x64 display buffer
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 128, 64);

      // Cyan monochrome pixel color (#22d3ee)
      ctx.fillStyle = '#22d3ee';
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1;

      // HUD: Distance
      ctx.font = 'bold 8px monospace';
      ctx.textBaseline = 'top';
      ctx.fillText(`${Math.floor(localState.distance)}m`, 3, 3);

      // HUD: Fuel gauge
      ctx.strokeRect(47, 4, 34, 6);
      const fuelW = Math.max(0, Math.min(32, (localState.fuel / 100) * 32));
      ctx.fillRect(48, 5, fuelW, 4);

      // HUD: Dollar/coins
      ctx.fillText(`$${localState.coins}`, 85, 3);

      // Terrain function
      const getTerrainY = (wx) => {
        return 42 + Math.sin(wx * 0.045) * 8 + Math.cos(wx * 0.02) * 4;
      };

      // Surface line & dotted fill
      for (let x = 0; x < 128; x++) {
        const ty = Math.floor(getTerrainY(x + localState.scrollX));
        ctx.fillRect(x, ty, 1, 2);

        for (let y = ty + 3; y < 64; y += 3) {
          if ((x + y + Math.floor(localState.scrollX * 0.25)) % 4 === 0) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // Floating Coins
      const spacing = 80;
      for (let i = 0; i < 3; i++) {
        const coinWX = Math.floor((localState.scrollX + 60) / spacing) * spacing + i * spacing;
        const screenX = coinWX - localState.scrollX;
        if (screenX >= -10 && screenX <= 138) {
          const coinY = Math.floor(getTerrainY(coinWX) - 13 - Math.sin((coinWX + localState.scrollX) * 0.06) * 3);
          ctx.strokeRect(screenX - 3, coinY - 3, 6, 6);
          ctx.fillRect(screenX - 1, coinY - 1, 2, 2);

          if (Math.abs(screenX - 38) < 8 && Math.abs(coinY - 36) < 14) {
            localState.coins += 1;
            localState.fuel = Math.min(100, localState.fuel + 20);
          }
        }
      }

      // Rover / Buggy
      const carX = 36;
      const wb = 22;
      const xB = carX - wb / 2;
      const xF = carX + wb / 2;
      const yB = getTerrainY(xB + localState.scrollX);
      const yF = getTerrainY(xF + localState.scrollX);
      const carY = (yB + yF) / 2 - 8;
      const angle = Math.atan2(yF - yB, wb);

      ctx.save();
      ctx.translate(carX, carY);
      ctx.rotate(angle);

      // Chassis
      ctx.fillRect(-12, 1, 24, 3);
      // Cabin frame
      ctx.strokeRect(-7, -7, 14, 8);
      // Roll cage
      ctx.beginPath();
      ctx.moveTo(-7, -7);
      ctx.lineTo(-12, 2);
      ctx.stroke();
      // Driver helmet
      ctx.fillRect(-2, -9, 5, 5);

      // Wheels
      const drawWheel = (wx, wy) => {
        ctx.save();
        ctx.translate(wx, wy);
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.rotate(localState.wheelAngle);
        ctx.beginPath();
        ctx.moveTo(-6, 0); ctx.lineTo(6, 0);
        ctx.moveTo(0, -6); ctx.lineTo(0, 6);
        ctx.moveTo(-4, -4); ctx.lineTo(4, 4);
        ctx.moveTo(4, -4); ctx.lineTo(-4, 4);
        ctx.stroke();
        ctx.restore();
      };

      drawWheel(-10, 5);
      drawWheel(10, 5);

      ctx.restore();

      setSimDistance(localState.distance);
      setSimFuel(localState.fuel);
      setSimCoins(localState.coins);

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isSimRunning, isDriving]);

  const handleSimReset = () => {
    simStateRef.current = {
      scrollX: 73 * 6,
      distance: 73,
      fuel: 65,
      coins: 11,
      wheelAngle: 0
    };
    setSimDistance(73);
    setSimFuel(65);
    setSimCoins(11);
  };

  const handleDriveToggle = () => {
    if (!isSimRunning) {
      setIsSimRunning(true);
    }
    setIsDriving(prev => !prev);
  };

  return (
    <section id="bench" className="py-24 px-4 md:px-8 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-slate-800/60">
          <div>
            <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Interactive Hardware Prototypes</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
              STM32 & ESP32 Interactive Lab
            </h2>
          </div>

          <p className="text-slate-400 font-sans text-sm max-w-md leading-relaxed font-semibold">
            Try out the playable STM32 Simon game here, and take a look at my ESP32 Hill Climb OLED project.
          </p>
        </div>

        {/* 2-Column Bento Bench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: Playable STM32 Simon Game (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-card-subtle flex flex-col justify-between h-full">

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 text-xs font-sans">
                <span className="text-slate-200 flex items-center gap-2 font-semibold">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                  <span>Playable Emulator</span>
                </span>
                <button
                  onClick={toggleMute}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all text-xs font-sans cursor-pointer ${isMuted
                    ? 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
                    }`}
                  title={isMuted ? "Click to turn sound on" : "Click to mute sound"}
                  aria-label={isMuted ? "Turn sound on" : "Mute sound"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-mono">Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold">Sound On</span>
                    </>
                  )}
                </button>
              </div>

              {/* 4 Interactive Colored LED Pads (2x2 grid) */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {pads.map((pad) => (
                  <button
                    key={pad.id}
                    onClick={() => handlePadClick(pad.id)}
                    disabled={simonStatus !== 'PLAYING'}
                    className={`h-[96px] rounded-2xl border-2 transition-all duration-100 flex flex-col items-center justify-center p-3 relative overflow-hidden ${pad.color} ${activePad === pad.id ? pad.activeBg : 'bg-slate-950 hover:bg-slate-800'
                      } ${simonStatus !== 'PLAYING' ? 'cursor-not-allowed opacity-85' : 'cursor-pointer active:scale-95'}`}
                  >
                    <span className="text-sm font-mono font-bold tracking-wider">
                      {pad.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 opacity-80 mt-1">
                      {pad.freq.toFixed(1)} Hz
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Game Controls & Status */}
            <div className="h-[52px] rounded-2xl bg-slate-950 border border-slate-800 px-3 sm:px-4 flex items-center justify-between text-xs font-sans overflow-hidden">
              {/* Left: Interactive Controls / Live Status */}
              <div className="flex items-center gap-2">
                {simonStatus === 'IDLE' && (
                  <button
                    onClick={startSimonGame}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs tracking-wide hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-cyan-glow cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Game</span>
                  </button>
                )}

                {simonStatus === 'SHOWING' && (
                  <div className="text-xs text-amber-400 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="truncate">Watch note pattern...</span>
                  </div>
                )}

                {simonStatus === 'PLAYING' && (
                  <div className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="truncate">Your turn • Repeat</span>
                  </div>
                )}

                {simonStatus === 'GAME_OVER' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400 font-mono hidden sm:inline">Wrong note!</span>
                    <button
                      onClick={startSimonGame}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try Again</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Right: Score & Best */}
              <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-xs whitespace-nowrap pl-2">
                <span className="text-slate-400 text-[11px] sm:text-xs">
                  Score: <strong className="text-cyan-400">{simonScore}</strong>
                </span>
                <span className="text-slate-600 text-[10px]">•</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">
                  Best: <strong className="text-emerald-400">{simonHighScore}</strong>
                </span>
              </div>
            </div>

          </div>

          {/* Right: Just the image with name at top left */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-card-subtle flex flex-col justify-start h-full">
            <div className="flex items-center pb-4 border-b border-slate-800 mb-6 text-xs font-sans">
              <span className="text-slate-200 flex items-center gap-2 font-semibold">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>ESP32 based Hill-Climb-Game</span>
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center p-2">
              <img
                src="/oled-hill-climb.jpg"
                alt="ESP32 OLED Physics Engine"
                className="w-full h-auto object-contain rounded-xl select-none"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
