
var gTetris;
var gBoard;
var gIntervalGame;
var gRowSize = 14;
var gColSize = 28;
var EndOfColBoard = gColSize - 1;
var randIdxEndBoard = getRandomIntInclusive(0, EndOfColBoard);


// fix minimum start pos - limit the wall start - not over the limit.
// var gEndLengthLineIdx = (randIdxEndBoard < 4) ? randIdxEndBoard = 4 : randIdxEndBoard;

// console.log('check index: ',gEndLengthLineIdx);

var gPieces = {
    // 1 line.
    lineLocation: {
        kind: 'line',
        //row
        startI: 0,
        endI: 1,

        // oppsite/parallel shape.
        // startJ: 0,
        // endJ: 4

        //col
        // start from -4 
        startJ: randIdxEndBoard - 4, // start width tetremino,
        // end come after the start + 4. 
        endJ: randIdxEndBoard // end width tetremino

    },
    // 2. square - default
    squareLocation: {
        kind: 'square',
        //row
        startI: 0,
        endI: 2,
        //col
        startJ: randIdxEndBoard - 2, // start width tetremino
        endJ: randIdxEndBoard // end width tetremino
    },
    // 3. tetremino
    tetreminoLocation: {
        kind: 'tetremino',
        //row
        startI: 0,
        endI: 1,
        //col
        startJ: randIdxEndBoard - 3, // start width tetremino
        endJ: randIdxEndBoard, // end width tetremino

        // // extra square.
        // extraI: startI + 1,
        // extraJ: endJ,
    },
    // 4. j  - right extra square.
    jLastRightDownLocation: {

        kind: 'J',
        //row
        startI: 0,
        endI: 1,
        //col
        startJ: randIdxEndBoard - 3, // start width tetremino
        endJ: randIdxEndBoard, // end width tetremino
    },
    // 5. l - left extra sqaure.
    lLastLeftUpLocation: {
        kind: 'L',
        //row
        startI: 0,
        endI: 1,
        //col
        startJ: randIdxEndBoard - 3, // start width tetremino
        endJ: randIdxEndBoard, // end width tetremino
    },
    // 6. s - 2 square in line DOWN from to square off set.
    sOffSetRightLocation: {
        kind: 'S',
        //row
        startI: 0,
        endI: 1,
        //col
        startJ: randIdxEndBoard - 3, // start width tetremino
        endJ: randIdxEndBoard, // end width tetremino
    },
    // 7. s - 2 square in line UP from to square off set.
    zOffSetLeftLocation: {
        kind: 'Z',
        //row
        startI: 0,
        endI: 1,
        //col
        startJ: randIdxEndBoard - 3, // start width tetremino
        endJ: randIdxEndBoard, // end width tetremino
    },
}

// tetreminto piece of shapes.
var line = gPieces.lineLocation; // line.
var square = gPieces.squareLocation; // square - default.
var tetremino = gPieces.tetreminoLocation; // tetremino
var j = gPieces.jLastRightDownLocation; // J  - right extra square. 
var l = gPieces.lLastLeftUpLocation; // L - left extra sqaure.
var s = gPieces.sOffSetRightLocation; // S - 2 square in line DOWN from to square off set.
var z = gPieces.zOffSetLeftLocation; // Z - 2 square in line UP from to square off set.



// all pieces of shapes. (7 shapes).
var gAllPieces = [line, square, tetremino, j, l, s, z];

// get random index for get SHAPES from the pieces.
var gRandIdxOfIPiece = getRandomIntInclusive(0, gAllPieces.length - 1);
// one piece.
var gRandPiece = gAllPieces[gRandIdxOfIPiece];

// all pieces.
console.table(gAllPieces);


var gGame = {
    score: 0,
    isOn: false,
};


play();

function play() {
    // if (gIntervalGame) clearInterval(gIntervalGame);
    gIntervalGame = setInterval(init, 100);
}

