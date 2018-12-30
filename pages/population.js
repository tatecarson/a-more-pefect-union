// Create the population
function Population (mutationRate, num) {
  this.mutationRate = mutationRate; // Mutation rate
  this.someOtherPopulation = [];
  this.matingPool = [];
  this.population = new Melody(new DNA());

  // Generate a mating pool
  this.selection = function () {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    let maxFitness = this.getMaxFitness();

    // do for however many clients are connected
    for (let i = 0; i < this.someOtherPopulation.length; i++) {
      let fitnessNormal = linlin(
        this.someOtherPopulation[i].fitness,
        0,
        maxFitness,
        0,
        1
      );

      // create a new multiplier
      let n = _.floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.someOtherPopulation[i]);
      }
    }
  };

  // Making the next generation
  this.reproduction = function () {
    // Refill the population with children from the mating pool
    // Sping the wheel of fortune to pick two parents
    let m = _.floor(_.random(this.matingPool.length));
    let d = _.floor(_.random(this.matingPool.length));
    // Pick two parents
    let mom = this.matingPool[m];
    let dad = this.matingPool[d];

    // Get their genes
    let momgenes = mom.genes;
    let dadgenes = dad.genes;

    // Mate their genes
    let child = this.crossover(momgenes, dadgenes);

    // Mutate their genes
    let mutateChild = this.mutate(child);

    // Fill the new population with the new child
    population.population.newDNA(mutateChild);
  };

  // TODO: make crossover and mutation more intelligent
  // Crossover
  // Creates new DNA sequence from two
  this.crossover = function (mom, dad) {
    // new array from the length of mom
    const child = new Array(mom.length);
    // get a random index between 0 and the length of mom
    const cross = _.floor(_.random(mom.length));

    // for each index of mom
    for (let i = 0; i < mom.length; i++) {
      // if i is less than cross (random index between 0 and the lenght of mom)
      // mom passes on genes
      if (i > cross) child[i] = mom[i];
      // else dad passes on genes
      else child[i] = dad[i];
    }

    return child;
  };

  // Based on a mutation probability, picks a new _.random character in array spots
  this.mutate = function (m) {
    for (let i = 0; i < m.length; i++) {
      if (_.random(1, true) < mutationRate) {
        m[i] = _.random(1, true);
      }
    }
    return m;
  };

  // TODO: this can be much shorter and succinct
  // Find highest fintess for the population
  this.getMaxFitness = function () {
    let record = 0;
    for (let i = 0; i < this.someOtherPopulation.length; i++) {
      if (this.someOtherPopulation[i].fitness > record) {
        record = this.someOtherPopulation[i].fitness;
      }
    }

    return record;
  };

  // restart population if it gets too big
  this.newPop = function (size) {
    if (this.someOtherPopulation.length > size) {
      this.someOtherPopulation = [];
    }
  };
}
