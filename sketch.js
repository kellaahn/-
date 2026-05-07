let dots = []; 
let cols, rows;
let size = 20; 
let margin = 149; 

let pg;

let clickCount = 0;

let QxOffset = 0;    
let QyOffset = 0;    
let Qvelocity = 0;  
let Qgravity = 0.8;  //점프 저항감 
let QjumpForce = -15; 
let QjumpDist = -21;  

let WxOffset = 0;    
let WyOffset = 0;    
let Wvelocity = 0;  
let Wgravity = 0.8;  //점프 저항감 
let WjumpForce = -14; 
let WjumpDist = -7;  

let ExOffset = 0;    
let EyOffset = 0;    
let Evelocity = 0;  
let Egravity = 0.8;  //점프 저항감 
let EjumpForce = -13; 
let EjumpDist = +36;  

let RxOffset = 0;    
let RyOffset = 0;    
let Rvelocity = 0;  
let Rgravity = 0.8;  //점프 저항감 
let RjumpForce = -12; 
let RjumpDist = +73;  

let TxOffset = 0;    
let TyOffset = 0;    
let Tvelocity = 0;  
let Tgravity = 0.8;  //점프 저항감 
let TjumpForce = -7; 
let TjumpDist = +15;  

//음악 변수들 모음집
let song1, song2, song3, song4, song5; 
let volon1 = 0, volon2 = 0, volon3 = 0, volon4 = 0, volon5 = 0;






function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);
    
  //fft = new p5.FFT(0.8);

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




function mousePressed() {
  userStartAudio();
  clickCount++;
 
  if (clickCount === 21) {
    song1 = loadSound('Track1.mp3', () => { song1.loop(); song1.setVolume(1); });
    song2 = loadSound('Track2.mp3', () => { song2.loop(); song2.setVolume(0); });
    song3 = loadSound('Track3.mp3', () => { song3.loop(); song3.setVolume(0); });
    song4 = loadSound('Track4.mp3', () => { song4.loop(); song4.setVolume(0); });
    song5 = loadSound('Track5.mp3', () => { song5.loop(); song5.setVolume(0); });
  }

  if (clickCount === 32) { song2.setVolume(1); }
  if (clickCount === 40) { song3.setVolume(1); }
  if (clickCount === 40) { song4.setVolume(1); }
  if (clickCount === 48) { song5.setVolume(1); }

  if (QyOffset >= 0 && QyOffset <= 4) {
    Qvelocity = QjumpForce + clickCount * 0.3; 
    QxOffset = QxOffset + QjumpDist;  
  }

  if (WyOffset >= 0 && WyOffset <= 4) {
    Wvelocity = WjumpForce + (clickCount - 21) * 0.3; 
    WxOffset = WxOffset + WjumpDist;  
  }

  if (EyOffset >= 0 && EyOffset <= 4) {
    Evelocity = EjumpForce + (clickCount - 40) * 0.5; 
    ExOffset = ExOffset + EjumpDist; 
  }

   if (RyOffset >= 0 && RyOffset <= 4) {
    Rvelocity = RjumpForce + (clickCount - 48) * 0.7; 
    RxOffset = RxOffset + RjumpDist; 
  }

   if (TyOffset >= 0 && TyOffset <= 4) {
    Tvelocity = TjumpForce + (clickCount - 55) * 0.3; 
    TxOffset = TxOffset + TjumpDist; 

    
  }
}

