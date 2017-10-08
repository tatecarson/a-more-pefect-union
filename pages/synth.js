//TODO: add onto this sound
const synth = new Tone.MembraneSynth({
  pitchDecay: 0.008,
  octaves: 2,
  envelope: {
    attack: 0.0006,
    decay: 0.5,
    sustain: 0
  }
}).toMaster();
