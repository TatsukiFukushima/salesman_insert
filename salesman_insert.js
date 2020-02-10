const n = 15;
const nMinus = n-1;
const nMinus2 = n-2;
let points = [];
let distances = [];
let minDistance = 1000000;
let minRoute = [15];

function setup() {
  // 点を配置
  for (let i = 0; i < n; i++) {
    let p = [Math.random() * windowWidth, Math.random() * windowHeight];
    points[i] = p;
    minRoute[i] = i;
  }

  // 各点ごとの距離とベクトルを計算
  for (let i = 0; i < n; i++) {
    let distance = [];
    for (let j = 0; j < n; j++) {
      if (i == j) {
        distance[j] = 0;
      } else {
        distance[j] = Math.sqrt(Math.pow(points[i]-points[j], 2) + Math.pow(points[i]-points[j], 2));
      }
    }
    distances[i] = distance;
  }

  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  // 線を引く
  drawRoute(points, minRoute);
}

// drawRoute ルートを描画する p:ポイント r:ルート
function drawRoute(p, r) {
  for (let i = 0; i < n; i++) {
    noStroke();
    fill(255);
    ellipse(p[i][0], p[i][1], 10, 10);
  }

  strokeWeight(1);
  stroke(255, 3);
  line(p[nMinus][0], p[nMinus][1], p[r[0]][0], p[r[0]][1]);
  for (let i = 0; i < n-2; i++) {
    line(p[r[i]][0], p[r[i]][1], p[r[i+1]][0], p[r[i+1]][1]);
  }
  line(p[r[n-2]][0], p[r[n-2]][1], p[nMinus][0], p[nMinus][1]);
}
