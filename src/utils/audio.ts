/**
 * Lightweight, self-contained Web Audio API soundscape generator.
 * Zero external audio files, completely reliable in browser sandboxes.
 */

class SoundscapeController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private rainNoiseNode: AudioNode | null = null;

  private initContext() {
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

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (!this.ctx) return this.isMuted;

    if (this.isMuted) {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      }
      if (this.rainGain) {
        this.rainGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      }
    } else {
      this.startAmbient();
    }

    return this.isMuted;
  }

  private startAmbient() {
    if (!this.ctx || this.isMuted) return;

    // Create warm ambient chord (E major 9: E3, B3, G#4, D#5 frequencies)
    if (!this.ambientGain) {
      this.ambientGain = this.ctx.createGain();
      const masterFilter = this.ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.value = 450; // Warm, rounded cutoff

      this.ambientGain.connect(masterFilter);
      masterFilter.connect(this.ctx.destination);

      const notes = [164.81, 246.94, 415.3, 622.25]; // Warm frequencies
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;

        // Subtle slow detune vibrato
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.15 + idx * 0.05;
        lfoGain.gain.value = 1.2;
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.value = 0.04 / (idx + 1);
        osc.connect(oscGain);
        oscGain.connect(this.ambientGain!);

        osc.start();
        this.oscillators.push(osc);
      });
    }

    this.ambientGain.gain.setTargetAtTime(0.35, this.ctx.currentTime, 1.2);
  }

  /**
   * Play a cheerful vintage bicycle bell: two crisp cheerful dings!
   */
  public playBicycleBell() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const playChime = (time: number, freq: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Fast ring decay
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.6);
    };

    playChime(now, 2093);        // C7
    playChime(now + 0.12, 2637); // E7
  }

  /**
   * Play a gentle cat purr vibration
   */
  public playCatPurr() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(28, now); // 28Hz low purr vibration

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    // Amplitude modulation for purr rhythm
    const amOsc = this.ctx.createOscillator();
    const amGain = this.ctx.createGain();
    amOsc.frequency.setValueAtTime(24, now); // ~24 purr cycles per sec
    amGain.gain.setValueAtTime(0.04, now);
    amOsc.connect(amGain.gain);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.setTargetAtTime(0.0001, now + 1.2, 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    amOsc.start(now);
    osc.start(now);
    amOsc.stop(now + 1.8);
    osc.stop(now + 1.8);
  }

  /**
   * Play a soft chime when interacting with a flower or kindness note
   */
  public playSoftChime(freq = 587.33) {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.95);
  }

  /**
   * Play raindrop ripple tap
   */
  public playWaterDrop() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 900 + Math.random() * 400;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq + 500, now + 0.08);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}

export const soundscape = new SoundscapeController();
