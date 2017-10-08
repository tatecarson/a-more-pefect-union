function Melody(dna_) {
  var self = this;
  this.dna = dna_;
  this.fitness = 1; // How good is this melody?
  this.loop;
  var genes = this.dna.genes;
  var interval; //to turn off fitness timer
  var nextNote = 0;
  var nextRhythm = 0;

  var rhythmPatterns = [
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

  //TODO: genes reflect tempo
  //TODO: make these rhythmic choices more interesting - lookup in paper ways of seeding rhythm
  //To read - Ariza 2002,
  //TODO: seed melodic choices somehow
  //TODO: have genes reflect choices of instrument and timbre

  // starting melody here
  this.melody = genes.map(e => _.floor(linlin(e, 0, 1, 300, 500)));
  this.melodyLengthVar = () => {
    const length = _.floor(linlin(genes[3], 0, 1, 0, self.melody.length));
    console.log(length);

    return self.melody.slice(length);
  };
  this.rhythmIndex = _.floor(linlin(genes[0], 0, 1, 0, rhythmPatterns.length));

  this.newDNA = function(newDNA) {
    self.dna = newDNA;
    var genes = self.dna;

    self.melody = genes.map(e => _.floor(linlin(e, 0, 1, 300, 500)));
    console.log("self.melody", self.melody);

    //slice array depending on genes
    self.melodyLengthVar = () => {
      const length = _.floor(linlin(genes[3], 0, 1, 0, self.melody.length));
      return self.melody.slice(length);
    };

    self.rhythmIndex = _.floor(
      linlin(genes[0], 0, 1, 0, rhythmPatterns.length)
    );
  };

  this.play = function() {
    //increase fitness by time spent with melody
    self.fitness = 0.25;

    interval = setInterval(() => {
      self.fitness += 0.25;
    }, 1000);

    self.loop = new Tone.Loop(function(dur) {
      synth.triggerAttackRelease(
        self.melodyLengthVar()[nextNote],
        dur,
        "+" + rhythmPatterns[self.rhythmIndex][nextRhythm]
      );

      if (nextNote >= self.melodyLengthVar().length) {
        nextNote = 0;
      } else {
        nextNote++;
      }

      if (nextRhythm == rhythmPatterns[self.rhythmIndex].length - 1) {
        nextRhythm = 0;
      } else {
        nextRhythm++;
      }
    }, "4n").start(0);
  };

  this.clear = function() {
    clearInterval(interval);
  };

  this.getFitness = function() {
    return self.fitness;
  };

  this.getDNA = function() {
    return this.dna;
  };
}
