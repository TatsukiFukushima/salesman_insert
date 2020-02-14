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
  for (i=0; i<10; i=(i+1)|0){
    minRoute = swap(minRoute);
  }
  // 線を引く
  drawRoute(points, minRoute);
}

// swap ２つの経路を交差するように入れ替えて判断。
function swap(route) {
  let root1 = 0;
  let leaf1 = 0;
  let root2 = 0;
  let leaf2 = 0;
  while(true){
    root1 = Math.floor(Math.random() * n);
    root2 = Math.floor(Math.random() * n);
    if (root1 == nMinus) {
      leaf1 = 0;
    } else {
      leaf1 = root1+1;
    }
    if (root2 == 0) {
      leaf2 = nMinus;
    } else {
      leaf2 = root2-1;
    }

    if (leaf2 != leaf1 && leaf2 != root1 && root1 != root2) {
      break;
    }
  }

  // 短くならなければおしまい。
  if (distances[route[root1]][route[leaf1]]+distances[route[root2]][route[leaf2]]
    < distances[route[root1]][route[leaf2]]+distances[route[root2]][route[leaf1]]) {
    return route;
  }

  // 入れ替え処理
  let result = [n];
  for (let i=0; i<n; i++) {
    result[i] = route[i];
  }

  let pointFrom = leaf1;
  let pointTo = leaf2;
  while(true) {
    result[pointTo] = route[pointFrom];
    if (pointFrom == leaf2) {
      break;
    }
    if (pointTo == 0) {
      pointTo = nMinus;
    } else {
      pointTo--;
    }
    if (pointFrom == nMinus) {
      pointFrom = 0;
    } else {
      pointFrom++;
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
