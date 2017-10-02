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
      } else {
        population.population[i].loop.stop();
        population.population[i].clear();

        //FIXME: objects duplicate here, not sure why
        // things tried:
        // 1. doesn't matter which nexus element used
        // 2. with a different address it's only sent once, explore that

        //Add fitness and ID to an array so they can be concated with the genes array
        const fitID = [population.population[0].getFitness(), client.id];

        //this sends twice!!
        client.send(
          "/fitness",
          fitID.concat(population.population[0].getDNA().genes)
        );

        // this sends once
        client.send("/test", [1]);
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

  const test = Nexus.Add.TextButton("#synth");
  test.on("change", v => {
    if (v) {
      client.send("/test", [1]);
    }
  });
});

function nextGen() {
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
});

client.on("message", function(addr, args) {
  if (addr === "/fitness") {
    console.log("im getting data");

    population.someOtherPopulation.push({
      fitness: args[0],
      clientID: args[1],
      genes: args.slice(2, args.length) //turn back into an array
    });
  }

  if (addr === "/test") {
    console.log("testing");
  }
});

Tone.Transport.start("+0.1");
Tone.Transport.bpm.value = _.random(100, 200);
