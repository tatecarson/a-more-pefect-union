//Constructor (makes a random DNA)
function DNA(newgenes) {
  // DNA is random floating point values between 0 and 1 (!!)
  // The genetic sequence
  const len = 20; // Arbitrary length
  if (newgenes) {
    this.genes = newgenes;
  } else {
    this.genes = new Array(len);
    for (let i = 0; i < this.genes.length; i++) {
      this.genes[i] = _.random(0.0, 1.0, true);
    }
  }

  // Crossover
  // Creates new DNA sequence from two
  this.crossover = function(partner) {
    const child = new Array(this.genes.length);
    const crossover = _.floor(_.random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > crossover) child[i] = this.genes[i];
      else child[i] = partner.genes[i];
    }
    return new DNA(child);
  };

  // Based on a mutation probability, picks a new _.random character in array spots
  this.mutate = function(m) {
    for (var i = 0; i < this.genes.length; i++) {
      if (_.random(1, true) < m) {
        this.genes[i] = _.random(0, 1);
      }
    }
  };
}
