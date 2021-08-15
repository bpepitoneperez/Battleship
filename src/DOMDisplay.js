import {setupCPUBoard, player1Turn, player1, player2, attack, game,
    carrier, battleship, destroyer, submarine, patrol} from './gameloop';

const body = document.body;



let activeShip;
let activeShipDiv;

function createLayout () {
    displayHeader();
    createSetupArea();
    createHTML();
    createGameSetup();
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
            col.addEventListener('dragover', (event) => {
                event.preventDefault();
                if (!game) {
                    hoverPlace(r, c);
                }
            });
            col.addEventListener('dragleave', (event) => {
                event.preventDefault();
                if (!game) {
                    hoverRemove(r, c);
                }
            });
            col.addEventListener('drop', (event) => {
                event.preventDefault();
                if(!game) {
                    if (player1.myBoard.canPlace(activeShip, r, c, activeShip.horizontal)) {
                        placeShip(r, c);
                    }
                    else {
                        hoverRemove(r, c);
                    }
                }
            });
            col.addEventListener('click', () => {
                if (!player1Turn && game) {
                    clickAttack(r, c);
                }
            });
            row.appendChild(col);
        }
        board1.appendChild(row);
    }

    const board2 = document.createElement('div');
    board2.id = 'board2';

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
    startDiv.id = 'game-start';
    startDiv.textContent = 'start game';
    startDiv.addEventListener('click', () => {
        if (carrier.deployed && battleship.deployed && destroyer.deployed && 
            submarine.deployed && patrol.deployed) {
                game = true;
                setupCPUBoard();
        }
    });
    area.appendChild(startDiv);

    const shipDiv = document.createElement('div');
    shipDiv.id = 'ships-div';


    const carrierDivElements = document.createElement('div');
    carrierDivElements.setAttribute('class', 'ship-div-elements');
    const carrierDiv = document.createElement('div');
    carrierDiv.setAttribute('class', 'ship-placements');
    carrierDiv.id = 'carrierDiv';
    carrierDiv.draggable = true;
    carrierDiv.addEventListener('click', () => {
        if (carrier.deployed && !game) {
            activeShip = carrier;
            activeShipDiv = carrierDiv;
            switchAxis();
        }
    });
    carrierDiv.addEventListener('dragstart', () => {
        if (!game) {
            activeShip = carrier;
            activeShipDiv = carrierDiv;
            if (activeShip.deployed) {
                pickUpFromBoard();
            }
        }
    });
    

    const carrier1 = document.createElement('div');
    carrier1.setAttribute('class', 'ship-parts');
    carrier1.id = 'carrier1';
    const carrier2 = document.createElement('div');
    carrier2.setAttribute('class', 'ship-parts');
    carrier2.id = 'carrier2';
    const carrier3 = document.createElement('div');
    carrier3.setAttribute('class', 'ship-parts');
    carrier3.id = 'carrier3';
    const carrier4 = document.createElement('div');
    carrier4.setAttribute('class', 'ship-parts');
    carrier4.id = 'carrier4';
    const carrier5 = document.createElement('div');
    carrier5.setAttribute('class', 'ship-parts');
    carrier5.id = 'carrier5';

    carrierDiv.appendChild(carrier1);
    carrierDiv.appendChild(carrier2);
    carrierDiv.appendChild(carrier3);
    carrierDiv.appendChild(carrier4);
    carrierDiv.appendChild(carrier5);

    carrierDivElements.appendChild(carrierDiv);

    const battleshipDivElements = document.createElement('div');
    battleshipDivElements.setAttribute('class', 'ship-div-elements');
    const battleshipDiv = document.createElement('div');
    battleshipDiv.setAttribute('class', 'ship-placements');
    battleshipDiv.id = 'battleshipDiv';
    battleshipDiv.draggable = true;
    battleshipDiv.addEventListener('click', () => {
        if (battleship.deployed && !game) {
            activeShip = battleship;
            activeShipDiv = battleshipDiv;
            switchAxis();
        }
    });
    battleshipDiv.addEventListener('dragstart', () => {
        if (!game) {
            activeShip = battleship;
            activeShipDiv = battleshipDiv;
            if (activeShip.deployed) {
                pickUpFromBoard();
            }
        }
    });
    

    const battleship1 = document.createElement('div');
    battleship1.setAttribute('class', 'ship-parts');
    battleship1.id = 'battleship1';
    const battleship2 = document.createElement('div');
    battleship2.setAttribute('class', 'ship-parts');
    battleship2.id = 'battleship2';
    const battleship3 = document.createElement('div');
    battleship3.setAttribute('class', 'ship-parts');
    battleship3.id = 'battleship3';
    const battleship4 = document.createElement('div');
    battleship4.setAttribute('class', 'ship-parts');
    battleship4.id = 'battleship4';

    battleshipDiv.appendChild(battleship1);
    battleshipDiv.appendChild(battleship2);
    battleshipDiv.appendChild(battleship3);
    battleshipDiv.appendChild(battleship4);

    battleshipDivElements.appendChild(battleshipDiv);
    activeShipDiv = battleshipDiv;

    const destroyerDivElements = document.createElement('div');
    destroyerDivElements.setAttribute('class', 'ship-div-elements');
    const destroyerDiv = document.createElement('div');
    destroyerDiv.setAttribute('class', 'ship-placements');
    destroyerDiv.id = 'destroyerDiv';
    destroyerDiv.draggable = true;
    destroyerDiv.addEventListener('click', () => {
        if (destroyer.deployed && !game) {
            activeShip = destroyer;
            activeShipDiv = destroyerDiv;
            switchAxis();
        }
    });
    destroyerDiv.addEventListener('dragstart', () => {
        if (!game) {
            activeShip = destroyer;
            activeShipDiv = destroyerDiv;
        }
    });

    const destroyer1 = document.createElement('div');
    destroyer1.setAttribute('class', 'ship-parts');
    destroyer1.id = 'destroyer1';
    const destroyer2 = document.createElement('div');
    destroyer2.setAttribute('class', 'ship-parts');
    destroyer2.id = 'destroyer2';
    const destroyer3 = document.createElement('div');
    destroyer3.setAttribute('class', 'ship-parts');
    destroyer3.id = 'destroyer3';

    destroyerDiv.appendChild(destroyer1);
    destroyerDiv.appendChild(destroyer2);
    destroyerDiv.appendChild(destroyer3);

    destroyerDivElements.appendChild(destroyerDiv);

    const submarineDivElements = document.createElement('div');
    submarineDivElements.setAttribute('class', 'ship-div-elements');
    const submarineDiv = document.createElement('div');
    submarineDiv.setAttribute('class', 'ship-placements');
    submarineDiv.id = 'submarineDiv';
    submarineDiv.draggable = true;
    submarineDiv.addEventListener('click', () => {
        if (submarine.deployed && !game) {
            activeShip = submarine;
            activeShipDiv = submarineDiv;
            switchAxis();
        }
    });
    submarineDiv.addEventListener('dragstart', () => {
        if (!game) {
            activeShip = submarine;
            activeShipDiv = submarineDiv;
        }
    });

    const submarine1 = document.createElement('div');
    submarine1.setAttribute('class', 'ship-parts');
    submarine1.id = 'submarine1';
    const submarine2 = document.createElement('div');
    submarine2.setAttribute('class', 'ship-parts');
    submarine2.id = 'submarine2';
    const submarine3 = document.createElement('div');
    submarine3.setAttribute('class', 'ship-parts');
    submarine3.id = 'submarine3';

    submarineDiv.appendChild(submarine1);
    submarineDiv.appendChild(submarine2);
    submarineDiv.appendChild(submarine3);

    
    submarineDivElements.appendChild(submarineDiv);

    const patrolDivElements = document.createElement('div');
    patrolDivElements.setAttribute('class', 'ship-div-elements');
    const patrolDiv = document.createElement('div');
    patrolDiv.setAttribute('class', 'ship-placements');
    patrolDiv.id = 'patrolDiv';
    patrolDiv.draggable = true;
    patrolDiv.addEventListener('click', () => {
        if (patrol.deployed && !game) {
            activeShip = patrol;
            activeShipDiv = patrolDiv;
            switchAxis();
        }
    });
    patrolDiv.addEventListener('dragstart', () => {
        if (!game) {
            activeShip = patrol;
            activeShipDiv = patrolDiv;
        }
    });

    const patrol1 = document.createElement('div');
    patrol1.setAttribute('class', 'ship-parts');
    const patrol2 = document.createElement('div');
    patrol2.setAttribute('class', 'ship-parts');

    patrolDiv.appendChild(patrol1);
    patrolDiv.appendChild(patrol2);

    //patrolDivElements.appendChild(patrolDivText);
    patrolDivElements.appendChild(patrolDiv);

    shipDiv.appendChild(carrierDivElements);
    shipDiv.appendChild(battleshipDivElements);
    shipDiv.appendChild(destroyerDivElements);
    shipDiv.appendChild(submarineDivElements);
    shipDiv.appendChild(patrolDivElements);

    area.appendChild(shipDiv);
}

