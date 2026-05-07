let dots = []; 
let cols, rows;
let size = 20; 
let margin = 179; 
let pg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // ★ 중요: pg는 여기서 딱 한 번만 만듭니다. (렉 방지 핵심)
  pg = createGraphics(windowWidth, windowHeight);

  cols = (width - margin * 2) / size;
  rows = (height - margin * 2) / size;

  for (let i = 0; i < cols; i++) {
    dots[i] = [];
    for (let j = 0; j < rows; j++) {
      let x = margin + size / 2 + i * size;
      let y = margin + size / 2 + j * size;
      let d = dist(x, y, width / 2, height / 2);
      let angle = map(d, 0, width / 2, 0, TWO_PI * 3); 
      dots[i][j] = new Dot(x, y, angle, 0.01, map(d, 0, width / 2, 0.1, 0.05));
    }
  }
}

function draw() {
  background(10, 30); 

  // 점들 그리기 (기존 코드 유지)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      dots[i][j].update();
      dots[i][j].display();
    }
  }

  noStroke();
  fill(10); 
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 1.92, 450, 950);

  // ----------------------------------------------------------------
  // ★ 마트료시카 5개 그리기 
  // 안쪽(작은 것)부터 그려야 바깥쪽이 투명해졌을 때 안이 보입니다.
  // drawDoll(크기비율, 투명도) - 크기는 직접 맞춰보세요!
  // ----------------------------------------------------------------
  drawDoll(0.4, 255); // 1번 (가장 안쪽)
  drawDoll(0.55, 255); // 2번
  drawDoll(0.7, 255); // 3번
  drawDoll(0.85, 255); // 4번
  drawDoll(1.0, 205); // 5번 (가장 바깥쪽)
}

// 마트료시카 "틀" 함수 (이것만 수정하면 5개가 다 바뀝니다)
function drawDoll(scl, alpha) {
  pg.clear();      
  pg.noStroke();
  pg.fill(235);    

  // 기준점 설정
  let cx = windowWidth / 2;
  let topCircleY = windowHeight / 2.8; 
  let botCircleY = windowHeight / 1.65; 
  let topR = 160; 
  let botR = 272; 

  pg.push();
  // 중앙 기준으로 크기 조절
  pg.translate(cx, (topCircleY + botCircleY) / 2);
  pg.scale(scl);
  pg.translate(-cx, -(topCircleY + botCircleY) / 2);

  // 머리와 몸통
  pg.ellipse(cx, topCircleY - 20, topR + 13.8, topR);
  pg.ellipse(cx, botCircleY - 10, botR, botR + 47);

  // 이음새
  let topHalfR = topR / 2;
  let topConnectY = topCircleY + topHalfR * 0.4; 

  pg.beginShape();
  pg.vertex(cx - topHalfR * 1.07, topConnectY - 38); 
  pg.bezierVertex(
    cx - topHalfR * 0.9, topConnectY + 5, 
    cx - topHalfR * 1, topConnectY + 15, 
    cx - topHalfR * 1.34, topConnectY + 58.5
  );
  pg.vertex(cx + topHalfR * 1.34, topConnectY + 58.5);
  pg.bezierVertex(
    cx + topHalfR * 1, topConnectY + 15,
    cx + topHalfR * 0.9, topConnectY + 5,
    cx + topHalfR * 1.07, topConnectY - 38
  );
  pg.endShape(CLOSE);
  pg.pop();

  // 최종 출력 (투명도 적용)
  tint(255, alpha);
  image(pg, 0, 0);
  noTint();
}