const fs = require("fs");

// loadMaze reads and validates a maze file, returning
// { grid, start, end } where grid is an array of arrays of
// single characters, and start/end are { row, col } objects.
function loadMaze(path) {
    const contents = fs.readFileSync(path, "utf-8");
    const lines = contents.split("\n").filter(line => line.length > 0);
    
    let start = null;
    let end = null;
    const grid = [];

    for (let row = 0; row < lines.length; row++) {
        const chars = lines[row].trimEnd().split("");
        
        for (let col = 0; col < chars.length; col++) {
            if (chars[col] === "S") {
                if (start !== null) {
                    throw new Error("Error: Already Found Start Point");
                }
                start = { row, col };
            } else if (chars[col] === "E") {
                if (end !== null) {
                    throw new Error("Error: Already Found End Point");
                }
                end = { row, col };
            } else if (chars[col] !== "#" && chars[col] !== ".") {
                throw new Error(`Error: Unknown character '${chars[col]}' found at row ${row}, col ${col}`);
            }
        }
        grid.push(chars);
    }
    
    // Guard against completely empty files
    if (grid.length === 0) {
        throw new Error("Error: Maze file is empty");
    }

    // Check for ragged maze
    const firstRowLength = grid[0].length;
    for (let i = 1; i < grid.length; i++) {
        if (grid[i].length !== firstRowLength) {
            throw new Error("Error: Ragged maze - rows are not all the same length");
        }
    }
    
    if (start === null) {
        throw new Error("Error: Missing Start Point (S)");
    }
    if (end === null) {
        throw new Error("Error: Missing End Point (E)");
    }
    
    return { grid, start, end };
}

try {
    const { grid, start, end } = loadMaze("maze.txt");
    console.log("Start:", start);
    console.log("End:", end);
    // console.log("Grid:", grid); // Commented out so it doesn't flood your console/
} catch (error) {
    console.error(error.message);
}

module.exports = { loadMaze };