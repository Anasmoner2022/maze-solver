const { loadMaze } = require("./maze");
const { solve } = require("./solver");

const path = process.argv[2];
if (!path) {
    console.error("Usage: node index.js maze.txt");
    process.exit(1);
}

let grid, start, end;
try {
    ({ grid, start, end } = loadMaze(path));
} catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
}

const visited = grid.map(row => row.map(() => 0));
const foundPath = solve(grid, visited, start, end);

if (!foundPath) {
    console.log("No path exists.");
    process.exit(0);
}

const output = grid.map(row => [...row]);
for (const { row, col } of foundPath) {
    if (output[row][col] === ".") {
        output[row][col] = "*";
    }
}
console.log(output.map(row => row.join("")).join("\n"));