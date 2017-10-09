//TODO: add onto this sound
const membraneSynth = new Tone.MembraneSynth({
  pitchDecay: 0.008,
  octaves: 2,
  envelope: {
    attack: 0.0006,
    decay: 0.5,
    sustain: 0
  }
}).toMaster();

const kalimba = new Tone.FMSynth({
  harmonicity: 8,
  modulationIndex: 2,
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.001,
    decay: 2,
    sustain: 0.1,
    release: 2
  },
  modulation: {
    type: "square"
  },
  modulationEnvelope: {
    attack: 0.002,
    decay: 0.2,
    sustain: 0,
    release: 0.2
  }
}).toMaster();

const eCello = new Tone.FMSynth({
  harmonicity: 3.01,
  modulationIndex: 14,
  oscillator: {
    type: "triangle"
  },
  envelope: {
    attack: 0.2,
    decay: 0.3,
    sustain: 0.1,
    release: 1.2
  },
  modulation: {
    type: "square"
  },
  modulationEnvelope: {
    attack: 0.01,
    decay: 0.5,
    sustain: 0.2,
    release: 0.1
  }
}).toMaster();

const thinSaws = new Tone.FMSynth({
  harmonicity: 0.5,
  modulationIndex: 1.2,
  oscillator: {
    type: "fmsawtooth",
    modulationType: "sine",
    modulationIndex: 20,
    harmonicity: 3
  },
  envelope: {
    attack: 0.05,
    decay: 0.3,
    sustain: 0.1,
    release: 1.2
  },
  modulation: {
    volume: 0,
    type: "triangle"
  },
  modulationEnvelope: {
    attack: 0.35,
    decay: 0.1,
    sustain: 1,
    release: 0.01
  }
}).toMaster();

const brassCircuit = new Tone.MonoSynth({
  portamento: 0.01,
  oscillator: {
    type: "sawtooth"
  },
  filter: {
    Q: 2,
    type: "lowpass",
    rolloff: -24
  },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.6,
    release: 0.5
  },
  filterEnvelope: {
    attack: 0.05,
    decay: 0.8,
    sustain: 0.4,
    release: 1.5,
    baseFrequency: 2000,
    octaves: 1.5
  }
}).toMaster();
