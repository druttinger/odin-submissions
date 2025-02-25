// checks for shortest path on graph with BFS
levelOrder = (start, finish) => {
    if (knightEdgeMatrix.length === 0) populate();
    let q = [];
    let checked = [];
    checked.push(start);
    q.push([]);
    q.at(0).push(start);
    while (q[0]){
        let [x, y] = q[0].at(-1);
        for (let each of knightEdgeMatrix[x][y]){
            if (sameCoords(each, finish)) {
                q[0].push(finish);
                return q[0];
            }
            if (!hasChecked(each, checked)){
                checked.push(each);
                q.push([...q[0]]);
                q.at(-1).push(each);
            }
        }
        q.shift();
    }
    throw error('No path found.')
}

// converts coordinates into chess notation without default piece of 'N'
let chessOutput = (coords, piece = 'N') => {
    return (piece + alphaCoords[coords[0]] + (coords[1] + 1));
}

// checks for valid inputs and produces the outputs
let knightMoves = (start, finish) => {
    if (!Array.isArray(start) || 
        !Array.isArray(finish) ||
        start.length != 2 ||
        finish.length != 2 ||
        !onBoard(start[0], start[1]) ||
        !onBoard(finish[0], finish[1])
    ) throw error("Invalid paramters");
    let moveList = levelOrder(start, finish);
    let pluralize = moveList.length > 2 ? 's': '';
    let moveString = '';
    for (let i = 1; i < moveList.length; i ++) 
        moveString += ' ' + chessOutput(moveList[i]);
    console.log(`You can get a knight from ${chessOutput(start, '')} ` +
                `to ${chessOutput(finish, '')} ` +
                `in ${moveList.length - 1} move${pluralize} ` +
                `with the sequence${moveString}.`)
}

let alphaCoords = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let validMoves = [[ 1,  2],
                  [ 1, -2],
                  [-1,  2],
                  [-1, -2],
                  [ 2,  1],
                  [ 2, -1],
                  [-2,  1],
                  [-2, -1]];


// stores a graph of valid knight moves
let knightEdgeMatrix = [];

// populates knightEdgeMatrix
let populate = () => {
    for (let i = 0; i < 8; i++){
        knightEdgeMatrix.push([])
        for (let j = 0; j < 8; j++){
            knightEdgeMatrix[i].push([])
            for (let each of validMoves){
                let newSquare = [i + each[0], j + each[1]];
                if (onBoard(...newSquare)) {
                    knightEdgeMatrix[i][j].push(newSquare);
                }
            }
        }
    }
}

// check to make sure a potential move is in bounds
let onBoard = (x, y) => {
    return (0 <= x && x <= 7 &&
            0 <= y && y <= 7);
}

// check to see if a set of coordinates has been checked already
let hasChecked = (coords, checked) => {
    return checked.some((elem) => 
        sameCoords(elem, coords));
}

// check if coordinates in two arrays are the same
let sameCoords = (coords1, coords2) => {
    return coords1[0] === coords2[0] && coords1[1] === coords2[1];
}

// bellow is just for testing
let randCoord = () => {
    return Math.floor(Math.random() * 8);
}

for (let i = 0; i < 100; i ++){
    knightMoves([randCoord(), randCoord()], [randCoord(), randCoord()]);
}

// requires maximum number of moves of 6
knightMoves([0,0], [7,7]);
