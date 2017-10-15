function Melody(dna_) {
  const self = this;
  this.dna = dna_;
  this.fitness = 1; // How good is this melody?
  this.loop;
  this.melody = [];

  const genes = this.dna.genes;
  let interval; //to turn off fitness timer

  //TODO: add more values
  //TODO: insert rests
  const rhythmPatterns = [
    ["1n"],
    ["4n", "4n", "2n"],
    ["2n", "4n", "4n"],
    ["4n", "2n", "4n"],
    ["2n", "8n", "8n", "4n"],
    ["2n", "4n", "8n", "8n"],
    ["8n", "8n", "4n", "2n"],
    ["4n", "8n", "8n", "2n"],
    ["4n", "4n", "4n", "4n"],
    ["8n", "8n", "4n", "4n", "4n"],
    ["4n", "8n", "8n", "4n", "4n"],
    ["4n", "4n", "8n", "8n", "4n"],
    ["4n", "4n", "4n", "8n", "8n"],
    ["8n", "8n", "8n", "8n", "4n", "4n"],
    ["8n", "8n", "4n", "8n", "8n", "4n"],
    ["8n", "8n", "4n", "4n", "8n", "8n"],
    ["4n", "8n", "8n", "8n", "8n", "4n"],
    ["4n", "4n", "8n", "8n", "8n", "8n"],
    ["8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n"]
  ];

  const synthPool = [
    membraneSynth,
    kalimba,
    eCello,
    thinSaws,
    brassCircuit,
    pianoetta,
    delicateWind,
    steelPan,
    superSaw,
    treeTrunk
  ];

  //TODO: fix melodic choices to a just intoned scale
  //well tunes piano scale 
  Nexus.tune.createJIScale(
    1 / 1,
    567 / 512,
    9 / 8,
    147 / 128,
    21 / 16,
    1323 / 1024,
    189 / 128,
    3 / 2,
    49 / 32,
    7 / 4,
    441 / 256,
    63 / 32,
    2 / 1
  );

  const just = [];
  for (let i = 0; i < 12; i++) {
    just[i] = Nexus.note(i);
  }
  console.log(just);

  //combine values for part
  this.merge = (timeArr, noteArr, velocityArr) => {
    const length = Math.min(timeArr.length, noteArr.length, velocityArr.length);
    const ret = [];
    let totalDuration = 0;
    for (let i = 0; i < length; i++) {
      ret.push({
        dur: timeArr[i],
        time: totalDuration,
        note: noteArr[i],
        velocity: velocityArr[i]
      });
      totalDuration += "+" + timeArr[i];
    }
    return ret;
  };

  //TODO: make these rhythmic choices more interesting - lookup in paper ways of seeding rhythm
  //TODO: seed melodic choices somehow
  //TODO: make sounds more unique
  //TODO: add effects to sounds


  // this is now indexes into the just array 
  this.melodyLong = genes.map(e => _.floor(linlin(e, 0, 1, 0, just.length)));
  this.melodyLong.map((index, i) => this.melody[i] = just[index]);

  this.rhythmIndex = _.floor(linlin(genes[0], 0, 1, 0, rhythmPatterns.length));

  this.velocity = genes.map(e => _.floor(linlin(e, 0, 1, 0.1, 0.7), 2));

  this.part = this.merge(
    rhythmPatterns[this.rhythmIndex],
    this.melody,
    this.velocity
  );

  this.tempo = _.floor(linlin(genes[4], 0, 1, 100, 250));
  this.synth = _.floor(linlin(genes[5], 0, 1, 0, synthPool.length - 1));

  this.newDNA = function (newDNA) {
    self.dna = newDNA;
    const genes = self.dna;
    self.melody = [];

    // this is now indexes into the just array 
    self.melodyLong = genes.map(e => _.floor(linlin(e, 0, 1, 0, just.length)));
    self.melodyLong.map((index, i) => self.melody[i] = just[index]);

    self.rhythmIndex = _.floor(
      linlin(genes[0], 0, 1, 0, rhythmPatterns.length)
    );
    self.velocity = genes.map(e => _.floor(linlin(e, 0, 1, 0.1, 0.7), 2));

    self.part = this.merge(
      rhythmPatterns[self.rhythmIndex],
      self.melody,
      self.velocity
    );

    console.table(self.part);

    self.tempo = _.floor(linlin(genes[4], 0, 1, 100, 250));
    self.synth = _.floor(linlin(genes[5], 0, 1, 0, synthPool.length - 1));
  };

  this.play = function () {
    //change tempo depending on genes
    Tone.Transport.bpm.value = self.tempo;

    //increase fitness by time spent with melody
    self.fitness = 0.25;

    interval = setInterval(() => {
      self.fitness += 0.25;
    }, 1000);

    self.phrase = new Tone.Part((time, value) => {
      synthPool[self.synth].triggerAttackRelease(
        value.note,
        value.dur,
        time,
        value.velocity
      );
    }, self.part).start(0);

    self.phrase.loop = true;
  };

  this.clearFitness = function () {
    clearInterval(interval);
    //  if loop is stopped force release to guard agains hanging synths
    if (self.part.state === "stopped") {
      synthPool.forEach(e => {
        e.triggerRelease();
      });
    }
  };

  this.getFitness = function () {
    return self.fitness;
  };

  this.getDNA = function () {
    return this.dna;
  };
}