// Sound disabled - zero audio context, completely silent
class SoundEngine {
  init() {}
  setMuted() {}
  isMuted() { return true; }
  playClick() {}
  playToggle() {}
  playTone() {}
  playSuccess() {}
  playGlitch() {}
}

export const sound = new SoundEngine();
