//ngrok - ngrok http 8000
//nodemon - nodemon /usr/local/bin/rhizome config
// can't figure out how to reference the local version
const client = new rhizome.Client();

const mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
const popmax = 1;

// Create a population with a target phrase, mutation rate, and population max
const population = new Population(mutationRate, popmax);

//create gui
$(function() {
  StartAudioContext(Tone.context, document.documentElement);

  const toggles = [];
  for (var index = 0; index < population.population.length; index++) {
    toggles[index] = Nexus.Add.Toggle("synth", {
      size: [100, 50]
    });
  }

  toggles.forEach((e, i) => {
    e.on("change", v => {
      if (v) {
        population.population[i].play();
        client.send("/genes", population.population[0].getDNA().genes);
      } else {
        population.population[i].loop.stop();
        population.population[i].clear();

        client.send("/fitnessScore", [
          population.population[0].getFitness(),
          client.id
        ]);
      }
    });
  });

  const evolve = new Nexus.Add.TextButton("#evolve", {
    size: [320, 50],
    state: false,
    text: "Evolve new generation",
    alternate: false
  });

  evolve.on("change", v => {
    if (v) nextGen();
  });
});

function nextGen() {
  // client.send("/fitnessScore", [
  //   population.population[0].getFitness(),
  //   client.id
  // ]);
  // client.send("/genes", population.population[0].getDNA().genes);

  population.selection();
  population.reproduction();
}

//rhizome testing
client.start(function(err) {
  if (err) throw err;
  console.log("subscribing...");
  client.send("/sys/subscribe", ["/"]);
});

client.on("connected", function() {
  console.log("connected");
  $("#client-banner")
    .removeClass("disconnected")
    .addClass("connected")
    .html("Connected");
});

client.on("message", function(addr, args) {
  if (addr === "/fitnessScore") {
    //FIXME: figure out some way to store fitness and genes that relate to
    // a unique id, then read through those in population.js like you were before
    // population[i]
    population.someOtherPopulation.fitness = args[0];
    population.someOtherPopulation.clientID = args[1];
    console.log(population.someOtherPopulation.clientID);
  }
  if (addr === "/genes") {
    // console.log(args);
    population.someOtherPopulation.genes = args;
  }
});

Tone.Transport.start("+0.1");
Tone.Transport.bpm.value = _.random(100, 200);
