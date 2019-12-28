class Bird {
  constructor(brain) {
    this.x = 64;
    this.y = height / 2;
    this.gravity = 0.8;
    this.lift = -18;
    this.velocity = 0;
    this.score = 0;
    this.fitness = 0;
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }
  show() {
    noStroke();
    fill(255, 100);
    // ellipse(this.x, this.y, 32, 32);
    image(imgB, this.x, this.y, 32, 32);
  }
  think(pipes) {
    let closest = null;
    let closestDistance = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].w - this.x;
      if (d < closestDistance && d > 0) {
        closest = pipes[i];
        closestDistance = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[4] = this.velocity / 10;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    // console.log(inputs[4]);

    let output = this.brain.feedForward(inputs);
    // console.log("|" + output);
    if (output[0] > output[1]) {
      this.up();
    } else {
      // console.log("Who Cares?");
    }
  }
  mutate() {
    this.brain.mutate(0.1);
  }
  getBelow() {
    return this.y + 16 > height;
  }
  update() {
    this.score++;
    this.velocity += this.gravity;
    this.velocity *= 0.9; //Air resistance
    this.y += this.velocity;
    if (this.y - 16 < 0) {
      this.y = 16;
      this.velocity = 0;
    }
  }
  up() {
    this.velocity += this.lift;
    // console.log("I think we should go up");
  }
}
