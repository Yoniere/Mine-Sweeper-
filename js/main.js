'use strict'
console.log('1st Sprint - MINE SWEEPER');


var gBoard;
var gLevel = [{
    size: 4,
    mines: 2
}]

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

var gMinesArray = [];

function init() {
    gBoard = buildBoard(gBoard);
    renderBoard(gBoard);
}

function buildBoard(board) {
    var board = [];
    for (var i = 0; i < 4; i++) {
        board.push([]);
        for (var j = 0; j < 4; j++) {
            board[i][j] = createCell();
        }
    }
    getMinesArray(board);
    board[gMinesArray[0].i][gMinesArray[0].j].isMine = true;
    board[gMinesArray[1].i][gMinesArray[1].j].isMine = true;

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = setMinesNegsCount(i, j, board);
            // console.log(board[2][3].minesAroundCount);
        }
    }
    console.table(board);

    return board;
}

function createCell() {
    var newCell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return newCell;
}

// render the board in table
function renderBoard(board) {
    // console.table(board);
    var newBoard = board;
    var strHTML = ``;
    for (var i = 0; i < newBoard.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < newBoard[0].length; j++) {
            var currCell = newBoard[i][j]
            if (!currCell.isShown) {
                var cell = 'X';
            }
            // var cell = (currCell.isMine) ? cell = `💣` : cell = currCell.minesAroundCount;
            strHTML += `<td class="cell" data-i="${i}" date-j="${j}"
            oncontextmenu="return false"
            onclick="cellClicked(this,${i},${j})">${cell}
             </td>`;
        }
        strHTML += `</tr>`;
    }
    // console.log('strHTML', strHTML)
    var elBoard = document.querySelector('table');
    elBoard.innerHTML = strHTML
}

function setMinesNegsCount(cellI, cellJ, board) {
    var minesNegsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine === true) minesNegsCount++;

        }
    }
    return minesNegsCount;
}

function cellClicked(elCell, cellI, cellJ) {
    // var currCell = elCell[cellI][cellJ]
    if (elCell.isShown) return;
    elCell.isShown = true;
    if (elCell.isMine) {
        // renderCell(elCell, `💣`)
        gameOver();
    } else(!elCell.isMine)
    elCell.innerText = gBoard[cellI][cellJ].minesAroundCount;
    // console.log(elCell);
    // console.log(elCell.isShown);
}

function gameOver() {

}
var elCell = document.querySelector('.board-container');
elCell.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    cellMarked(elCell)
}, false);


function cellMarked(elCell) {
    elCell.isMarked = !elCell.isMarked
    console.log(elCell.isMarked);
    return elCell.isMarked

}

function getMinesArray(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = {
                i: i,
                j: j
            }
            gMinesArray.push(currCell);
        }
    }
    shuffle(gMinesArray);
    console.log(gMinesArray);
    return gMinesArray
}