let angle = 0;
let num = 0

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
} 

function draw(){
  background(200,88,88);

  num = num+0.1
  angle = angle+0.1
  
  push();
  translate(width/2, height/2)
  
  let shake = sin(frameCount*num)*angle;
  if(mouseIsPressed){
     rotate(shake);
  }
  ellipse(0,0,350,450);
  pop();
  
  if(num>30){
    num=0
  }
  if(angle>80){
    angle=0
  }

}
 