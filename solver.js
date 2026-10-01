const DIRECTIONS = [
    { dr: -1, dc: 0 }, // Up
    { dr: 1, dc: 0 },  // Down
    { dr: 0, dc: -1 }, // Left
    { dr: 0, dc: 1 }   // Right
];

function solve(grid, visited, current, end) {
    // 1. Base case - out of bounds
    if (
        current.row < 0 || 
        current.row >= grid.length || 
        current.col < 0 || 
        current.col >= grid[0].length
    ) {
        return null;
    }

    // 2. Base case - wall
    if (grid[current.row][current.col] === "#") {
        return null;
    }

    // 3. Base case - already visited
    if (visited[current.row][current.col] === true) {
        return null;
    }

    // 4. Base case - reached end
    if (current.row === end.row && current.col === end.col) {
        return [current];
    }

    // Mark current cell as visited so we don't loop back to it
    visited[current.row][current.col] = true;

    // Recursive case: try all 4 directions
    for (const { dr, dc } of DIRECTIONS) {
        const next = { row: current.row + dr, col: current.col + dc };
        const result = solve(grid, visited, next, end);
        
        if (result !== null) {
            return [current, ...result];
        }
    }

    // If all 4 directions returned null, this path is a dead end
    return null;
}


// A simple 3x3 grid: 
// S . #
// # . #
// # . E
const grid = [
    ["S", ".", "#"],
    ["#", ".", "#"],
    ["#", ".", "E"]
];

const start = { row: 0, col: 0 };
const end = { row: 2, col: 2 };

// Build a visited grid of the exact same size, defaulting to false
const visited = grid.map(row => row.map(() => false));

const path = solve(grid, visited, start, end);
console.log(path, visited);

module.exports = { solve, DIRECTIONS };