//ngrok - ngrok http 8000
//nodemon - nodemon /usr/local/bin/rhizome config
// can't figure out how to reference the local version
const client = new rhizome.Client();
const mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
const popmax = 1;

// Create a population with a target phrase, mutation rate, and population max
const population = new Population(mutationRate, popmax);
console.log("");

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
      }
    });
  });

  //TODO: on button click off send fitnesss to all other users
  const evolve = new Nexus.Add.TextButton("#evolve", {
    size: [320, 50],
    state: false,
    text: "Evolve new generation",
    alternate: false
  });

  evolve.on("change", v => {
    if (v) {
      nextGen();
    }
  });
});

function nextGen() {
  //TODO: make it into json object?
  //TODO: return client id using rhizome
  // need ids to keep track of the state of each specific phone
  // const ID = randomNumberGen
  // let genes = population.population[0].getDNA().genes;
  client.send("/fitnessScore", [population.population[0].getFitness()]);
  client.send("/melody", population.population[0].getDNA().genes);

  // const test = [1, 2, 3];
  // client.send("/fitnessScore", population.population[0].getDNA().genes);
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
    console.log(args);
  }
  if (addr === "/melody") {
    console.log(args);
  }
});

Tone.Transport.start("+0.1");
Tone.Transport.bpm.value = _.random(100, 200);