function init() {
    var gBoard = buildBoard();
    // get random index/SHAPES from the pieces.
    // print random piece.
    printRandPiece(gBoard, gRandPiece);
    //move the piece.
    updatePieceModal(gRandPiece);
    clearIntervalWhenPieceTouch(gBoard);

    // when the piece touch in the end board print new piece.
    // renderNewPiece(gBoard);

    // show on html.
    renderToHtml(gBoard);
}
function updatePieceModal(randPiece) {
    // update modal.
    randPiece.startI++;
    randPiece.endI++;

}

function renderNewPiece(board) {
    // get random index/SHAPES from the pieces.
    var randIdxOfPieceAgain = getRandomIntInclusive(0, gAllPieces.length - 1);
    //get randomaly one piece.
    var randPieceAgain = gAllPieces[randIdxOfPieceAgain];

    // the end of the board(cols).
    randIdxEndBoard = getRandomIntInclusive(0, EndOfColBoard);

    // change the new piece to get new correct position(inside the board) random cols started. 
    randPieceAgain.startJ = randIdxEndBoard - 3;
    randPieceAgain.endJ = randIdxEndBoard;

    // print the new Piece on board.
    printRandPiece(board, randPieceAgain);
    // interval the new piece.
    intervalTheNewPieceAgain(board,randPieceAgain);

    console.log('rand piece', randPieceAgain);
}

function intervalTheNewPieceAgain(board,randPiece) {

    gIntervalGame = setInterval(function () {
        console.log('rand piece: ', randPiece);

        // update modal.
        updatePieceModal(randPiece);

        printRandPiece(board, randPiece);
        console.log('now', randPiece);

        renderToHtml(board);


        if (randPiece.endI > 5) clearInterval(gIntervalGame)
    }, 1000);
}



//when the piece touch the end of board.
function clearIntervalWhenPieceTouch(board) {

    //  if its we on square or line we got one more line extra. to finish same the all piece.
    if (gRandPiece.kind === 'square' || gRandPiece.kind === 'line') {
        if (gRandPiece.endI === gRowSize + 1) {

            clearInterval(gIntervalGame);
            renderNewPiece(board)


        }

    } else {

        if (gRandPiece.endI === gRowSize) {
            clearInterval(gIntervalGame);
            renderNewPiece(board);
        }
    }

}

function renderToHtml(mat) {

    // clear all.
    var strHeaderHtml = '';
    var strHtml = '';
    // make score and time.
    strHeaderHtml += `<div class="row">`;
    strHeaderHtml += `<div class="col text-center bg-warning">SCORE: ${gGame.score}</div>`;
    strHeaderHtml += `<div class="col text-center bg-primary">TIME: 0</div>`;
    strHeaderHtml += `<div class="col bg-success">`

    // make the arrow in one line.
    strHeaderHtml += `<div class="row justify-content-around align">`;
    strHeaderHtml += `<div class="left">🢀</div>`
    strHeaderHtml += `<div class="right">🢂</div>`
    strHeaderHtml += `</div>`;
    strHeaderHtml += `</div>`;

    // create the board.
    strHtml += `<table>`;
    for (var i = 0; i < mat.length; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < mat[0].length; j++) {

            var className = (mat[i][j] === true) ? 'mark' : '';
            strHtml += `<td class="cel cel-${i}-${j} ${className}"></td>`

        }
        strHtml += `</tr>`
    }
    strHtml += `</table>`

    var detailsContainers = document.querySelector('.container');
    var elBoard = document.querySelector('.container-board');
    detailsContainers.innerHTML = strHeaderHtml;
    elBoard.innerHTML = strHtml;
    // console.log(mat);    
}


function buildBoard() {

    var board = [];
    for (var i = 0; i < gRowSize; i++) {
        board[i] = [];
        for (var j = 0; j < gColSize; j++) {
            board[i][j] = '';
        }
    }
    // console.log(board);
    return board;
}

