class Pipe {
  constructor() {
    this.spacing = 175;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 15;
    this.touched = false;
  }
  show() {
    stroke(0);
    fill(173, 255, 47);
    if (this.touched) {
      fill(255, 0, 0);
    }
    // image(imgPR, this.x, 0, this.w, this.top);
    // image(imgP, this.x, height - this.bottom, this.w, this.bottom);
    strokeWeight(1);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  update() {
    this.x -= this.speed;
  }
  offScreen() {
    if (this.x + this.w < 0) {
      return true;
    }
  }
  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.touched = true;
        return true;
      }
      this.touched = false;
      return false;
    }
  }
}
