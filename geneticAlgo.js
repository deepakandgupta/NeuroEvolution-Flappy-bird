function nextGeneration() {
  console.log("Next Generation");
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickBestSoFar();
  }
  savedBirds = [];
}
function calculateFitness() {
  let sum = 0;
  for (let b of savedBirds) {
    sum += b.score;
  }

  for (let b of savedBirds) {
    b.fitness = b.score / sum; // Fitness function can be optimised
  }
}
// function bestBirdChoose() {
//   console.log(bestBird);

//   let child = bestBird;
//   child.mutate();
//   return child;
// }
function pickBestSoFar() {
  let index = 0;
  let randomN = Math.random();
  while (randomN > 0) {
    randomN = randomN - savedBirds[index].fitness;
    index++;
    if (index > savedBirds.length) {
      index = 1;
    }
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate(0.1);
  return child;
}
