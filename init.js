let t = 0,
  total = 0;
main();
function main() {
  let submit = document.querySelector("#submit");
  submit.addEventListener("click", () => {
    document.querySelector("#vanish").style.display = "none";
    var row = document.querySelector("#totalrow");
    var col = document.querySelector("#totalcol");
    var numbers = document.querySelector("#numbers");
    createMaze(row.value, col.value, numbers.value);
  });
}
function createMaze(row, col, numbers) {
  console.log(numbers);
  let btn = document.querySelector("#btn");
  btn.style.display = "block";
  console.log(col);
  let blockState = numbers.split(" ");
  let maze = new Array(row);
  for (let i = 0; i < row; i++) {
    maze[i] = new Array(col);
  }
  let count = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      maze[i][j] = blockState[count];
      count++;
    }
  }
  console.log(maze);
  let mainTable = document.querySelector(".main-table");
  for (let i = 0; i < row; i++) {
    let tablerow = document.createElement("tr");
    tablerow.setAttribute("class", "row");
    mainTable.appendChild(tablerow);
    for (let j = 0; j < col; j++) {
      let tablecol = document.createElement("td");
      tablecol.setAttribute("class", "col");
      if (maze[i][j] == 1) {
        tablecol.style.backgroundColor = "black";
        tablecol.style.height = 80 / row + "vh";
      }
      tablerow.appendChild(tablecol);
    }
  }
  let visited = new Array(row);
  for (let i = 0; i < row; i++) {
    visited[i] = new Array(col);
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      visited[i][j] = 0;
    }
  }
  btn.addEventListener("click", () => {
    btn.style.display = "none";
    floodfill(maze, 0, 0, visited);
  });
}
function floodfill(maze, row, col, visited) {
  t++;
  if (
    row < 0 ||
    col < 0 ||
    row >= maze.length ||
    col >= maze[0].length ||
    maze[row][col] == 1 ||
    visited[row][col] == 1
  ) {
    gridUpdater(maze, visited, maze.length, maze[0].length);
    return;
  } else if (row == maze.length - 1 && col == maze[0].length - 1) {
    visited[row][col] = 1;
    total++;
    gridUpdater(maze, visited, maze.length, maze[0].length, total);
    visited[row][col] = 0;
    return;
  }
  visited[row][col] = 1;
  gridUpdater(maze, visited, maze.length, maze[0].length);
  floodfill(maze, row + 1, col, visited); //down
  floodfill(maze, row, col + 1, visited); //right
  floodfill(maze, row - 1, col, visited); //top
  floodfill(maze, row, col - 1, visited); //left
  visited[row][col] = 0;
  t++;
  gridUpdater(maze, visited, maze.length, maze[0].length);
}
function gridUpdater(maze, visited, row, col, value) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let column = document.querySelectorAll(".col")[i * col + j];
      if (maze[i][j] === "0") {
        if (value != undefined && i == row - 1 && j == col - 1) {
          setTimeout(timetext, 100 * t, column, value);
          setTimeout(timelapse, 100 * t, column, "red");
          t += 5;
          console.log("reached");
          return;
        }
        if (visited[i][j] == 1) {
          setTimeout(timelapse, 100 * t, column, "lightgreen");
        } else if (visited[i][j] == 0) {
          setTimeout(timelapse, 100 * t, column, "white");
        }
      }
    }
  }
}
function timelapse(column, color) {
  column.style.backgroundColor = color;
}
function timetext(column, value) {
  column.innerText = value;
}
