const reverb = new Tone.Freeverb().toMaster();
reverb.wet.value = 0.4;
const volume = new Tone.Volume(-10).connect(reverb);

const metal = new Tone.Players({
  metal1: "./samples/metal/bang_wood_on_metal1.mp3",
  metal2: "./samples/metal/bang_wood_on_metal2.mp3",
  metal3: "./samples/metal/bang_wood_on_metal3.mp3",
  metal4: "./samples/metal/bang_wood_on_metal4.mp3"
}).connect(volume);

const bell = new Tone.Players({
  bell1: "./samples/bell/bell_1a.mp3",
  bell3: "./samples/bell/bell-octave0.mp3",
  bell4: "./samples/bell/bell-octave1.mp3",
  bell5: "./samples/bell/bell-octave2.mp3",
  bell6: "./samples/bell/bellF.mp3"
}).connect(volume);

const marimba = new Tone.Players({
  marimbaHard4: "./samples/marimba/MarimbaHardC4.mp3",
  marimbaHard5: "./samples/marimba/MarimbaHardC5.mp3",
  marimbaHard6: "./samples/marimba/MarimbaHardC6.mp3",
  marimbaSoft4: "./samples/marimba/MarimbaSoftC4.mp3",
  marimbaSoft5: "./samples/marimba/MarimbaSoftC5.mp3",
  marimbaSoft6: "./samples/marimba/MarimbaSoftC6.mp3"
}).connect(volume);

const kenong = new Tone.Players({
  kenong1: "./samples/kenong/Kenong90 2-Audio.mp3",
  kenong2: "./samples/kenong/Kenong90 3-Audio.mp3",
  kenong3: "./samples/kenong/Kenong90 4-Audio.mp3",
  kenong4: "./samples/kenong/Kenong90 5-Audio.mp3",
  kenong5: "./samples/kenong/Kenong90 6-Audio.mp3"
}).connect(volume);

const panPot = new Tone.Players({
  panPot1: "./samples/pan_pot/pan_pot 3-Audio.mp3",
  panPot2: "./samples/pan_pot/pan_pot 4-Audio.mp3",
  panPot3: "./samples/pan_pot/pan_pot 5-Audio.mp3"
}).connect(volume);
