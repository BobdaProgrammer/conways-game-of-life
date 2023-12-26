let grid = [];
let playing = false;
let Reset;
let Playspeed = 500;

function initializeGrid() {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.innerHTML = "";

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundColor = grid[i][j] ? "black" : "white";
      cell.addEventListener("click", () => { toggleCell(i, j); Reset = grid });
      gridContainer.appendChild(cell);
    }
  }
}

function toggleCell(i, j) {
  grid[i][j] = !grid[i][j];
  updateGridUI();
}

function nextGen() {
  let count = 0;
  const nextGene = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(0)
  );

  for (let i = 0; i < grid.length; i++) {
    for (let x = 0; x < grid[i].length; x++) {
      count = 0;
      if (grid[i][x + 1]) count++;
      if (grid[i][x - 1]) count++;
      if (i > 0 && grid[i - 1][x]) count++;
      if (i < grid.length - 1 && grid[i + 1][x]) count++;
      if (i > 0 && grid[i - 1][x + 1]) count++;
      if (i > 0 && grid[i - 1][x - 1]) count++;
      if (i < grid.length - 1 && grid[i + 1][x + 1]) count++;
      if (i < grid.length - 1 && grid[i + 1][x - 1]) count++;

      if (count < 2) nextGene[i][x] = 0;
      if (count > 3) nextGene[i][x] = 0;
      if (grid[i][x] && (count == 3 || count == 2)) nextGene[i][x] = 1;
      if (count == 3) nextGene[i][x] = 1;
    }
  }
  if (playing) {
    setTimeout(nextGen,Playspeed)
  }
  grid = nextGene;
  updateGridUI();
}

function updateGridUI() {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.innerHTML = "";
  initializeGrid();
}

function start() {
  Reset = grid;
  playing = true;
  nextGen()
}

function reset() {
  grid = Reset;
  updateGridUI();
}

function changeSpeed(value) {
  Playspeed = (100 - value)*10
}
// Initialize the grid when the page loads
window.onload = function () {
  grid = Array.from({ length: 50 }, () => Array(50).fill(0));
  initializeGrid();
};