// take a random piece  for create shapes.
function printRandPiece(mat, posLocation) {
    // console.log('pos location: ', posLocation);
    // get the coords.
    var coordsPiece = [];

    // run on the limit of piece.
    for (var i = posLocation.startI; i < posLocation.endI; i++) {
        for (var j = posLocation.startJ; j < posLocation.endJ; j++) {

            // print the pieces of and limit the pieces by cant over the walls.
            switch (posLocation.kind) {
                case 'line':
                    // limit wall started.
                    limitWallStarted(gPieces.lineLocation, 4)
                    // line of 4 square.
                    mat[i][j] = true;
                    break;
                case 'square':
                    // limit wall started.
                    limitWallStarted(gPieces.squareLocation, 2)
                    // square of cell.
                    mat[i][j] = true;
                    break;
                case 'tetremino':
                    // limit wall started.
                    limitWallStarted(gPieces.tetreminoLocation, 3);
                    // line of square 3 square.
                    mat[i][j] = true;
                    // sqaure extra down - CENTER.
                    mat[i + 1][randIdxEndBoard - 2] = true;
                    break;
                case 'J':

                    // limit wall started.
                    limitWallStarted(gPieces.jLastRightDownLocation, 3)
                    // line of square 3 square.
                    mat[i][j] = true;
                    // square extra down - RIGHT.
                    mat[i + 1][randIdxEndBoard - 1] = true;
                    break;
                case 'L':
                    // limit wall started.
                    limitWallStarted(gPieces.lLastLeftUpLocation, 3);

                    // line of square 3 square.
                    mat[i][j] = true;
                    // sqaure extra down - LEFT.
                    mat[i + 1][randIdxEndBoard - 3] = true;
                    break;
                case 'S':
                    limitWallStarted(gPieces.sOffSetRightLocation, 3)
                    // square - 2 TOP LEFT
                    mat[i][j + 1] = true;
                    // delete the first square from 3.
                    mat[i][randIdxEndBoard] = false;

                    // square - bottom right.
                    mat[i + 1][randIdxEndBoard - 2] = true;
                    // square - bottom left.
                    mat[i + 1][randIdxEndBoard - 3] = true;
                    break;
                case 'Z':

                    // limit wall started.
                    limitWallStarted(gPieces.zOffSetLeftLocation, 3)

                    // square - 2 TOP LEFT
                    mat[i][j] = true;

                    // delete the first square from 3.
                    mat[i][randIdxEndBoard - 1] = false;

                    // square - bottom left.
                    mat[i + 1][randIdxEndBoard - 2] = true;
                    // square - bottom right.
                    mat[i + 1][randIdxEndBoard - 1] = true;
                    break;
            }
            // save and after return the coords of of the piece tetromino.
            coordsPiece.push({ i: i, j: j })
        }
    }
    // console.log(coordsPiece);
    return coordsPiece;

}

function limitWallStarted(kindPieceLocation, numberIdxEndPiece) {

    // limit wall started. show only inside the baord.
    (randIdxEndBoard < numberIdxEndPiece) ? randIdxEndBoard = numberIdxEndPiece : randIdxEndBoard;
    kindPieceLocation.startJ = randIdxEndBoard - numberIdxEndPiece;
    kindPieceLocation.endJ = randIdxEndBoard;
}

function moveTetris(ev) {
    var nextLocation = getNextLocation(ev)
    // console.log('next place', nextLocation);
    // console.log('place: ', gRandPiece)
    if (nextLocation.endI > gRowSize) {
        clearInterval(gIntervalGame);
    }
}

function getNextLocation(eventKeyboard) {

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            gRandPiece.startI--;
            gRandPiece.endI--;
            break;
        case 'ArrowDown':
            gRandPiece.startI++;
            gRandPiece.endI++;
            break;
        case 'ArrowLeft':
            gRandPiece.startJ--;
            gRandPiece.endJ--;
            break;
        case 'ArrowRight':
            gRandPiece.startJ++;
            gRandPiece.endJ++;
            break;
        default:
            return null;
    }

    return gRandPiece;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
