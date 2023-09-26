var grid;
const xSize = 50;
const ySize = 50;
const spreadValue = 20;
var fal = false;

var currentColor = 0;

var array;

onload = () => {
  grid = document.querySelector(".yes");
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

async function updateGrid(xDef, yDef) {
  array = createGrid(xSize, ySize);
  array[xDef][yDef] = +spreadValue;

  for (let i = 0; i < spreadValue; i++) {
    for (let x = 0; x < xSize; x++) {
      for (let y = 0; y < ySize; y++) {
        if (array[x][y] != array[xDef][yDef] - i) continue;
        if (
          document.getElementById(`${x}-${y}`).style.backgroundColor == "black"
        )
          array[x][y] = -1;

        if (array[x][y] == 0) continue;
        if (array[x][y] == -1) continue;

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

        switch (currentColor % 3) {
          case 0:
            document.getElementById(`${x}-${y}`).style.backgroundColor =
              "rgb(255,0, 0)";
            break;
          case 1:
            document.getElementById(`${x}-${y}`).style.backgroundColor =
              "rgb(0,255, 0)";
            break;
          case 2:
            document.getElementById(`${x}-${y}`).style.backgroundColor =
              "rgb(0,0, 255)";
            break;
        }
      }
    }
    await sleep(10);
  }

  currentColor++;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function checkbox() {
  fal = document.getElementById("kaksi").checked;
}

function drawGrid() {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${xSize}, 1fr)`;
  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      const div = document.createElement("div");
      div.classList.add("grid-item");
      grid.appendChild(div);
      div.id = `${x}-${y}`;

      div.addEventListener("click", () => {
        if (!fal) {
          updateGrid(x, y);
        } else {
          placeWalls(x, y);
        }
      });
    }
  }
}

function placeWalls(x, y) {
  switch (array[x][y]) {
    case -1:
      document.getElementById(`${x}-${y}`).style.backgroundColor = "white";
      array[x][y] = 0;
      break;
    default:
      document.getElementById(`${x}-${y}`).style.backgroundColor = "black";
      array[x][y] = -1;
      break;
  }
}

function smokeRemove() {
  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      if (array[x][y] == -1) continue;
      array[x][y] = 0;
      document.getElementById(`${x}-${y}`).style.backgroundColor = "white";
    }
  }
}

function wallRemove() {
  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      if (array[x][y] != -1) continue;
      array[x][y] = 0;
      document.getElementById(`${x}-${y}`).style.backgroundColor = "white";
    }
  }
}

function allRemove() {
  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      if (array[x][y] == 0) continue;
      array[x][y] = 0;
      document.getElementById(`${x}-${y}`).style.backgroundColor = "white";
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
