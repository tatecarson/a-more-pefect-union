function Melody(dna_) {
  var self = this;
  this.dna = dna_;
  this.fitness = 1; // How good is this face?
  this.loop;
  var genes = this.dna.genes;
  var interval; //to turn off fitness timer
  var nextNote = 0;
  var nextRhythm = 0;

  var rhythmPatterns = [
    ["1n"],
    ["2n", "2n"],
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

  //TODO: make rhythmic choices reflect genes

  //TODO: I maybe don't need this if I seed the melody before the client gets data from other clients
  this.melody = genes.map(e => {
    return _.floor(linlin(e, 0, 1, 300, 500));
  });

  console.log("this.melody", this.melody);

  this.newDNA = function(newDNA) {
    self.dna = newDNA;

    var genes = self.dna;

    self.melody = genes.map(e => {
      return _.floor(linlin(e, 0, 1, 300, 500));
    });

    console.log("current melody: ", self.melody);
  };

  this.play = function() {
    //increase fitness by time spent with melody
    self.fitness = 0.25;
    const rNum = _.random(0, rhythmPatterns.length - 1);
    console.log("rNum is: ", rNum);

    interval = setInterval(() => {
      self.fitness += 0.25;
    }, 1000);

    self.loop = new Tone.Loop(function(time) {
      synth.triggerAttackRelease(
        self.melody[nextNote],
        time,
        "+" + rhythmPatterns[rNum][nextRhythm]
      );

      nextNote++;
      nextRhythm++;

      if (nextNote >= self.melody.length) {
        nextNote = 0;
      }
      if (nextRhythm >= rhythmPatterns[rNum].length) {
        nextRhythm = 0;
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
