let x = 0,
  y = 0,
  strokeSize = 5;

let spacing = 60;
let probability = 0.5;

//TODO: when sound starts fading out have some sort of notice on phone
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  background(50, 65, 166);
  draw10p();
}

function draw10p() {
  let genes = sketchGenes;
  x = 0;
  y = 0;

  //related to tempo
  spacing = map(genes[4], 0, 1, 10, 150);

  probability = map(genes[4], 0, 1, 1, 0);

  background(0);
  let n = Math.ceil(
    (width + spacing) / spacing * ((height + spacing) / spacing)
  );

  for (let i = 0; i < n; i++) {
    stroke(255);
    strokeSize = map(_.sample(genes), 0, 1, 0.1, 5);
    rectColor = map(genes[4], 0, 1, 0, 255);
    strokeWeight(strokeSize);

    if (_.sample(genes) < probability) {
      if (_.sample(genes) < probability) {
        point(x + spacing / 2, y + spacing);
      } else {
        line(
          x + strokeSize,
          y + spacing,
          x + spacing - strokeSize,
          y + spacing
        );
      }
    }

    if (_.sample(genes) < probability) {
      if (_.sample(genes) < probability) {
        line(x, y, x + spacing, y + spacing);
      } else {
        line(x, y + spacing, x + spacing, y);
      }
    }

    //more whitespace for slower tempos
    if (_.sample(genes) < probability) {
      rect(x, y, spacing, spacing);
    } else {
      line(x, y + spacing, x + spacing, y);
    }

    x = x + spacing;
    if (x > width) {
      x = 0;
      y = y + spacing;
    }
  }
}
