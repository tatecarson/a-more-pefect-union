let x = 0,
  y = 0,
  strokeSize = 5;

let spacing = 60;
let probability = 0.5;

//TODO: need to redraw background when new genes come in
// convert over this: https://github.com/RiccardoZaffalon/p5-Sketches/blob/master/p5-10print/index.html
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50, 65, 166);
  draw10p();
}
function draw() {}

function draw10p() {
  let genes = sketchGenes;
  x = 0;
  y = 0;

  //related to tempo
  spacing = map(genes[4], 0, 1, 20, 60);

  probability = map(genes[4], 0, 1, 1, 0);

  console.log("genes: ", genes);

  background(0);
  let n = Math.ceil(
    (document.documentElement.clientWidth + spacing) /
      spacing *
      ((document.documentElement.clientHeight + spacing) / spacing)
  );

  for (let i = 0; i < n; i++) {
    stroke(255);
    strokeSize = map(_.sample(genes), 0, 1, 0.1, 5);

    strokeWeight(strokeSize);
    if (_.sample(genes) < probability) {
      point(x + spacing / 2, y + spacing);
    } else {
      line(x + strokeSize, y + spacing, x + spacing - strokeSize, y + spacing);
    }
    if (_.sample(genes) < probability) {
      line(x, y, x + spacing, y + spacing);
    } else {
      line(x, y + spacing, x + spacing, y);
    }

    //more whitespace for slower tempos
    if (_.sample(genes) < probability) {
      rect(x, y, spacing, spacing);
    } else {
      line(x, y + spacing, x + spacing, y);
    }

    x = x + spacing;
    if (x >= width) {
      x = 0;
      y = y + spacing;
    }
  }
}