function draw() {

  background(10, 30); 
  
  for (let i = 0; i < cols; i=i+1) {
    for (let j = 0; j < rows; j=j+1) {
      dots[i][j].update();
      dots[i][j].display();
    }
  }
  



 
  //matryo 2 아웃라인---------------------------------------------------------------------------------------------- 0-2
  let Dcx = windowWidth / 2;
  let DtopCircleY = windowHeight / 2.3; 
  let DbotCircleY = windowHeight / 1.55; 
  let DtopR = 133; 
  let DbotR = 248; 
  let Dbet = 3.5*sin(frameCount*0.04);
  pg.clear();      
  pg.noStroke();
  pg.fill(235);     
  fill(235);
  pg.ellipse(Dcx, DtopCircleY-20 + Dbet, DtopR+13.8, DtopR);
  pg.ellipse(Dcx, DbotCircleY-10 - Dbet, DbotR, DbotR+47); 
  let DtopHalfR = DtopR / 2; 
  let DtopConnectY = DtopCircleY + DtopHalfR * 0.4;  
  pg.beginShape();
  pg.vertex(Dcx - DtopHalfR*1.1, DtopConnectY-31 + Dbet); 
  pg.bezierVertex(
    Dcx - DtopHalfR * 0.89, DtopConnectY + 5 , 
    Dcx - DtopHalfR * 1.3, DtopConnectY + 15, 
    Dcx - DtopHalfR * 1.68, DtopConnectY + 58.5 - Dbet   
  );
  pg.vertex(Dcx + DtopHalfR * 1.68, DtopConnectY+58.5 - Dbet);
  pg.bezierVertex(
    Dcx + DtopHalfR * 1.3, DtopConnectY + 15,
    Dcx + DtopHalfR * 0.89, DtopConnectY + 5,
    Dcx + DtopHalfR * 1.1, DtopConnectY -31 + Dbet
  );
  pg.endShape(CLOSE);
  tint(10, 255)
  //image(pg, 0, 0);

  
  //matryo 1 껍질 아웃라인 ---------------------------------------------------------------------------------------------- 0-1
  let Scx = windowWidth / 2;
  let StopCircleY = windowHeight / 2.8; 
  let SbotCircleY = windowHeight / 1.65; 
  let StopR = 200; 
  let SbotR = 318; 
  let Sbet = 3.5*sin(frameCount*0.04);
  pg.clear();      
  pg.noStroke();
  pg.fill(235);    
  fill(235);
  pg.ellipse(Scx, StopCircleY -20 + Sbet, StopR+13.8, StopR);
  pg.ellipse(Scx, SbotCircleY - Sbet, SbotR, SbotR+47);
  let StopHalfR = StopR / 2;
  let StopConnectY = StopCircleY + StopHalfR * 0.4; 
  pg.beginShape();
  pg.vertex(Scx - StopHalfR*1.043 , StopConnectY-38 + Sbet ); 
  pg.bezierVertex(
    Scx - StopHalfR * 0.9 , StopConnectY + 5 , 
    Scx - StopHalfR * 1.2 , StopConnectY + 15, 
    Scx - StopHalfR * 1.34 , StopConnectY + 58.5 - Sbet  
  ); 
  pg.vertex(Scx + StopHalfR * 1.34, StopConnectY+58.5 - Sbet );
  pg.bezierVertex(
    Scx + StopHalfR * 1.2 , StopConnectY + 15,
    Scx + StopHalfR * 0.9 , StopConnectY + 5,
    Scx + StopHalfR * 1.043 , StopConnectY -38 + Sbet 
  );
  pg.endShape(CLOSE);
  tint(10, 165 - clickCount*4);
  //image(pg, 0, 0);

 //중간 가리개 
  rectMode(CENTER);
  fill(10);
  rect(width/2 - 240, height/2, 80, 950);

  rectMode(CENTER);
  fill(10);
  rect(width/2 + 110, height/2, 65, 950);

  rectMode(CENTER);
  fill(10);
  rect(width/2 + 380, height/2, 40, 950);

  background(10, 30);
 
  //가리개
  rectMode(CENTER);
  fill(10, 255 - (clickCount-40)*10);
  rect(width/2 +890, height/2, windowWidth - 500, windowHeight);

  rectMode(CENTER);
  fill(10, 255 - (clickCount-33)*10);
  rect(width/2 +590, height/2, windowWidth - 500, windowHeight);

  rectMode(CENTER);
  fill(10, 255 - (clickCount-21)*10);
  rect(width/2 +280, height/2, windowWidth - 500, windowHeight);


  rectMode(CENTER);
  fill(10, 255 - (clickCount)*10);
  rect(width/2, height/2, windowWidth, windowHeight);

//----------------------------------------------------------------------------------------------------------  
//matryo 5껍질 ---------------------------------------------------------------------------------------------- 5
  let Tcx = windowWidth / 2;
  let TtopCircleY = windowHeight / 2.4; 
  let TbotCircleY = windowHeight / 1.77; 
  let TtopR = 30; 
  let TbotR = 102; 
  let Tbet = 0*sin(frameCount*0.04);
  pg.clear();      
  pg.noStroke();
  pg.fill(255);    
  fill(255);
  pg.ellipse(Tcx, TtopCircleY-20 + Tbet, TtopR+13.8, TtopR);
  pg.ellipse(Tcx, TbotCircleY-10 - Tbet, TbotR, TbotR+47);
  let TtopHalfR = TtopR / 2;
  let TtopConnectY = TtopCircleY + TtopHalfR * 0.4; 
  pg.beginShape(); 
  pg.vertex(Tcx - TtopHalfR*1.07, TtopConnectY-38 + Tbet); 
  pg.bezierVertex(
    Tcx - TtopHalfR * 0.9, TtopConnectY + 5 , 
    Tcx - TtopHalfR * 1, TtopConnectY + 15, 
    Tcx - TtopHalfR * 1.34, TtopConnectY + 58.5 - Tbet   
  );
  pg.vertex(Tcx + TtopHalfR * 1.34, TtopConnectY+58.5 - Tbet);
  pg.bezierVertex(
    Tcx + TtopHalfR * 1, TtopConnectY + 15,
    Tcx + TtopHalfR * 0.9, TtopConnectY + 5,
    Tcx + TtopHalfR * 1.07, TtopConnectY -38 + Tbet
  );
  pg.endShape(CLOSE);
  tint(255, 255);
  //image(pg, 0, 0);
  
  
//matryo 4껍질 ---------------------------------------------------------------------------------------------- 4
  let Ropacity = 255 - 15*(clickCount -40);
  if(clickCount>=41 && clickCount<=48){
  Rvelocity = Rvelocity + Rgravity;
  RyOffset = RyOffset + Rvelocity;
  }
  if (clickCount <= 41) {
    RxOffset = 0; 
  }
  if(clickCount >= 48){
    Rgravity = 0;
    RyOffset = 0;
    RjumpDist = 0;
    Ropacity = 42;
  }
  if (RyOffset > 0){
    RyOffset = 0;
    Rvelocity = 0;
  }
  push();
  translate(RxOffset, RyOffset);
  let Rcx = windowWidth / 2; 
  let RtopCircleY = windowHeight / 1.63; 
  let RbotCircleY = windowHeight / 1.41; 
  let RtopR = 60; 
  let RbotR = 102; 
  let Rbet = 2.5*sin(frameCount*0.04);
  pg.clear();      
  pg.noStroke();
  pg.fill(235);      
  fill(235);
  pg.ellipse(Rcx, RtopCircleY-20 + Rbet, RtopR+10.8, RtopR);
  pg.ellipse(Rcx, RbotCircleY-10 - Rbet, RbotR, RbotR+39); 
  let RtopHalfR = RtopR / 2; 
  let RtopConnectY = RtopCircleY + RtopHalfR * 0.4;   
  pg.beginShape();
  pg.vertex(Rcx - RtopHalfR*1.07, RtopConnectY-38 + Rbet); 
  pg.bezierVertex(
    Rcx - RtopHalfR * 0.9, RtopConnectY + 5 , 
    Rcx - RtopHalfR * 1, RtopConnectY + 15, 
    Rcx - RtopHalfR * 1.34, RtopConnectY + 58.5 - Rbet   
  );
  pg.vertex(Rcx + RtopHalfR * 1.34, RtopConnectY+58.5 - Rbet);
  pg.bezierVertex(
    Rcx + RtopHalfR * 1, RtopConnectY + 15,
    Rcx + RtopHalfR * 0.9, RtopConnectY + 5,
    Rcx + RtopHalfR * 1.07, RtopConnectY -38 + Rbet
  );
  pg.endShape(CLOSE);
  
  tint(255,Ropacity);
  image(pg, 0, 0);
  pop();

  
  //matryo 3껍질 ---------------------------------------------------------------------------------------------- 3
  let Eopacity = 255 - 15*(clickCount - 32);
  if(clickCount>=33 && clickCount<=40){
  Evelocity = Evelocity + Egravity;
  EyOffset = EyOffset + Evelocity;
  }
  if (clickCount <= 33) {
    ExOffset = 0; 
  }
  if(clickCount >= 40){
    Egravity = 0;
    EyOffset = 0;
    EjumpDist = 0;
    Eopacity = 38;
  }
  if (EyOffset > 0){
    EyOffset = 0;
    Evelocity = 0;
  }
  push();
  translate(ExOffset, EyOffset);
  let Ecx = windowWidth / 2;
  let EtopCircleY = windowHeight / 1.8; 
  let EbotCircleY = windowHeight / 1.46; 
  let EtopR = 65; 
  let EbotR = 129; 
  let Ebet =2.5*sin(frameCount*0.06);
  pg.clear();      
  pg.noStroke();
  pg.fill(235);    
  fill(235);
  pg.ellipse(Ecx, EtopCircleY-20 + Ebet, EtopR+13.8, EtopR);
  pg.ellipse(Ecx, EbotCircleY-10 - Ebet, EbotR, EbotR+47);
  let EtopHalfR = EtopR / 2;
  let EtopConnectY = EtopCircleY + EtopHalfR * 0.4; 
  pg.beginShape();
  pg.vertex(Ecx - EtopHalfR*1.18, EtopConnectY-25 + Ebet); 
  pg.bezierVertex(
    Ecx - EtopHalfR * 0.9, EtopConnectY - 5 , 
    Ecx - EtopHalfR * 1.3, EtopConnectY + 5, 
    Ecx - EtopHalfR * 1.74, EtopConnectY + 38.5 - Ebet   
  );
  pg.vertex(Ecx + EtopHalfR * 1.74, EtopConnectY+38.5 - Ebet);
  pg.bezierVertex(
    Ecx + EtopHalfR * 1.3, EtopConnectY + 5,
    Ecx + EtopHalfR * 0.9, EtopConnectY - 5,
    Ecx + EtopHalfR * 1.18, EtopConnectY -25 + Ebet
  );
  pg.endShape(CLOSE);
  tint(255, Eopacity);
  image(pg, 0, 0);
  pop();

  //matryo 2껍질 ---------------------------------------------------------------------------------------------- 2
    //그리기 시작
  let Wopacity = 255 - 18*(clickCount - 21);
  if(clickCount>=22 && clickCount<=32){
  Wvelocity = Wvelocity + Wgravity;
  WyOffset = WyOffset + Wvelocity;
  }
  if (clickCount <= 22) {
    WxOffset = 0; 
  }
  if(clickCount >= 32){
    Wgravity = 0;
    WyOffset = 0;
    WjumpDist = 0;
    Wopacity = 35;
  }
  if (WyOffset > 0){
    WyOffset = 0;
    Wvelocity = 0;
  }
  push();
  translate(WxOffset, WyOffset);
  let Wcx = windowWidth / 2;
  let WtopCircleY = windowHeight / 2.3; 
  let WbotCircleY = windowHeight / 1.56; 
  let WtopR = 110; 
  let WbotR = 222; 
  let Wbet = 2*sin(frameCount*0.04);
  pg.clear();      
  pg.noStroke();
  pg.fill(235);     
  fill(235);
  pg.ellipse(Wcx, WtopCircleY-20 + Wbet, WtopR+13.8, WtopR);
  pg.ellipse(Wcx, WbotCircleY-10 - 0.6*Wbet, WbotR, WbotR+47);
  let WtopHalfR = WtopR / 2;
  let WtopConnectY = WtopCircleY + WtopHalfR * 0.4; 
  pg.beginShape();
  pg.vertex(Wcx - WtopHalfR*1.1, WtopConnectY-31 + Wbet); 
  pg.bezierVertex(
    Wcx - WtopHalfR * 0.89, WtopConnectY + 5 , 
    Wcx - WtopHalfR * 1.3, WtopConnectY + 15, 
    Wcx - WtopHalfR * 1.68, WtopConnectY + 58.5 - Wbet   
  ); 
  pg.vertex(Wcx + WtopHalfR * 1.68, WtopConnectY+58.5 - Wbet); 
  pg.bezierVertex(
    Wcx + WtopHalfR * 1.3, WtopConnectY + 15,
    Wcx + WtopHalfR * 0.89, WtopConnectY + 5,
    Wcx + WtopHalfR * 1.1, WtopConnectY -31 + Wbet
  );
  pg.endShape(CLOSE);  
  tint(255, Wopacity);
  image(pg, 0, 0);
  pop();
  
  
  
  
  //matryo 1껍질 제일위 ---------------------------------------------------------------------------------------------- 1
  //그리기 시작
  let Qopacity = 255 - 10*clickCount; 
  if(clickCount<=21){
  Qvelocity = Qvelocity + Qgravity;
  QyOffset = QyOffset + Qvelocity;
  }
  if(clickCount >= 21){
    Qgravity = 0;
    QyOffset = 0;
    QjumpDist = 0;
    Qopacity = 35;
  }
  if (QyOffset > 0) {
    QyOffset = 0;
    Qvelocity = 0;
  }
    push();
  translate(QxOffset, QyOffset);
  let Qcx = windowWidth / 2;
  let QtopCircleY = windowHeight / 2.8; 
  let QbotCircleY = windowHeight / 1.65; 
  let QtopR = 160; 
  let QbotR = 272; 
  let Qbet = 2*sin(frameCount*0.04);
  pg.clear();      
  pg.noStroke();
  pg.fill(235);    
  fill(235);
  pg.ellipse(Qcx, QtopCircleY-20  + Qbet  , QtopR+13.8 , QtopR );
  pg.ellipse(Qcx, QbotCircleY-10  - 0.6*Qbet, QbotR , QbotR+47 );
  let QtopHalfR = QtopR / 2;
  let QtopConnectY = QtopCircleY + QtopHalfR * 0.4; 
  pg.beginShape();
  pg.vertex(Qcx - QtopHalfR*1.07 , QtopConnectY-38 + Qbet); 
  pg.bezierVertex(
    Qcx - QtopHalfR * 0.9, QtopConnectY + 5 , 
    Qcx - QtopHalfR * 1  , QtopConnectY + 15, 
    Qcx - QtopHalfR * 1.34 , QtopConnectY + 58.5 - Qbet 
  );
  pg.vertex(Qcx + QtopHalfR * 1.34 , QtopConnectY+58.5 - Qbet );
  pg.bezierVertex(
    Qcx + QtopHalfR * 1  , QtopConnectY + 15,
    Qcx + QtopHalfR * 0.9, QtopConnectY + 5,
    Qcx + QtopHalfR * 1.07 , QtopConnectY -38 + Qbet 
  );
  pg.endShape(CLOSE);
  tint(255, Qopacity);
  image(pg, 0, 0);
  pop();
  
 













}
  





