//convert value from one range to another
function linlin(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}

function preSeed() {
  //seed object at startfor before client gets data from other clients
  if (
    typeof population.population.dna.genes === "undefined" ||
    population.someOtherPopulation.length === 0
  ) {
    console.log("preseeding");

    let geneList = [];

    for (let i = 0; i < 20; i++) {
      geneList[i] = _.random(0.0, 1.0, true);
    }

    population.someOtherPopulation.push({
      fitness: 1,
      clientID: client.id,
      genes: geneList //turn back into an array
    });
  }
}

function ifUndefined() {
  if (typeof population.population.dna.genes === "undefined") {
    let geneList = [];

    for (let i = 0; i < 20; i++) {
      geneList[i] = _.random(0.0, 1.0, true);
    }
    population.population.dna.genes = geneList;
  }
}
