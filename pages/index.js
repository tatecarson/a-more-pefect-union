//start rhizome on EC2, calls a fish alias
//iea_rhizome
//rhizome config

//short url: https://goo.gl/hfy268

const client = new rhizome.Client();
const mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
const popmax = 1;

// Create a population with a target phrase, mutation rate, and population max
const population = new Population(mutationRate, popmax);

//create gui
$(function() {
  StartAudioContext(Tone.context, document.documentElement);

  const toggle = Nexus.Add.Toggle("synth", {
    size: [100, 50]
  });

  //preseed once at the beginning
  preSeed();

  //on turns sound on, off turns off and generates new melody
  toggle.on("change", v => {
    if (v) {
      population.population.play();
    } else {
      //stop loop
      population.population.loop.stop();

      //guard against undefined during performance
      if (typeof population.population.dna.genes === "undefined") {
        let geneList = [];

        for (let i = 0; i < 20; i++) {
          geneList[i] = _.random(0.0, 1.0, true);
        }
        population.population.dna.genes = geneList;
      }

      //create next generation
      //Add fitness and ID to an array so they can be concated with the genes array
      const fitID = [population.population.getFitness(), client.id];
      const data = fitID.concat(population.population.dna.genes);
      client.send("/fitness", data);

      //clear fitness
      nextGen();
      population.population.clear();
    }
  });
});

// preSeed();

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
  //FIXME: replace same client id instead of not adding
  if (addr === "/fitness") {
    population.someOtherPopulation.forEach(pop => {
      console.log("client id", pop.clientID);

      if (pop.clientID !== client.id) {
        console.log("the client id is the same: ");
        //TODO: rename this to population because all client devices make up population
        population.someOtherPopulation.push({
          fitness: args[0],
          clientID: args[1],
          genes: args.slice(2, args.length) //turn back into an array
        });
      }
    });
  }
});

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
  } //seed object at startfor before client gets data from other clients
}
Tone.Transport.start("+0.1");
Tone.Transport.bpm.value = _.random(100, 200);

// SOME BUGS TO FIX
//
//
//These are probably really bad but I don't know if the users would notice

//FIXME: Tone.min.js:7 Uncaught SyntaxError: Tone.TimeBase: Unexpected token undefined
// at Tone.min.js:7
// at t.TimeBase._tokenize (Tone.min.js:7)
// at t.TimeBase._parseExprString (Tone.min.js:7)
// at t.TimeBase.set (Tone.min.js:7)
// at t.TimeBase [as constructor] (Tone.min.js:7)
// at new t.Time (Tone.min.js:7)
// at t.MembraneSynth.t.toSeconds (Tone.min.js:7)
// at t.MembraneSynth.t.Instrument.triggerAttackRelease (Tone.min.js:13)
// at t.Loop.callback (melody.js:63)
// at t.Loop._tick (Tone.min.js:12)
