class Dot {
  constructor(x, y) {
    this.pos = createVector(x, y);  
    this.dotColor = color(255);
  }

  update(){

  }

  display() {
    noStroke();
    
    fill(this.dotColor);
    
    ellipse(this.pos.x, this.pos.y, 10, 10);
    
  }

}
