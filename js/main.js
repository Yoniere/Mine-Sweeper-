'use strict'
console.log('1st Sprint - MINE SWEEPER');


var gBoard;
var gLevel = [{
    size: 4,
    mines: 2
}];

var gBoardSize
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
};
var gisTimer = false;
var gTotalSeconds
var gElMinutesLabel = document.getElementById("minutes");
var gElSecondsLabel = document.getElementById("seconds");
var gIntervalId;

var gMinesArray = [];

function init() {
    gTotalSeconds = 0;

    gElMinutesLabel.innerHTML = '00'
    gElSecondsLabel.innerHTML = '00'

    gBoard = buildBoard(gBoard, gLevel.size);
    renderBoard(gBoard);
}

function buildBoard(board, size = 4) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell();
        }
    }
    getMinesArray(board);
    createRandomMines(board, gLevel.mines);
    // board[gMinesArray[0].i][gMinesArray[0].j].isMine = true;
    // board[gMinesArray[1].i][gMinesArray[1].j].isMine = true;

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
    // var newBoard = board;
    var strHTML = ``;
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
                // console.log(currCell);
            if (!currCell.isShown) {
                var cell = 'X';
            }
            // var cell = (currCell.isMine) ? cell = `💣` : cell = currCell.minesAroundCount;
            strHTML += `<td class="cell" data-i="${i}" date-j="${j}"
            oncontextmenu="cellMarked(this,${i},${j})"
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
    gGame.isOn = true;
    if (!gisTimer) {
        gIntervalId = setInterval(setTime, 1000);
        gisTimer = true;
    }
    if (elCell.isShown) return;
    elCell.isShown = true;
    var elMarkedCell = document.querySelector('.marked-cells');

    if (gBoard[cellI][cellJ].isMine) {
        elCell.innerText = `💣`;
        elCell.style.backgroundColor = 'red';
        gameOver()

    } else {
        elCell.innerText = gBoard[cellI][cellJ].minesAroundCount;
        gGame.shownCount++
            elMarkedCell.innerText = gGame.shownCount

    }
}

function gameOver() {
    alert('game Over! You clicked on a mine!')
    gisTimer = false
    clearInterval(gIntervalId);
    // var elCell = document.querySelector('game-over');
    // elCell.style.display = 'block';
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
    };
    var elMarkedCell = document.querySelector('.marked-cells');
    elMarkedCell.innerText = gGame.shownCount;
    var elFlag = document.querySelector('.flag');
    elFlag.innerText = gGame.markedCount;
    changeLevel(gLevel.size, gLevel.mines)
}


function cellMarked(elCell, cellI, cellJ) {
    window.event.preventDefault();
    gGame.isOn = true;
    if (!gisTimer) {
        gIntervalId = setInterval(setTime, 1000);
        gisTimer = true;
    }
    var elFlag = document.querySelector('.flag');
    if (elCell.isShown) return
    if (elCell.isMarked) {
        elCell.innerHTML = 'X'
        gGame.markedCount--
            elFlag.innerText = gGame.markedCount

    } else {
        elCell.innerHTML = `🚩`
        gGame.markedCount++
            elFlag.innerText = gGame.markedCount

    }
    elCell.isMarked = !elCell.isMarked
    return elCell.isMarked

}

function getMinesArray(board) {
    gMinesArray = [];
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
    return gMinesArray
}

function createRandomMines(board, mines = 2) {

    for (var i = 0; i < mines; i++) {
        var currCell = gMinesArray[i];
        // console.log(board[currCell.i][currCell.j])
        board[currCell.i][currCell.j].isMine = true;
    }

}

function setTime() {
    gTotalSeconds++
    gElMinutesLabel.innerHTML = pad(parseInt(gTotalSeconds / 60));
    gElSecondsLabel.innerHTML = pad(gTotalSeconds % 60);
}

function pad(val) {
    var valString = val + "";
    return valString.length === 1 ? "0" + valString : valString
}


function changeLevel(boardSize, mines) {
    gLevel.size = boardSize;
    gLevel.mines = mines;

    gTotalSeconds = 0;

    gElMinutesLabel.innerHTML = '00'
    gElSecondsLabel.innerHTML = '00'
    gisTimer = false
    clearInterval(gIntervalId);
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
    };
    var elMarkedCell = document.querySelector('.marked-cells');
    elMarkedCell.innerText = gGame.shownCount;
    var elFlag = document.querySelector('.flag');
    elFlag.innerText = gGame.markedCount;
    gBoard = buildBoard(gBoard, gLevel.size, );
    renderBoard(gBoard);
}