const n = 100;
const nMinus = n-1;
let points = [];
let distances = [];
let minDistance = 1000000;
let minRoute = [n];

function setup() {
  // 点を配置
  for (let i = 0; i < n; i++) {
    let p = [Math.random() * windowWidth, Math.random() * windowHeight];
    points[i] = p;
    minRoute[i] = i;
  }

  // 各点ごとの距離を計算
  for (let i = 0; i < n; i++) {
    let distance = [];
    for (let j = 0; j < n; j++) {
      if (i == j) {
        distance[j] = 0;
      } else {
        distance[j] = Math.sqrt(Math.pow(points[i][0]-points[j][0], 2) + Math.pow(points[i][1]-points[j][1], 2));
      }
    }
    distances[i] = distance;
  }

  width = windowWidth;
  height = windowHeight;

  createCanvas(width, height);
  background(0);
}

function draw() {
  for (i=0; i<100; i=(i+1)|0){
    minRoute = swap(minRoute);
  }
  // 線を引く
  drawRoute(points, minRoute);
}

// swap ２つの経路を交差するように入れ替えて判断。
function swap(route) {
  let branch1L = Math.floor(Math.random() * n);
  if (branch1L == nMinus) {
    var branch1R = 0;
  } else {
    var branch1R = branch1L+1;
  }
  let branch2L = branch1R + 1 + Math.floor(Math.random() * (n-3));
  if (branch2L > nMinus) {
    branch2L -= nMinus;
  }
  if (branch2L == nMinus) {
    var branch2R = 0;
  } else {
    var branch2R = branch2L+1;
  }

  // 短くならなければおしまい。
  if (distances[route[branch1L]][route[branch1R]]+distances[route[branch2L]][route[branch2R]]
    < distances[route[branch1L]][route[branch2L]]+distances[route[branch2R]][route[branch1R]]) {
    return route;
  }

  // 入れ替え処理
  let result = [n];
  for (let i=0; i<n; i++) {
    result[i] = route[i];
  }

  if (branch1R < branch2L) {
    var pointFrom = branch1R;
    var pointTo = branch2L;
  } else {
    var pointFrom = branch2R;
    var pointTo = branch1L;
  }

  while(true) {
    result[pointTo] = route[pointFrom];
    result[pointFrom] = route[pointTo];
    pointFrom++;
    pointTo--;
    if (pointFrom >= pointTo) {
      break;
    }
  }
  return result;
}

// drawRoute ルートを描画する p:ポイント r:ルート
function drawRoute(p, r) {
  noStroke();
  fill(0);
  rect(0, 0, width, height);
  fill(255);
  for (let i = 0; i < n; i++) {
    ellipse(p[i][0], p[i][1], 10, 10);
  }

  strokeWeight(1);
  stroke(255);
  line(p[r[nMinus]][0], p[r[nMinus]][1], p[r[0]][0], p[r[0]][1]);
  for (let i = 0; i < nMinus; i++) {
    line(p[r[i]][0], p[r[i]][1], p[r[i+1]][0], p[r[i+1]][1]);
  }
}
