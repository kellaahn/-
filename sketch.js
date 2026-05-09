let dots = []; 
let cols, rows;
let size = 60; 
let margin = 149; 

let pg;
let clickCount = 0;


let QxOffset = 0;  
let QyOffset = 0;    
let Qvelocity = 0;  
let Qgravity = 0.8;  //점프 저항감 
let QjumpForce = -15; 
let QjumpDist = -740;  

let WxOffset = 0;
let WyOffset = 0;    
let Wvelocity = 0;  
let Wgravity = 0.8;  //점프 저항감 
let WjumpForce = -14; 
let WjumpDist = -590;  

let ExOffset = 0;
let EyOffset = 0;    
let Evelocity = 0;  
let Egravity = 0.8;  //점프 저항감 
let EjumpForce = -13; 
let EjumpDist = -300;  

let RxOffset = 0;
let RyOffset = 0;    
let Rvelocity = 0;  
let Rgravity = 0.8;  //점프 저항감 
let RjumpForce = -12; 
let RjumpDist = -400;  


//음악 변수들 모음집
let song0, song1, song2, song3, song4, song5; 
let volon0, volon1 = 0, volon2 = 0, volon3 = 0, volon4 = 0, volon5 = 0;

let soundLoaded = false;

//초기화면 넘어올때
let gameState = "INTRO";
let isChangingState = false;

let introOffset = 0;
let introStarted = false;

let introImgX = 0;
let introImgVelocity = -25;
let introImgGravity = 0.8;


//배경이미지 
let bg;
let matryoImg;

//가림막 변수들
let QStarted = false;
let WStarted = false;
let EStarted = false;
let RStarted = false;

let QrevealAlpha = 0;  // 0에서 255로 서서히 증가
let WrevealAlpha = 0;
let ErevealAlpha = 0;
let RrevealAlpha = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);
    
  
  


  let startBtn = select('#start-button');
  startBtn.mousePressed(() => {
      introStarted = true; 
      introImgVelocity = -25;
      userStartAudio();

    
  });

  cols = (width - margin * 2) / size;
  rows = (height - margin * 2) / size;

  for (let i = 0; i < cols; i=i+1) {
    dots[i] = [];
    for (let j = 0; j < rows; j=j+1) {
    
      let x = margin  + i * size;
      let y = margin  + j * size;
      
      dots[i][j] = new Dot(x, y);
     
 
  

  
    }
  }
}

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
    
    ellipse(this.pos.x, this.pos.y, 30, 30);
    
  }

}




function mousePressed() {

if(gameState === "INTRO" || isChangingState) return;

if(gameState === "PLAY"){
  
  clickCount++;
  
    song0 = loadSound('Track0.mp3', () => { song0.play(); song0.setVolume(1); });
  
  
  

//1
  if (QyOffset >= -20 && QyOffset <=200 ) {
    Qvelocity = QjumpForce 
    QxOffset = QxOffset + QjumpDist;  
    QStarted = true;
  }
//2
  if (WyOffset >= -20 && WyOffset <= 200 && QjumpDist ===0) {
    Wvelocity = WjumpForce 
    WxOffset = WxOffset + WjumpDist;    
    WStarted = true;  
  }
//3
  if (EyOffset >= -20 && EyOffset <= 200 && WjumpDist ===0) {
    Evelocity = EjumpForce 
    ExOffset = ExOffset + EjumpDist; 
    EStarted = true;
  }
//4
   if (RyOffset >= -20 && RyOffset <= 200 && EjumpDist ===0) {
    Rvelocity = RjumpForce 
    RxOffset = RxOffset + RjumpDist; 
    RStarted = true;
  }


  
  }
 
}

function preload() {
  // 이미지를 미리 로드합니다. 파일명을 실제 저장한 이름으로 바꿔주세요.
  bg = loadImage('bgMatryoshka.png');
  matryoImg = loadImage('matryo.png');
}



