// Create the population
function Population(mutationRate, num) {
  this.mutationRate = mutationRate; // Mutation rate
  this.population = []; // array to hold the current population
  this.someOtherPopulation = [];
  this.matingPool = [];
  this.generations = 0; // Number of generations

  for (let i = 0; i < num; i++) {
    this.population[i] = new Melody(new DNA());
  }

  // Generate a mating pool
  this.selection = function() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    let maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.someOtherPopulation.length; i++) {
      let fitnessNormal = linlin(
        this.someOtherPopulation[i].fitness,
        0,
        maxFitness,
        0,
        1
      );

      //create a new multiplier
      let n = _.floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.someOtherPopulation[i]);
      }
    }
  };

  // Making the next generation
  this.reproduction = function() {
    // Refill the population with children from the mating pool
    for (var i = 0; i < this.someOtherPopulation.length; i++) {
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
      let child = crossover(momgenes, dadgenes);

      // Mutate their genes
      //FIXME: mutation not working, it's in this function
      // it's just supposed to insert a random value into some of the index's
      let mutateChild = mutate(child);

      // Fill the new population with the new child
      population.population[0].newDNA(mutateChild);
    }
  };

  // Find highest fintess for the population
  this.getMaxFitness = function() {
    let record = 0;
    for (let i = 0; i < this.someOtherPopulation.length; i++) {
      if (this.someOtherPopulation[i].fitness > record) {
        record = this.someOtherPopulation[i].fitness;
      }
    }

    return record;
  };

  // Crossover
  // Creates new DNA sequence from two
  // TODO: edit this so it works within this function with new data
  const crossover = function(mom, dad) {
    const child = new Array(mom.length);
    const cross = _.floor(_.random(mom.length));
    for (let i = 0; i < mom.length; i++) {
      if (i > cross) child[i] = mom[i];
      else child[i] = dad[i];
    }
    return new DNA(child);
  };

  // Based on a mutation probability, picks a new _.random character in array spots
  const mutate = function(m) {
    for (var i = 0; i < m.genes.length; i++) {
      if (_.random(1, true) < mutationRate) {
        m.genes[i] = _.random(1, true);
      }
    }
    return m.genes;
  };
}
