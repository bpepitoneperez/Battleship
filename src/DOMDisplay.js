import {player1Turn, player1, player2, attack, game} from './gameloop';

const body = document.body;

function createLayout () {
    displayHeader();
    createHTML();
}

function displayHeader () {
    const headerDiv = document.createElement('div');
    headerDiv.id = 'header-div';
    headerDiv.textContent = 'Battleship';

    body.appendChild(headerDiv);
}

function createHTML () {
    const content = document.createElement('div');
    content.id = 'content';

    body.appendChild(content);

    const display = document.createElement('div');
    display.id = 'display';

    body.appendChild(display);
    
    createEmptyBoards();
}

function createEmptyBoards () {
    const content = document.querySelector('#content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    const board1 = document.createElement('div');
    board1.id = 'board1';

    content.appendChild(board1);

    for (let r = 0; r < 10; r++) {
        let row = document.createElement('div')
        row.setAttribute('class', 'rows');
        for (let c = 0; c < 10; c++) {
            let col = document.createElement('div');
            col.setAttribute('class', 'squares');
            col.id = ('board1-' + r + c);
            col.addEventListener('click', () => {
                if (player1Turn && game) {
                    clickEvent(r, c);
                }
            });
            row.appendChild(col);
        }
        board1.appendChild(row);
    }

    const board2 = document.createElement('div');
    board1.id = 'board2';

    content.appendChild(board2);

    for (let r = 0; r < 10; r++) {
        let row = document.createElement('div')
        row.setAttribute('class', 'rows');
        for (let c = 0; c < 10; c++) {
            let col = document.createElement('div');
            col.setAttribute('class', 'squares');
            col.id = ('board2-' + r + c);
            col.addEventListener('click', () => {
                if (!player1Turn && game) {
                    clickEvent(r, c);
                }
            });
            row.appendChild(col);
        }
        board2.appendChild(row);
    }
}

function clickEvent (r, c) {
    if (player1Turn) {
        attack(player1, r, c)
    }
    else {
        attack(player2, r, c)
    }
}

function hitUpdate (r, c) {
    let square;
    if (player1Turn) {
        square = document.getElementById('board1-' + r + c);
    }
    else {
        square = document.getElementById('board2-' + r + c);
    }
    square.textContent = 'x';
}

function missUpdate (r,c) {
    let square;
    if (player1Turn) {
        square = document.getElementById('board1-' + r + c);
    }
    else {
        square = document.getElementById('board2-' + r + c);
    }
    square.textContent = 'o';
}

function shipDestroyed (ship) {
    for (let i = 0; i < ship.length; i++) {
        let r = ship.position[i].boardR;
        let c = ship.position[i].boardC;
        let square;
        if (player1Turn) {
            square = document.getElementById('board1-' + r + c);
        }
        else {
            square = document.getElementById('board2-' + r + c);
        }
        square.style.backgroundColor = 'red';
    }
}

function gameOver () {
    const display = document.querySelector('#display');
    if (player1Turn) {
        display.textContent = 'Player 1 has won!';
    }
    else {
        display.textContent = 'Player 2 has won!';
    }
}


export {createLayout, hitUpdate, missUpdate, shipDestroyed, gameOver};