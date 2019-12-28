const TOTAL = 300;
var birds = [];
var savedBirds = [];
var pipes = [];
var counter = 0;
var bestBird;
let cycles = 100;
let slider;
var imgB;
var imgP;
var imgPR;
function preload() {
  imgB = loadImage("./img/flappyClear.png");
}
function setup() {
  createCanvas(innerWidth * 0.9, innerHeight * 0.9);
  slider = createSlider(1, 100, 1);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  // pipes.push(new Pipe());
}
function draw() {
  for (let cy = 0; cy < slider.value(); cy++) {
    if (counter % 60 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
    for (let i = pipes.length - 1; i > 0; i--) {
      // pipes[i].show();
      pipes[i].update();
      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offScreen()) {
        pipes.splice(i, 1);
      }
    }
    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].getBelow()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }
    for (let i = 0; i < birds.length; i++) {
      birds[i].update();

      birds[i].think(pipes);
    }
    // if (birds.length == 1) {
    //   bestBird = birds[0];
    //   console.log(bestBird);
    // }
    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }
  //Draw things
  background(0, 125, 255);
  for (p of pipes) {
    p.show();
  }
  for (q of birds) {
    q.show();
  }
}
function keyPressed() {
  if (key === " ") {
    let bi = birds[0];
    saveJSON(bi.brain, "BestBirdNN.json");
  }
}
//Let the bird be free
// function keyPressed() {
//   if (key == " ") {
//     bird.up();
//     // console.log("Space Pressed");
//   }
// }
