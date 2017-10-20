//start rhizome on EC2, calls a fish alias
//iea_rhizome
//rhizome config

//short url: https://u.emdm.io

const client = new rhizome.Client();
const mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
const popmax = 1;
let sketchGenes = [0.3, 0.5, 0.6, 0.3, 0.5, 0.6, 0.3, 0.2, 0.4, 0.5];
// Create a population with a target phrase, mutation rate, and population max
const population = new Population(mutationRate, popmax);

//create gui
$(function() {
  const colors = ["#000", "#fff"];
  Nexus.colors.accent = _.sample(colors);
  const toggle = Nexus.Add.Toggle("synth", {
    size: [200, 100]
  });

  //preseed once at the beginning
  preSeed();

  //on turns sound on, off turns off and generates new melody
  toggle.on("change", v => {
    if (v) {
      population.population.play();

      //draw on phones
      draw10p();
    } else {
      //stop loop
      population.population.phrase.stop();

      //guard against undefined during performance
      ifUndefined();

      //create next generation
      const fitID = [population.population.getFitness(), client.id];
      const data = fitID.concat(population.population.dna.genes);
      client.send("/fitness", data);

      population.selection();
      population.reproduction();
      population.population.clearFitness();
      population.newPop(20); //if over a certain number clear
    }
  });
});

//TODO: at given time start fading people out over 30 to 60 seconds
//schedule
// volume.volume.startFade(-90, _.random(30, 60));

//Rhizome code
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
    population.someOtherPopulation.push({
      fitness: args[0],
      clientID: args[1],
      genes: args.slice(2, args.length)
    });
  }
});

Tone.Transport.start("+0.1");
StartAudioContext(Tone.context, document.documentElement);
