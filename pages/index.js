// start rhizome on EC2, calls a fish alias
// iea_rhizome
// rhizome config

// short url: https://u.emdm.io

const client = new rhizome.Client();
let toggle = null; // define globally
const mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
const popmax = 1;
let sketchGenes = [0.3, 0.5, 0.6, 0.3, 0.5, 0.6, 0.3, 0.2, 0.4, 0.5];
// Create a population with a target phrase, mutation rate, and population max
const population = new Population(mutationRate, popmax);
let duration = 7;

// create gui
$(function () {
  Nexus.colors.fill = '#000';
  Nexus.colors.accent = '#000';

  toggle = Nexus.Add.Toggle('synth', {
    size: [200, 100]
  });

  // preseed once at the beginning
  preSeed();

  // on turns sound on, off turns off and generates new melody
  toggle.on('change', v => {
    if (v) {
      population.population.play();
      console.log(population.population)
      // draw on phones
      draw10p();

      // send melody to hub 
      client.send('/hubMelody', population.population.melody);


    } else {
      // stop loop
      population.population.phrase.stop();

      // guard against undefined during performance
      ifUndefined();

      // create next generation
      const fitID = [population.population.getFitness(), client.id];
      const data = fitID.concat(population.population.dna.genes);
      client.send('/fitness', data);

      population.selection();
      population.reproduction();
      population.population.clearFitness();
      population.newPop(20); // if over a certain number clear

      console.log(Tone.Transport.bpm.value)
      client.send('/hubTempo', [Tone.Transport.bpm.value])
    }
  });
});

// Rhizome code
client.start(function (err) {
  if (err) throw err;
  console.log('subscribing...');
  client.send('/sys/subscribe', ['/']);
});

client.on('connected', function () {
  console.log('connected');
});

// start counting and fade out after given time
client.on('message', function (addr, args) {
  if (addr === '/start') {
    console.log('Composition playing for', duration, 'minutes');

    // Schedule fading out at 8 minutes
    Tone.Transport.schedule(function (time) {
      volume.volume.exponentialRampTo(-90, _.random(30, 60));
      console.log('Start Fading!');

      // Trigger viz fadeout
      drawEnd();

      // turn off toggle
      toggle.destroy();
      // toggle bg div
      $(synth)[0].style.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }, `+${duration}*60`);
  }
});

client.on('message', (addr, args) => {
  if (addr === '/duration') {
    duration = args[0];
  }
});

client.on('message', function (addr, args) {
  if (addr === '/fitness') {
    population.someOtherPopulation.push({
      fitness: args[0],
      clientID: args[1],
      genes: args.slice(2, args.length)
    });
  }
});

// FORCE OFF IF NEEDED!!!!
client.on('message', function (addr, args) {
  if (addr === '/fade') {
    volume.volume.exponentialRampTo(-90, _.random(30, 60));
    console.log('force fading!');
    // trigger Viz fade
    drawEnd();
    toggle.destroy();
  }
});

Tone.Transport.start('+0.1');

StartAudioContext(Tone.context, document.documentElement);