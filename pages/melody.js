function Melody(dna_) {
  const self = this;
  this.dna = dna_;
  this.fitness = 1; // How good is this melody?
  this.loop;
  const genes = this.dna.genes;
  let interval; //to turn off fitness timer
  let nextNote = 0;
  let nextRhythm = 0;

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

  const synthPool = [membraneSynth, kalimba, eCello, thinSaws, brassCircuit];

  //TODO: have genes reflect choices of instrument and timbre
  //TODO: make these rhythmic choices more interesting - lookup in paper ways of seeding rhythm
  //To read - Ariza 2002,
  //TODO: seed melodic choices somehow

  // setup starting values with this
  this.melody = genes.map(e => _.floor(linlin(e, 0, 1, 300, 500)));

  this.melodyLengthVar = () => {
    const length = _.floor(linlin(genes[3], 0, 1, 0, self.melody.length));
    return self.melody.slice(length);
  };

  this.rhythmIndex = _.floor(linlin(genes[0], 0, 1, 0, rhythmPatterns.length));
  this.tempo = _.floor(linlin(genes[4], 0, 1, 100, 250));

  this.newDNA = function(newDNA) {
    self.dna = newDNA;
    const genes = self.dna;

    self.melody = genes.map(e => _.floor(linlin(e, 0, 1, 300, 500)));

    //slice array depending on genes
    self.melodyLengthVar = () => {
      const length = _.floor(linlin(genes[3], 0, 1, 0, self.melody.length));
      return self.melody.slice(length);
    };

    self.rhythmIndex = _.floor(
      linlin(genes[0], 0, 1, 0, rhythmPatterns.length)
    );

    self.tempo = _.floor(linlin(genes[4], 0, 1, 100, 250));
  };

  this.play = function() {
    const randSynth = _.random(0, synthPool.length - 1);

    //change tempo depending on genes
    Tone.Transport.bpm.value = self.tempo;

    //increase fitness by time spent with melody
    self.fitness = 0.25;

    interval = setInterval(() => {
      self.fitness += 0.25;
    }, 1000);

    self.loop = new Tone.Loop(function(dur) {
      if (nextNote >= self.melodyLengthVar().length - 1) {
        nextNote = 0;
      } else {
        nextNote++;
      }

      //FIXME: notes are holding over here and not stoping when loop stops
      synthPool[randSynth].triggerAttackRelease(
        self.melodyLengthVar()[nextNote],
        dur,
        "+" + rhythmPatterns[self.rhythmIndex][nextRhythm]
      );

      if (nextRhythm == rhythmPatterns[self.rhythmIndex].length - 1) {
        nextRhythm = 0;
      } else {
        nextRhythm++;
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
