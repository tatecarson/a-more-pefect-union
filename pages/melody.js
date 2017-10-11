function Melody(dna_) {
  const self = this;
  this.dna = dna_;
  this.fitness = 1; // How good is this melody?
  this.loop;
  const genes = this.dna.genes;
  let interval; //to turn off fitness timer
  let nextNote = 0;
  let nextRhythm = 0;
  let nextVel = 0;

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

  //combine values for part
  this.merge = (timeArr, noteArr, velocityArr) => {
    const length = Math.min(timeArr.length, noteArr.length, velocityArr.length);
    const ret = [];

    for (let i = 0; i < length; i++) {
      ret.push({
        time: timeArr[i],
        note: noteArr[i],
        velocity: velocityArr[i]
      });
    }

    return ret;
  };

  //TODO: make these rhythmic choices more interesting - lookup in paper ways of seeding rhythm
  //TODO: seed melodic choices somehow
  //TODO: make sounds more unique
  //TODO: add effects to sounds

  // setup starting values with this
  this.melodyLong = genes.map(e => _.floor(linlin(e, 0, 1, 300, 500)));

  //slice melody into shorter chunks
  this.melody = () => {
    const length = _.floor(linlin(genes[3], 0, 1, 0, self.melodyLong.length));
    return self.melodyLong.slice(length);
  };
  this.rhythmIndex = _.floor(linlin(genes[0], 0, 1, 0, rhythmPatterns.length));
  // console.log(rhythmPatterns[this.rhythmIndex]);

  this.velocity = genes.map(e => _.floor(linlin(e, 0, 1, 0, 0.7), 2));

  this.part = this.merge(
    rhythmPatterns[this.rhythmIndex],
    this.melody(),
    this.velocity
  );

  this.tempo = _.floor(linlin(genes[4], 0, 1, 100, 250));
  this.synth = _.floor(linlin(genes[5], 0, 1, 0, synthPool.length - 1));

  this.newDNA = function(newDNA) {
    self.dna = newDNA;
    const genes = self.dna;

    self.melodyLong = genes.map(e => _.floor(linlin(e, 0, 1, 300, 700)));

    //slice array depending on genes
    self.melody = () => {
      const length = _.floor(
        linlin(genes[3], 0, 1, 0, self.melodyLong.length - 1)
      );
      return self.melodyLong.slice(length);
    };

    self.rhythmIndex = _.floor(
      linlin(genes[0], 0, 1, 0, rhythmPatterns.length)
    );
    self.velocity = genes.map(e => _.floor(linlin(e, 0, 1, 0, 0.7), 2));

    self.part = this.merge(
      rhythmPatterns[self.rhythmIndex],
      self.melody(),
      self.velocity
    );

    self.tempo = _.floor(linlin(genes[4], 0, 1, 100, 250));
    self.synth = _.floor(linlin(genes[5], 0, 1, 0, synthPool.length - 1));
  };

  this.play = function() {
    //change tempo depending on genes
    Tone.Transport.bpm.value = self.tempo;

    //increase fitness by time spent with melody
    self.fitness = 0.25;

    interval = setInterval(() => {
      self.fitness += 0.25;
    }, 1000);

    //TODO: convert to tone.part
    self.loop = new Tone.Loop(function(time) {
      if (nextNote >= self.melody().length - 1) {
        nextNote = 0;
      } else {
        nextNote++;
      }
      if (nextRhythm == rhythmPatterns[self.rhythmIndex].length - 1) {
        nextRhythm = 0;
      } else {
        nextRhythm++;
      }

      synthPool[self.synth].triggerAttackRelease(
        self.melody()[nextNote],
        "8n",
        time + Tone.Time(rhythmPatterns[self.rhythmIndex][nextRhythm]),
        self.velocity[nextVel]
      );

      if (nextVel == self.velocity.length - 1) {
        nextVel = 0;
      } else {
        nextVel++;
      }
    }, "4n").start();
  };

  this.clear = function() {
    clearInterval(interval);

    //if loop is stopped force release to guard agains hanging synths
    if (self.loop.state === "stopped") {
      synthPool.forEach(e => {
        e.triggerRelease();
      });
    }
  };

  this.getFitness = function() {
    return self.fitness;
  };

  this.getDNA = function() {
    return this.dna;
  };
}
