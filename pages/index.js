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

  const toggle = Nexus.Add.Toggle("synth", { size: [100, 50] });

  //on turns sound on, off turns off and generates new melody
  toggle.on("change", v => {
    if (v) {
      population.population.play();
    } else {
      //stop loop
      population.population.loop.stop();

      //create next generation
      //Add fitness and ID to an array so they can be concated with the genes array
      const fitID = [population.population.getFitness(), client.id];
      const data = fitID.concat(population.population.getDNA().genes);
      console.log("data: ", data);

      client.send("/fitness", data);

      //clear fitness
      nextGen();
      population.population.clear();
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
    //TODO: rename this to population because all client devices make up population
    population.someOtherPopulation.push({
      fitness: args[0],
      clientID: args[1],
      genes: args.slice(2, args.length) //turn back into an array
    });
  }
});

Tone.Transport.start("+0.1");
Tone.Transport.bpm.value = _.random(100, 200);

// SOME BUGS TO FIX
//
//
//These are probably really bad but I don't know if the users would notice
//
//FIXME: Uncaught Error: argument 2, invalid type
// at _assertValid (rhizome.js:338)
// at module.exports.send (rhizome.js:341)
// at Toggle.e.on.v (index.js:35)
// at Toggle.EventEmitter.emit (NexusUI.js:1388)
// at Toggle.click (NexusUI.js:2393)
// at Toggle.preClick (NexusUI.js:1053)
// at SVGSVGElement.<anonymous> (NexusUI.js:1032)

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

//FIXME: Uncaught TypeError: Cannot read property '4' of undefined
// at t.Loop.callback (melody.js:66)
// at t.Loop._tick (Tone.min.js:12)
// at t.Event._tick (Tone.min.js:12)
// at t.TransportRepeatEvent.t.TransportEvent.invoke (Tone.min.js:9)
// at t.TransportRepeatEvent.invoke (Tone.min.js:9)
// at t.TransportEvent.invoke (Tone.min.js:9)
// at t.Timeline.<anonymous> (Tone.min.js:9)
// at t.Timeline.<anonymous> (Tone.min.js:7)
// at t.Timeline._iterate (Tone.min.js:7)
// at t.Timeline.forEachAtTime (Tone.min.js:7)