function hoverPlace (r, c) {
    if (player1.myBoard.canPlace(activeShip, r, c, activeShip.horizontal)){
        for (let i = 0; i < activeShip.length; i++) {
            let square;
            if (activeShip.horizontal) {
                square = document.getElementById(('board1-' + r + (c + i)));
            }
            else {
                square = document.getElementById(('board1-' + (r + i) + c));
            }
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

function hoverRemove (r, c) {
    if (player1.myBoard.canPlace(activeShip, r, c, activeShip.horizontal)){
        for (let i = 0; i < activeShip.length; i++) {
            let square;
            if (activeShip.horizontal) {
                square = document.getElementById(('board1-' + r + (c + i)));
            }
            else {
                square = document.getElementById(('board1-' + (r + i) + c));
            }
            square.style.backgroundColor = 'rgb(142, 221, 195)';
        }
    }
    else {
        if (!player1.myBoard.squares[r][c].ship) {
            let square = document.getElementById(('board1-' + r + c));
            square.style.backgroundColor = 'rgb(142, 221, 195)';
        }
    }
}

function placeShip (r, c) {
    player1.myBoard.placeShip(activeShip, r, c, activeShip.horizontal);
    let square = document.getElementById(('board1-' + r + c));
    while(square.firstChild) {
        square.removeChild(square.firstChild);
    }
    square.appendChild(activeShipDiv);
    activeShipDiv.setAttribute('class', 'placed');
    if(activeShip.horizontal) {
        activeShipDiv.setAttribute('name', 'horizontal');
    }
    else {
        activeShipDiv.setAttribute('name', 'vertical');
    }
    for (let i = 0; i < activeShip.length; i++) {
        let oldSquare;
        if (activeShip.horizontal) {
            oldSquare = document.getElementById(('board1-' + r + (c + i)));
        }
        else {
            oldSquare = document.getElementById(('board1-' + (r + i) + c));
        }
        oldSquare.style.backgroundColor = 'rgb(142, 221, 195)';
    }
}

function pickUpFromBoard () {
    console.log('pick up');
    let oldR = activeShip.position[0].boardR;
    let oldC = activeShip.position[0].boardC;
    removeShip();
    console.log('removed');
    activeShipDiv.addEventListener('dragend', () => {
        if (!activeShip.deployed) {
            placeShip(oldR, oldC);
            console.log('placed back', player1.myBoard);
        }
    })
}

function removeShip () {
    let startingSquareR = activeShip.position[0].boardR;
    let startingSquareC = activeShip.position[0].boardC;
    let currentAxis = activeShip.horizontal;
    player1.myBoard.removeShip(activeShip, startingSquareR, startingSquareC, currentAxis);
}

function switchAxis () {
    let startingSquareR = activeShip.position[0].boardR;
    let startingSquareC = activeShip.position[0].boardC;
    let currentAxis = activeShip.horizontal;
    removeShip();
    if (player1.myBoard.canPlace(activeShip, startingSquareR, startingSquareC, !currentAxis)) {
        activeShip.horizontal = !activeShip.horizontal;
        player1.myBoard.placeShip(activeShip, startingSquareR, startingSquareC, activeShip.horizontal);
        placeShip(startingSquareR, startingSquareC);
    }
    else {
        player1.myBoard.placeShip(activeShip, startingSquareR, startingSquareC, currentAxis);
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
    console.log(player1Turn);
    if (!player1Turn) {
        let hitShipPart = player1.myBoard.squares[r][c].shipPart + 1;
        let divName = player1.myBoard.squares[r][c].ship.shipDomName;
        divName = divName + hitShipPart;
        console.log(divName);
        square = document.getElementById(divName);
        console.log(square);
    }
    else {
        square = document.getElementById('board2-' + r + c);
        console.log(square);
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
            let divName = ship.shipDomName + 'Div';
            console.log(divName);
            square = document.getElementById(divName);
            console.log(square);
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
    playAgainScreen();
}

function playAgainScreen() {

}


export {createLayout, hitUpdate, missUpdate, shipDestroyed, gameOver};