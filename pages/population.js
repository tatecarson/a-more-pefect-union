// Create the population
function Population(m, num) {
  this.mutationRate = m; // Mutation rate
  this.population = []; // array to hold the current population
  this.matingPool = [];
  this.play = [];
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
    console.log("max fit: ", maxFitness);

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      let fitnessNormal = linlin(
        this.population[i].getFitness(),
        0,
        maxFitness,
        0,
        1
      );
      let n = _.floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  };

  // Making the next generation
  this.reproduction = function() {
    // Refill the population with children from the mating pool
    for (var i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let m = _.floor(_.random(this.matingPool.length));
      let d = _.floor(_.random(this.matingPool.length));
      // Pick two parents
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      // Get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
      // Mate their genes
      let child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      // this.population[i] = new Melody(child);
      this.population[i].newDNA(child);
    }
  };

  // Find highest fintess for the population
  this.getMaxFitness = function() {
    let record = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }

    return record;
  };
}
