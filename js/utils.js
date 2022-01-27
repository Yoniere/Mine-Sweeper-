function printMat(mat, selector) {
    var strHTML = `<table border="0"><tbody>`;
    for (var i = 0; i < mat.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = `cell ${cell}-${i} + ${j}`;
            strHTML += `<td class="${className}"> ${cell}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody></table>`;
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell - ${location.i} - ${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// function startTimer() {
//     if (gisTimer) return;
//     gisTimer = true;
//     var elTimer = document.querySelector('.timer');
//     gTimer = setInterval(() => {
//         var time = Date.now()
//         var timeAfterSec = setTimeout(() => {
//             var time2 = Date.now()
//         }, 1000);
//     }, 1000);
// }

// var time = Date.now()
// console.log(time);
// var timeAfterSec = setTimeout(() => {
//     Date.now()
// }, 1000);
// console.log(timeAfterSec);