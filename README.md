# Evolution test task Pipes Puzzle

## Rules

Please develop a game client for a "Pipes" puzzle.

The puzzle is played by connecting to the backend located at
[wss://hometask.eg1236.com/game-pipes/](wss://hometask.eg1236.com/game-pipes/) over WebSockets and sending
commands to it.

The goal of the puzzle is to rotate the tiles on the map to make all pipes connected in a single group, with
no loops and no dangling pipes.

# Used

-   React;
-   TypeScript;
-   Redux toolkit;
-   Styled Components;

## Level passwords:

1 level - JustWarmingUp;
2 level - DefinitelyWarm;

## Limitations:
-   On higher levels (>2) the layout becomes too big => One of the solutions could be to divide the map into smaller parts or create a minimap to be able to see both the whole picture and the current part;

-   Connection closing => Solution is to check whether the connection is still alive and reconnect when it's not, I started implementing the solution but couldn't finish on time;

-   Poor design => Solution is to sit down properly and play around with colors and overall page design;

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