function draw() {
  if(gameState === "INTRO"){
   // image(bg, 0, 0, width, height);
    background(10);

     //여기다가 첫화면 애니매이션 넣으면 되고
    

 
 
  if (introStarted) {
  introImgVelocity += introImgGravity;
  introImgX += 12;
  introOffset += introImgVelocity;

if (introOffset > 200) {
    introOffset = 200;
    introImgVelocity *= -0.6;
  }
}

if (introImgX > windowWidth) {
  select('#intro-screen').hide();
  gameState = "PLAY";
}


imageMode(CENTER);
tint(255, 20);
image(matryoImg, windowWidth/2 , windowHeight/2, 2800, 4300);  // 가장 바깥 → 느리게

tint(255, 30);
image(matryoImg, windowWidth/2 , windowHeight/2, 2600, 4100);

tint(255, 40);
image(matryoImg, windowWidth/2 , windowHeight/2, 2400, 3900);

tint(255, 60);
image(matryoImg, windowWidth/2 , windowHeight/2, 2200, 3700);

tint(255, 70);
image(matryoImg, windowWidth/2 , windowHeight/2, 1900, 3400);

tint(255, 80);
image(matryoImg, windowWidth/2 , windowHeight/2, 1600, 2800);

tint(255, 150);
image(matryoImg, windowWidth/2 , windowHeight/2, 1200, 2000);

tint(255, 255);
image(matryoImg, windowWidth/2 + introImgX, windowHeight/2 + introOffset, 900, 1500);
noTint();
    
    
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  }else if(gameState === "PLAY"){
  
    background(10); 
  
   // Q 고정되면 song1 로드
if (!soundLoaded && QjumpDist === 0 && QStarted) {
  soundLoaded = true;
  song1 = loadSound('Track1.mp3', () => { song1.loop(); song1.setVolume(1); });
  song2 = loadSound('Track2.mp3', () => { song2.loop(); song2.setVolume(0); });
  song3 = loadSound('Track3.mp3', () => { song3.loop(); song3.setVolume(0); });
  song4 = loadSound('Track4.mp3', () => { song4.loop(); song4.setVolume(0); });
  song5 = loadSound('Track5.mp3', () => { song5.loop(); song5.setVolume(0); });
}

if (song2 && WjumpDist === 0 && WStarted) { song2.setVolume(1); song1.setVolume(0.5); }
if (song3 && EjumpDist === 0 && EStarted) { song3.setVolume(0.5); song2.setVolume(0.5); }
if (song4 && EjumpDist === 0 && EStarted) { song4.setVolume(1); }
if (song5 && RjumpDist === 0 && RStarted) { song5.setVolume(1); song4.setVolume(0.5); }





  
  for (let i = 0; i < cols; i=i+1) {
    for (let j = 0; j < rows; j=j+1) {
      dots[i][j].update();
      dots[i][j].display();
    }
  }

QrevealAlpha = map(QxOffset, 0, -3100, 0, 255);
QrevealAlpha = constrain(QrevealAlpha, 0, 255);

WrevealAlpha = map(WxOffset, 0, -2650, 0, 165);
WrevealAlpha = constrain(WrevealAlpha, 0, 165);

ErevealAlpha = map(ExOffset, 0, -2100, 0, 135);
ErevealAlpha = constrain(ErevealAlpha, 0, 135);

RrevealAlpha = map(RxOffset, 0, -1500, 0, 105);
RrevealAlpha = constrain(RrevealAlpha, 0, 105);


 //중간 가리개 
  rectMode(CENTER);
  fill(10);
  rect(width/2 - 240, height/2, 80, 950);

  rectMode(CENTER);
  fill(10);
  //rect(width/2 + 110, height/2, 65, 950);

  rectMode(CENTER);
  fill(10);
  //rect(width/2 + 380, height/2, 40, 950);

  
 
  //가리개
  rectMode(CENTER);

 // 처음엔 전부 가려져 있다가 클릭할수록 왼쪽부터 열림

fill(10, 255 - QrevealAlpha);
rect(width/2 , height/2, windowWidth , windowHeight);  // 왼쪽 첫번째 영역

fill(10, 255 - WrevealAlpha);
rect(width/2, height/2, windowWidth/2 + 1400, windowHeight);  // 두번째

fill(10, 255 - ErevealAlpha);
rect(width/2, height/2, windowWidth/2 + 800, windowHeight);  // 세번째

fill(10, 255 - RrevealAlpha);
rect(width/2, height/2, windowWidth/2 + 400, windowHeight);  // 네번째

fill(10, 255);
rect(width/2, height/2, windowWidth/2 + 120, windowHeight );  // 네번째

//----------------------------------------------------------------------------------------------------------  

  
  
//matryo 4껍질 ---------------------------------------------------------------------------------------------- 4
  let Ropacity = 255 - RrevealAlpha;
  if( EjumpDist ===0){
  if(RxOffset >= -1600){
  Rvelocity = Rvelocity + Rgravity;
  RyOffset = RyOffset + Rvelocity;
  }
  else{
    Rgravity = 0;
    RyOffset = 0;
    RjumpDist = 0;
    Ropacity = 40;

  }
  }
  
  if (RyOffset > 0){
    RyOffset = 0;
    Rvelocity = 0;
  }
  push();
  translate(RxOffset, RyOffset);

  
  tint(255,Ropacity);
  imageMode(CENTER);
  image(matryoImg,  windowWidth + 400 , windowHeight/2 + 530 , 300, 450);  
  pop();

  
  //matryo 3껍질 ---------------------------------------------------------------------------------------------- 3
  let Eopacity = 255 - ErevealAlpha;
  
  if(WjumpDist ===0){
  if(ExOffset >= -2100){
  Evelocity = Evelocity + Egravity;
  EyOffset = EyOffset + Evelocity;
  }
  else {
    Egravity = 0;
    EyOffset = 0;
    EjumpDist = 0;
    Eopacity = 80;

  }
  }
  
  if (EyOffset > 0){
    EyOffset = 0;
    Evelocity = 0;
  }
  push();
  translate(ExOffset, EyOffset);
 
  tint(255, Eopacity);
  imageMode(CENTER);
  image(matryoImg,  windowWidth + 400 , windowHeight/2 + 450 , 420, 630);  
  pop();

  //matryo 2껍질 ---------------------------------------------------------------------------------------------- 2
    //그리기 시작
  let Wopacity = 255 - WrevealAlpha;
  
  if(QjumpDist ===0){
  if(WxOffset >= -2550 ){
  Wvelocity = Wvelocity + Wgravity;
  WyOffset = WyOffset + Wvelocity;
  }
  else{
    Wgravity = 0;
    WyOffset = 0;
    WjumpDist = 0;
    Wopacity = 170;

  }
  }
  if (WyOffset > 0){
    WyOffset = 0;
    Wvelocity = 0;
  }
  
  push();
  translate(WxOffset, WyOffset);
 
  tint(255, Wopacity);
  imageMode(CENTER);
  image(matryoImg,  windowWidth +400 , windowHeight/2 + 300 , 600, 900);  
  pop();
  
  
  
  
  //matryo 1껍질 제일위 ---------------------------------------------------------------------------------------------- 1
  //그리기 시작
  let Qopacity = 255 - QrevealAlpha;
  if(QxOffset >= -3300){
  Qvelocity = Qvelocity + Qgravity;
  QyOffset = QyOffset + Qvelocity;
  }
  else{
  
    Qgravity = 0;
    QyOffset = 0;
    QjumpDist = 0;
    Qopacity = 205;
    
  }
  if (QyOffset > 0) {
    QyOffset = 0;
    Qvelocity = 0;
  }
    push();
  translate(QxOffset, QyOffset);
     
  tint(255, Qopacity);
  imageMode(CENTER);
  image(matryoImg, windowWidth + 400 , windowHeight/2 , 900, 1500);  
  pop();
}

}








  





