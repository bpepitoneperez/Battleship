import {player1Turn, player1, player2, attack, game} from './gameloop';
import { Ship } from './ships';

const body = document.body;
let activeShip = 4;

function createLayout () {
    displayHeader();
    createSetupArea();
    createHTML();
    createGameSetup();
    shipPrompt();
}

function displayHeader () {
    const headerDiv = document.createElement('div');
    headerDiv.id = 'header-div';
    headerDiv.textContent = 'Battleship';

    body.appendChild(headerDiv);
}

function createSetupArea () {
    const setupArea = document.createElement('div');
    setupArea.id = 'setup-area';
    body.appendChild(setupArea);
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
            col.addEventListener('mouseenter', () => {
                if (!game) {
                    hoverPlace(r, c);
                }
            });
            col.addEventListener('mouseleave', () => {
                if (!game) {
                    hoverRemove(r, c);
                }
            });
            col.addEventListener('click', (event) => {
                console.log(event);
                if (!player1Turn && game) {
                    clickAttack(r, c);
                }
                if(!game) {
                    clickPlace(r, c);
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
                if (player1Turn && game) {
                    clickAttack(r, c);
                }
            });
            row.appendChild(col);
        }
        board2.appendChild(row);
    }
}

function createGameSetup () {
    const area = document.getElementById('setup-area');
    const startDiv = document.createElement('div');
    startDiv.textContent = 'start game';
    startDiv.addEventListener('click', () => {
        game = true;
        console.log(game);
    });
    area.appendChild(startDiv);

    const shipDiv = document.createElement('div');
    shipDiv.id = 'ship-div';
    area.appendChild(shipDiv);
}

function shipPrompt () {
    const div = document.getElementById('ship-div');
    div.textContent = 'Place ship of length 4.';
}

function hoverPlace (r, c) {
    let canPlace;
    if (c + activeShip < 11) {
        canPlace = true;
        for (let i = 0; i < activeShip; i++) {
            if (player1.myBoard.squares[r][c + i].ship) {
                canPlace = false;
            }
        }
        if (canPlace) {
            for (let i = 0; i < activeShip; i++) {
                let square = document.getElementById(('board1-' + r + (c + i)));
                square.style.backgroundColor = 'cyan';
            }
        }
        else {
            if (!player1.myBoard.squares[r][c].ship) {
                let square = document.getElementById(('board1-' + r + c));
                square.style.backgroundColor = 'pink';
            }
        }
    }
    else {
        if (!player1.myBoard.squares[r][c].ship) {
            let square = document.getElementById(('board1-' + r + c));
            square.style.backgroundColor = 'pink';
        }
    }
}

function hoverRemove (r, c) {
    let canPlace = true;
    if (c + activeShip < 11) {
        for (let i = 0; i < activeShip; i++) {
            if (player1.myBoard.squares[r][c + i].ship) {
                canPlace = false;
            }
        }
        if (canPlace) {
            for (let i = 0; i < activeShip; i++) {
                let square = document.getElementById(('board1-' + r + (c + i)));
                square.style.backgroundColor = 'gainsboro';
            }
        }
        else {
            if (!player1.myBoard.squares[r][c].ship) {
                let square = document.getElementById(('board1-' + r + c));
                square.style.backgroundColor = 'gainsboro';
            }
        }
    }
    else {
        if (!player1.myBoard.squares[r][c].ship) {
            let square = document.getElementById(('board1-' + r + c));
            square.style.backgroundColor = 'gainsboro';
        }
    }
}

function clickPlace (r, c) {
    let canPlace = true;
    if (c + activeShip < 11) {
        for (let i = 0; i < activeShip; i++) {
            if (player1.myBoard.squares[r][c + i].ship) {
                canPlace = false;
            }
        }
        if (canPlace) {
            player1.myBoard.placeShip(Ship('boat1-1', activeShip), r, c, true);
            for (let i = 0; i < activeShip; i++) {
                let square = document.getElementById(('board1-' + r + (c + i)));
                square.style.backgroundColor = 'blue';
            }
        }
    }
}

function clickAttack (r, c) {
    if (player1Turn) {
        attack(player1, r, c)
    }
    else {
        attack(player2, r, c)
    }
}

function hitUpdate (r, c) {
    let square;
    if (!player1Turn) {
        square = document.getElementById('board1-' + r + c);
    }
    else {
        square = document.getElementById('board2-' + r + c);
    }
    square.textContent = 'x';
}

function missUpdate (r,c) {
    let square;
    if (!player1Turn) {
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
        if (!player1Turn) {
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