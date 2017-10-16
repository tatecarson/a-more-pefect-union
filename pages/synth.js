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

const pianoetta = new Tone.MonoSynth({
  oscillator: {
    type: "square"
  },
  filter: {
    Q: 2,
    type: "lowpass",
    rolloff: -12
  },
  envelope: {
    attack: 0.005,
    decay: 3,
    sustain: 0,
    release: 0.45
  },
  filterEnvelope: {
    attack: 0.001,
    decay: 0.32,
    sustain: 0.9,
    release: 3,
    baseFrequency: 700,
    octaves: 2.3
  }
}).toMaster();

const delicateWind = new Tone.Synth({
  portamento: 0.0,
  oscillator: {
    type: "square4"
  },
  envelope: {
    attack: 2,
    decay: 1,
    sustain: 0.2,
    release: 2
  }
}).toMaster();

const steelPan = new Tone.Synth({
  oscillator: {
    type: "fatcustom",
    partials: [0.2, 1, 0, 0.5, 0.1],
    spread: 40,
    count: 3
  },
  envelope: {
    attack: 0.001,
    decay: 1.6,
    sustain: 0,
    release: 1.6
  }
}).toMaster();

const superSaw = new Tone.Synth({
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 30
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.4,
    attackCurve: "exponential"
  }
}).toMaster();

const treeTrunk = new Tone.Synth({
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 1.2
  }
}).toMaster();

//TODO: experiment with building instruments
var metal = new Tone.Players({
  metal1: "./samples/bang_wood_on_metal1.wav",
  metal2: "./samples/bang_wood_on_metal2.wav",
  metal3: "./samples/bang_wood_on_metal3.wav",
  metal4: "./samples/bang_wood_on_metal4.wav"
}).toMaster();

//more instruments

var loop = new Tone.Loop(function(time) {
  generatePlayer(metal);
}, "8n");

const generatePlayer = player => {
  let randSample = _.sample(Object.keys(player._players));
  console.log("sample: ", randSample);

  player.get(randSample).start();
  player.get(randSample).playbackRate = Nexus.tune.ratio(_.random(0, 12));
};

// loop.start();
