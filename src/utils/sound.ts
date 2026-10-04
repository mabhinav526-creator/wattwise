// Web Audio synthesizer for crisp, tactile UI haptic feedback & chimes (no external assets required)
class SoundFxService {
  private ctx: AudioContext | null = null;
  private lastPlayTime: number = 0;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Premium Apple iPhone Taptic / Glass Tap sound
   * Damped woody transient + acoustic glass tick (18ms duration, zero trailing ring)
   */
  playIPhoneTapSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      // Rate limit clicks under 35ms to prevent clipping on rapid gestures
      if (now - this.lastPlayTime < 0.035) return;
      this.lastPlayTime = now;

      // 1. High tactile crisp 'click' transient (iOS glass surface contact)
      const oscHigh = ctx.createOscillator();
      const gainHigh = ctx.createGain();
      oscHigh.type = 'sine';
      oscHigh.frequency.setValueAtTime(1650, now);
      oscHigh.frequency.exponentialRampToValueAtTime(520, now + 0.016);

      gainHigh.gain.setValueAtTime(0.001, now);
      gainHigh.gain.linearRampToValueAtTime(0.28, now + 0.0015);
      gainHigh.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      oscHigh.connect(gainHigh);
      gainHigh.connect(ctx.destination);
      oscHigh.start(now);
      oscHigh.stop(now + 0.02);

      // 2. Damped wooden body resonant pop (the tactile low-mid mechanical body)
      const oscBody = ctx.createOscillator();
      const gainBody = ctx.createGain();
      oscBody.type = 'triangle';
      oscBody.frequency.setValueAtTime(340, now);
      oscBody.frequency.exponentialRampToValueAtTime(130, now + 0.024);

      gainBody.gain.setValueAtTime(0.001, now);
      gainBody.gain.linearRampToValueAtTime(0.36, now + 0.002);
      gainBody.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

      oscBody.connect(gainBody);
      gainBody.connect(ctx.destination);
      oscBody.start(now);
      oscBody.stop(now + 0.028);

      // 3. Subtle bandpassed tactile texture (simulates the physical taptic impulse)
      const bufferSize = Math.floor(ctx.sampleRate * 0.012); // 12ms impulse
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(2.5, now);

      const gainNoise = ctx.createGain();
      gainNoise.gain.setValueAtTime(0.14, now);
      gainNoise.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

      noise.connect(filter);
      filter.connect(gainNoise);
      gainNoise.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.014);
    } catch (e) {
      console.warn('Audio playback not supported or user gesture needed:', e);
    }
  }

  // Alias for backward compatibility
  playSnapchatSound() {
    this.playIPhoneTapSound();
  }

  playChime(soundType: 'futuristic' | 'gentle' | 'radar' | 'cyber' | 'snapchat' | 'tap' | 'none') {
    if (soundType === 'none') return;
    if (soundType === 'tap' || soundType === 'gentle' || soundType === 'snapchat') {
      this.playIPhoneTapSound();
      return;
    }

    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      if (soundType === 'futuristic') {
        // High dual-tone rising chime (WattWise classic)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6

        osc2.frequency.setValueAtTime(440, now);
        osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
      } else if (soundType === 'radar') {
        // Sci-fi high ping pulse
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.28);
      } else if (soundType === 'cyber') {
        // Quick 3-pulse cyber energy blip
        [0, 0.08, 0.16].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const freqs = [660, 880, 1320];
          osc.frequency.setValueAtTime(freqs[idx], now + delay);

          gain.gain.setValueAtTime(0.18, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + delay);
          osc.stop(now + delay + 0.1);
        });
      }
    } catch (e) {
      console.warn('Audio playback not supported or user gesture needed:', e);
    }
  }

  playAppleWelcome() {
    this.playIPhoneTapSound();
  }
}

export const soundFx = new SoundFxService();
