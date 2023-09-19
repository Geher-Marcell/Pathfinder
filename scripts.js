var grid;
const xSize = 50;
const ySize = 50;
const spreadValue = 20;
var fal = false;

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
        ) {
          array[x][y] = -1;
        }
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

        //Make the coloring go from red to white

        document.getElementById(`${x}-${y}`).style.backgroundColor =
          "rgb(255 " +
          255 / (array[x][y] * 5) +
          "," +
          255 / (array[x][y] * 5) +
          ")";
      }
    }
    await sleep(10);
  }
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
          switch (array[x][y]) {
            case 0:
              document.getElementById(`${x}-${y}`).style.backgroundColor =
                "black";
              array[x][y] = -1;
              break;
            case -1:
              document.getElementById(`${x}-${y}`).style.backgroundColor =
                "white";
              array[x][y] = 0;
              break;
          }
        }
      });
    }
  }
}
