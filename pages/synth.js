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
const metal = new Tone.Players({
  metal1: "./samples/metal/bang_wood_on_metal1.mp3",
  metal2: "./samples/metal/bang_wood_on_metal2.mp3",
  metal3: "./samples/metal/bang_wood_on_metal3.mp3",
  metal4: "./samples/metal/bang_wood_on_metal4.mp3"
}).toMaster();

const bell = new Tone.Players({
  bell1: "./samples/bell/bell_1a.mp3",
  bell3: "./samples/bell/bell-octave0.mp3",
  bell4: "./samples/bell/bell-octave1.mp3",
  bell5: "./samples/bell/bell-octave2.mp3",
  bell6: "./samples/bell/bellF.mp3"
}).toMaster();

const marimba = new Tone.Players({
  marimbaHard4: "./samples/marimba/MarimbaHardC4.mp3",
  marimbaHard5: "./samples/marimba/MarimbaHardC5.mp3",
  marimbaHard6: "./samples/marimba/MarimbaHardC6.mp3",
  marimbaSoft4: "./samples/marimba/MarimbaSoftC4.mp3",
  marimbaSoft5: "./samples/marimba/MarimbaSoftC5.mp3",
  marimbaSoft6: "./samples/marimba/MarimbaSoftC6.mp3"
}).toMaster();
//more instruments

const kenong = new Tone.Players({
  kenong1: "./samples/kenong/Kenong90 2-Audio.mp3",
  kenong2: "./samples/kenong/Kenong90 3-Audio.mp3",
  kenong3: "./samples/kenong/Kenong90 4-Audio.mp3",
  kenong4: "./samples/kenong/Kenong90 5-Audio.mp3",
  kenong5: "./samples/kenong/Kenong90 6-Audio.mp3"
}).toMaster();

const musicBox = new Tone.Players({
  musicBox1: "./samples/music_box/music_box 3-Audio.mp3",
  musicBox2: "./samples/music_box/music_box 4-Audio.mp3",
  musicBox3: "./samples/music_box/music_box 5-Audio.mp3"
}).toMaster();

const panPot = new Tone.Players({
  panPot1: "./samples/pan_pot/pan_pot 3-Audio.mp3",
  panPot2: "./samples/pan_pot/pan_pot 4-Audio.mp3",
  panPot3: "./samples/pan_pot/pan_pot 5-Audio.mp3"
}).toMaster();

var loop = new Tone.Loop(function(time) {
  generatePlayer(panPot);
}, "8n");

const generatePlayer = player => {
  let randSample = _.sample(Object.keys(player._players));

  player.get(randSample).start();
  player.get(randSample).playbackRate = Nexus.tune.ratio(_.random(0, 12));
};

Tone.Buffer.on("load", () => loop.start());

// loop.start();
