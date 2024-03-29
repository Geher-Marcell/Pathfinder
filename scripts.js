const xSize = 50;
const ySize = 50;

var array;

firstPoint = null;
secondPoint = null;

onload = () => {  
  array = createGrid(xSize, ySize);
  drawGrid();
};

function createGrid(xSize, ySize) {
  let array = new Array(xSize);
  for (let x = 0; x < xSize; x++) {
    array[x] = new Array(ySize);
    for (let y = 0; y < ySize; y++) {
      array[x][y] = 0;
    }
  }
  return array;
}

function drawGrid() {
  let grid = document.querySelector(".gridHolder");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${xSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${ySize}, 1fr)`;

  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      const div = document.createElement("div");
      div.classList.add("grid-item");
      grid.appendChild(div);
      div.id = `${x}-${y}`;

      //div.innerHTML = array[x][y];

      div.addEventListener("click", () => {
        GridClickEvent(x, y);
      });

      div.addEventListener("mouseover", (event) => {
        if (event.buttons == 1) {
          array[x][y] = -1;
          Visualize(x, y, "purple");
        }
      });
    }
  }
}

async function FindTarget(xDef, yDef) {
  let spread = xSize * ySize;
  let foundTarget = false;
  let i = 0;

  array[xDef][yDef] = +spread;
  
  while (+spread > i && foundTarget == false) {
    for (let x = 0; x < xSize; x++) {
      for (let y = 0; y < ySize; y++) {
        if (array[x][y] != array[xDef][yDef] - i) continue;

        if (array[x][y] == -1) continue;

        Visualize(x, y);

        if(x == firstPoint.x && y == firstPoint.y){ foundTarget = true; }

        try {
          if (array[x + 1][y] == 0) {
            array[x + 1][y] = array[x][y] - 1;
          }
        } catch {}
        try {
          if (array[x - 1][y] == 0) {
            array[x - 1][y] = array[x][y] - 1;
          }
        } catch {}
        try {
          if (array[x][y + 1] == 0) {
            array[x][y + 1] = array[x][y] - 1;
          }
        } catch {}
        try {
          if (array[x][y - 1] == 0) {
            array[x][y - 1] = array[x][y] - 1;
          }
        } catch {}
      }
    }
    i++;
    await sleep(10);
  }
  Pathfind(firstPoint.x, firstPoint.y, xDef, yDef);
}

function SetGridValue(x, y){
  let divHolder = document.getElementById(`${x}-${y}`);
  divHolder.innerHTML = array[x][y];
}

function ColorGrid(x, y, color){
  let divHolder = document.getElementById(`${x}-${y}`);
  divHolder.style.backgroundColor = color;
}

function GridClickEvent(x, y){
  if(firstPoint == null){
    firstPoint = {x, y};
    ColorGrid(x, y , "red");
  }
  else if(secondPoint == null){
    FindTarget(x, y);
  }
}

async function Pathfind(startX, startY, endX, endY){
  let currentX = startX;
  let currentY = startY;
  while(currentX != endX || currentY != endY){
    Visualize(currentX, currentY, "green");

    let neighbors = [];
    if(currentX+1 < xSize) neighbors.push({x: currentX+1, y: currentY});
    if(currentX-1 >= 0) neighbors.push({x: currentX-1, y: currentY});
    if(currentY+1 < ySize) neighbors.push({x: currentX, y: currentY+1});
    if(currentY-1 >= 0) neighbors.push({x: currentX, y: currentY-1});

    neighbors.sort((a, b) => { return array[b.x][b.y] - array[a.x][a.y]; });

    currentX += neighbors[0].x - currentX;
    currentY += neighbors[0].y - currentY;

    await sleep(10);
  }
  Visualize(startX, startY, "blue");
  Visualize(currentX, currentY, "blue");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


function Visualize(x, y, color = "rgb(125, 125, 125)"){
  ColorGrid(x, y, color);
  SetGridValue(x, y);
}