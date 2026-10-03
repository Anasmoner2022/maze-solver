# Maze input collection

34 valid mazes and 10 deliberately invalid inputs for the existing project CLI. Each file is a standalone input; do not combine them.

## Run one maze

From the project directory:

```powershell
node index.js test-mazes/valid/10-dead-end-first.txt
node index.js test-mazes/valid/33-generated-31x51.txt
node index.js test-mazes/valid/21-separated-rooms.txt
node index.js test-mazes/invalid/06-ragged-rows.txt
```

Valid unsolvable mazes print `No path exists.` and exit with code 0. Invalid inputs print a loader error and exit with code 1. Imports currently also print demonstration output from maze.js and solver.js before the actual result.

## Run every valid maze

```powershell
Get-ChildItem ./test-mazes/valid/*.txt | ForEach-Object {
    Write-Host "`n--- $($_.Name) ---"
    node index.js $_.FullName
}
```

## Valid inputs

Moves count edges between cells, excluding the start cell. DFS moves describe your current Up, Down, Left, Right solver; shortest moves were checked independently with breadth-first search. Different direction orders can change DFS results.

| File | Rows x columns | Expected result | DFS moves | Shortest moves | Purpose |
| --- | --- | --- | --- | --- | --- |
| [01-adjacent.txt](valid/01-adjacent.txt) | 1 x 2 | Path found | 1 | 1 | Smallest horizontal maze. |
| [02-single-row.txt](valid/02-single-row.txt) | 1 x 12 | Path found | 11 | 11 | Straight horizontal corridor. |
| [03-single-column.txt](valid/03-single-column.txt) | 6 x 1 | Path found | 5 | 5 | Straight vertical corridor. |
| [04-reverse-row.txt](valid/04-reverse-row.txt) | 1 x 12 | Path found | 11 | 11 | Travel left from S. |
| [05-reverse-column.txt](valid/05-reverse-column.txt) | 6 x 1 | Path found | 5 | 5 | Travel up from S. |
| [06-tiny-turn.txt](valid/06-tiny-turn.txt) | 3 x 3 | Path found | 4 | 4 | The demonstration maze in solver.js. |
| [07-down-first.txt](valid/07-down-first.txt) | 5 x 5 | Path found | 4 | 4 | A single route with two turns. |
| [08-open-3x3.txt](valid/08-open-3x3.txt) | 3 x 3 | Path found | 8 | 4 | Open boundaries and multiple possible routes. |
| [09-open-room.txt](valid/09-open-room.txt) | 6 x 9 | Path found | 27 | 9 | Open room with many cycles. |
| [10-dead-end-first.txt](valid/10-dead-end-first.txt) | 5 x 7 | Path found | 4 | 4 | Down is explored and exhausted before the successful right branch. |
| [11-ring.txt](valid/11-ring.txt) | 5 x 7 | Path found | 6 | 6 | A ring gives two routes to E. |
| [12-dfs-detour.txt](valid/12-dfs-detour.txt) | 4 x 5 | Path found | 3 | 1 | E is adjacent, but Down-first DFS takes a longer route. |
| [13-central-start.txt](valid/13-central-start.txt) | 5 x 7 | Path found | 15 | 5 | Start in the middle; open boundary corridors. |
| [14-boundary-exit.txt](valid/14-boundary-exit.txt) | 3 x 5 | Path found | 8 | 8 | Both endpoints on the boundary; route around the bottom. |
| [15-isolated-open-area.txt](valid/15-isolated-open-area.txt) | 5 x 9 | Path found | 5 | 5 | An unreachable open region does not affect success. |
| [16-original-maze.txt](valid/16-original-maze.txt) | 7 x 10 | Path found | 21 | 11 | Copy of the project maze. |
| [17-blocked-row.txt](valid/17-blocked-row.txt) | 1 x 3 | No path | — | — | Valid input, disconnected endpoints. |
| [18-blocked-column.txt](valid/18-blocked-column.txt) | 3 x 1 | No path | — | — | Valid single-column maze with a barrier. |
| [19-trapped-start.txt](valid/19-trapped-start.txt) | 3 x 7 | No path | — | — | S has no open neighbors. |
| [20-trapped-end.txt](valid/20-trapped-end.txt) | 6 x 9 | No path | — | — | A reachable open region surrounds an enclosed E. |
| [21-separated-rooms.txt](valid/21-separated-rooms.txt) | 5 x 9 | No path | — | — | Solid wall divides two rooms. |
| [22-unreachable-end-with-cycle.txt](valid/22-unreachable-end-with-cycle.txt) | 5 x 9 | No path | — | — | Exhaust a cycle without reaching E. |
| [23-crlf-lines.txt](valid/23-crlf-lines.txt) | 3 x 5 | Path found | 2 | 2 | Windows CRLF line endings. |
| [24-trailing-spaces.txt](valid/24-trailing-spaces.txt) | 3 x 5 | Path found | 2 | 2 | Trailing spaces are trimmed by loadMaze. |
| [25-empty-lines.txt](valid/25-empty-lines.txt) | 3 x 5 | Path found | 2 | 2 | Completely empty lines are ignored by loadMaze. |
| [26-generated-9x9.txt](valid/26-generated-9x9.txt) | 9 x 9 | Path found | 12 | 12 | Deterministic generated maze with branches and a unique route. |
| [27-generated-11x15.txt](valid/27-generated-11x15.txt) | 11 x 15 | Path found | 20 | 20 | Deterministic generated maze with branches and a unique route. |
| [28-generated-15x15.txt](valid/28-generated-15x15.txt) | 15 x 15 | Path found | 68 | 68 | Deterministic generated maze with branches and a unique route. |
| [29-generated-15x25.txt](valid/29-generated-15x25.txt) | 15 x 25 | Path found | 90 | 90 | Deterministic generated maze with branches and a unique route. |
| [30-generated-21x21.txt](valid/30-generated-21x21.txt) | 21 x 21 | Path found | 88 | 88 | Deterministic generated maze with branches and a unique route. |
| [31-generated-21x31.txt](valid/31-generated-21x31.txt) | 21 x 31 | Path found | 170 | 170 | Deterministic generated maze with branches and a unique route. |
| [32-generated-25x41.txt](valid/32-generated-25x41.txt) | 25 x 41 | Path found | 280 | 280 | Deterministic generated maze with branches and a unique route. |
| [33-generated-31x51.txt](valid/33-generated-31x51.txt) | 31 x 51 | Path found | 232 | 232 | Deterministic generated maze with branches and a unique route. |
| [34-long-snake.txt](valid/34-long-snake.txt) | 15 x 25 | Path found | 166 | 166 | Long winding corridor to exercise deeper recursion. |

## Deliberately invalid inputs

| File | Expected error contains |
| --- | --- |
| [01-empty-file.txt](invalid/01-empty-file.txt) | Maze file is empty |
| [02-missing-start.txt](invalid/02-missing-start.txt) | Missing Start Point |
| [03-missing-end.txt](invalid/03-missing-end.txt) | Missing End Point |
| [04-duplicate-start.txt](invalid/04-duplicate-start.txt) | Already Found Start Point |
| [05-duplicate-end.txt](invalid/05-duplicate-end.txt) | Already Found End Point |
| [06-ragged-rows.txt](invalid/06-ragged-rows.txt) | Ragged maze |
| [07-unknown-character.txt](invalid/07-unknown-character.txt) | Unknown character 'x' |
| [08-interior-space.txt](invalid/08-interior-space.txt) | Unknown character ' ' |
| [09-lowercase-endpoints.txt](invalid/09-lowercase-endpoints.txt) | Unknown character 's' |
| [10-whitespace-only-row.txt](invalid/10-whitespace-only-row.txt) | Ragged maze |

## Suggested order

Try 01, 06, 10, 11, and 12 first. File 12 makes it especially easy to see that DFS can return a longer route than necessary. Next try the unsolvable files 17–22, then generated mazes 26–33 and the long snake 34. Files 23–25 check accepted input formatting.

All 44 inputs were checked with the existing loader and CLI. Solvable outputs were checked for adjacent legal steps, correct endpoints, and no repeated cells. The original solver, loader, maze.txt, and recursion lab were not modified.
