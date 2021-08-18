import {setupCPUBoard, player1Turn, player1, player2, attack, game, canAttack,
    carrier, battleship, destroyer, submarine, patrol, cpuAttack, resetEverything,
    randomlyPlaceShip} from './gameloop';
const body = document.body;

const resultsDiv = document.createElement('div');
resultsDiv.id = 'outer-results';

const results = document.createElement('p');
results.id = 'results';
results.textContent = 'TEST';
resultsDiv.appendChild(results);
body.appendChild(resultsDiv);

let activeShip;
let activeShipDiv;

let loadFirst = document.createElement('span');
loadFirst.setAttribute('class', 'material-icons-outlined');
loadFirst.textContent = 'radio_button_checked';

function createLayout () {
    createTopArea();
    createSetupScreen();
    createShipSetup();
    createSetupBoard();
    gameOver();
}

function createTopArea () {
    const topDiv = document.createElement('div');
    topDiv.id = 'top-div';

    const headerDiv = document.createElement('div');
    headerDiv.id = 'header-div';
    headerDiv.textContent = 'BATTLESHIP';
    headerDiv.addEventListener('click', () => {
        resetShipSetup();
    })

    const updateDiv = document.createElement('div');
    updateDiv.id = 'update-area';
    updateDiv.textContent = 'Deploy Your Ships!';
    topDiv.appendChild(headerDiv);
    topDiv.appendChild(updateDiv);

    body.appendChild(topDiv);
}

function createSetupScreen () {
    const content = document.createElement('div');
    content.id = 'content';

    const setupArea = document.createElement('div');
    setupArea.id = 'setup-area';


    content.appendChild(setupArea);

    body.appendChild(content);

    const footer = document.createElement('div');
    footer.id = 'footer';
    body.appendChild(footer);
}

function createSetupBoard() {
    const content = document.querySelector('#content');

    const board1 = document.createElement('div');
    board1.id = 'board1';
    board1.setAttribute('class', 'big');

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
            row.appendChild(col);
        }
        board1.appendChild(row);
    }
}

function createShipSetup () {
    const area = document.getElementById('setup-area');

    const shipDiv = document.createElement('div');
    shipDiv.id = 'ships-div';

    const carrierDivElements = document.createElement('div');
    carrierDivElements.setAttribute('class', 'ship-div-elements');
    const carrierDiv = document.createElement('div');
    carrierDiv.setAttribute('class', 'ship-placements');
    carrierDiv.id = 'carrierDiv';
    carrierDiv.draggable = true;
    carrierDiv.addEventListener('mouseenter', () => {
        if (!game) {
            document.body.style.cursor = 'pointer'
        }
    });
    carrierDiv.addEventListener('mouseleave', () => {
        if (!game) {
            document.body.style.cursor = 'default'
        }
    });
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
    battleshipDiv.addEventListener('mouseenter', () => {
        if (!game) {
            document.body.style.cursor = 'pointer'
        }
    });
    battleshipDiv.addEventListener('mouseleave', () => {
        if (!game) {
            document.body.style.cursor = 'default'
        }
    });
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
    destroyerDiv.addEventListener('mouseenter', () => {
        if (!game) {
            document.body.style.cursor = 'pointer'
        }
    });
    destroyerDiv.addEventListener('mouseleave', () => {
        if (!game) {
            document.body.style.cursor = 'default'
        }
    });
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
            if (activeShip.deployed) {
                pickUpFromBoard();
            }
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
    submarineDiv.addEventListener('mouseenter', () => {
        if (!game) {
            document.body.style.cursor = 'pointer'
        }
    });
    submarineDiv.addEventListener('mouseleave', () => {
        if (!game) {
            document.body.style.cursor = 'default'
        }
    });
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
            if (activeShip.deployed) {
                pickUpFromBoard();
            }
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
    patrolDiv.addEventListener('mouseenter', () => {
        if (!game) {
            document.body.style.cursor = 'pointer'
        }
    });
    patrolDiv.addEventListener('mouseleave', () => {
        if (!game) {
            document.body.style.cursor = 'default'
        }
    });
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
            if (activeShip.deployed) {
                pickUpFromBoard();
            }
        }
    });

    const patrol1 = document.createElement('div');
    patrol1.setAttribute('class', 'ship-parts');
    patrol1.id = 'patrol1';
    const patrol2 = document.createElement('div');
    patrol2.setAttribute('class', 'ship-parts');
    patrol2.id = 'patrol2';

    patrolDiv.appendChild(patrol1);
    patrolDiv.appendChild(patrol2);

    patrolDivElements.appendChild(patrolDiv);

    shipDiv.appendChild(carrierDivElements);
    shipDiv.appendChild(battleshipDivElements);
    shipDiv.appendChild(destroyerDivElements);
    shipDiv.appendChild(submarineDivElements);
    shipDiv.appendChild(patrolDivElements);

    area.appendChild(shipDiv);

    const settingsDiv = document.createElement('div');
    settingsDiv.id = 'settings';

    const shipButtonsDiv = document.createElement('div');
    shipButtonsDiv.id = 'ship-buttons-div';

    const randomShips = document.createElement('div');
    randomShips.setAttribute('class', 'ship-buttons');
    randomShips.textContent = 'Random';
    randomShips.addEventListener('click', () => {
        if (!game) {
            setShipsRandomly();
        }
    });

    const resetShips = document.createElement('div');
    resetShips.setAttribute('class', 'ship-buttons');
    resetShips.textContent = 'Reset';
    resetShips.addEventListener('click', () => {
        if (!game) {
            resetShipSetup();
        }
    });

    shipButtonsDiv.appendChild(randomShips);
    shipButtonsDiv.appendChild(resetShips);

    settingsDiv.appendChild(shipButtonsDiv);

    const startDiv = document.createElement('div');
    startDiv.id = 'game-start';
    startDiv.textContent = 'Play!';
    startDiv.addEventListener('click', () => {
        if (carrier.deployed && battleship.deployed && destroyer.deployed && 
            submarine.deployed && patrol.deployed) {
                removeSetupArea();
                makeCPUBoard();
                setupCPUBoard();
                switchPerspective();
                game = true;
                canAttack = true;
        }
    });

    settingsDiv.appendChild(startDiv);

    area.appendChild(settingsDiv);
}

function resetShipSetup() {
    let updateDiv = document.getElementById('update-area');
    updateDiv.textContent = 'Deploy Your Ships!';
    updateDiv.setAttribute('class', '');
    const content = document.querySelector('#content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    const footer = document.getElementById('footer');
    body.removeChild(content);
    body.removeChild(footer);

    resultsDiv.setAttribute('class', '');
    results.textContent = '';

    resetEverything();
    createSetupScreen();
    createShipSetup();
    createSetupBoard();
}

function setShipsRandomly () {
    resetShipSetup();
    activeShip = carrier;
    activeShipDiv = document.getElementById('carrierDiv');
    randomlyPlaceShip(player1, activeShip);
    placeShip(activeShip.position[0].boardR, activeShip.position[0].boardC);

    activeShip = battleship;
    activeShipDiv = document.getElementById('battleshipDiv');
    randomlyPlaceShip(player1, activeShip);
    placeShip(activeShip.position[0].boardR, activeShip.position[0].boardC);

    activeShip = destroyer;
    activeShipDiv = document.getElementById('destroyerDiv');
    randomlyPlaceShip(player1, activeShip);
    placeShip(activeShip.position[0].boardR, activeShip.position[0].boardC);

    activeShip = submarine;
    activeShipDiv = document.getElementById('submarineDiv');
    randomlyPlaceShip(player1, activeShip);
    placeShip(activeShip.position[0].boardR, activeShip.position[0].boardC);

    activeShip = patrol;
    activeShipDiv = document.getElementById('patrolDiv');
    randomlyPlaceShip(player1, activeShip);
    placeShip(activeShip.position[0].boardR, activeShip.position[0].boardC);
}

function removeSetupArea() {
    const content = document.querySelector('#content');
    const area = document.getElementById('setup-area');
    content.removeChild(area);
}

function makeCPUBoard () {
    const content = document.querySelector('#content');

    const board2 = document.createElement('div');
    board2.id = 'board2';
    board2.setAttribute('class', 'small');

    content.appendChild(board2);

    for (let r = 0; r < 10; r++) {
        let row = document.createElement('div')
        row.setAttribute('class', 'rows');
        for (let c = 0; c < 10; c++) {
            let col = document.createElement('div');
            col.setAttribute('class', 'squares');
            col.id = ('board2-' + r + c);
            col.addEventListener('mouseenter', () => {
                if(player1Turn && canAttack && !player2.myBoard.squares[r][c].hit) {
                    document.body.style.cursor = 'crosshair';
                }
            })
            col.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'default';
            })
            col.addEventListener('click', () => {
                if (player1Turn && canAttack) {
                    clickAttack(r, c);
                }
            });
            row.appendChild(col);
        }
        board2.appendChild(row);
    }
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
            square.style.backgroundColor = 'rgba(195, 233, 238, 0.6)';
        }
    }
    else {
        if (!player1.myBoard.squares[r][c].ship) {
            let square = document.getElementById(('board1-' + r + c));
            square.style.backgroundColor = 'rgba(195, 233, 238, 0.6)';
        }
    }
}

function placeShip (r, c) {
    if(!player1.myBoard.squares[r][c].shipHere){
        player1.myBoard.placeShip(activeShip, r, c, activeShip.horizontal);
    }
    let square = document.getElementById(('board1-' + r + c));
    if (square.firstChild) {
        for (let i = 0; i < activeShip.length; i++) {
            let oldSquare;
            if (activeShip.horizontal) {
                oldSquare = document.getElementById(('board1-' + (r + i) + c));
            }
            else {
                oldSquare = document.getElementById(('board1-' + r + (c + i)));
            }
            oldSquare.style.outlineWidth = '1px';
            oldSquare.style.backgroundColor = 'rgba(195, 233, 238, 0.6)';
        }
    }
    while(square.firstChild) {
        square.removeChild(square.firstChild);
    }
    square.appendChild(activeShipDiv);
    activeShipDiv.setAttribute('class', 'placed');
    if(activeShip.horizontal) {
        activeShipDiv.setAttribute('name', 'horizontal');
        square.setAttribute('name', 'horizontal');
    }
    else {
        activeShipDiv.setAttribute('name', 'vertical');
        square.setAttribute('name', 'vertical');
    }
    for (let i = 0; i < activeShip.length; i++) {
        let oldSquare;
        if (activeShip.horizontal) {
            oldSquare = document.getElementById(('board1-' + r + (c + i)));
        }
        else {
            oldSquare = document.getElementById(('board1-' + (r + i) + c));
        }
        oldSquare.style.backgroundColor = 'rgba(100, 150, 238, 0.6)';
    }
}

function pickUpFromBoard () {
    let oldR = activeShip.position[0].boardR;
    let oldC = activeShip.position[0].boardC;
    removeShip();
    activeShipDiv.addEventListener('dragend', () => {
        if (!activeShip.deployed) {
            placeShip(oldR, oldC);
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

function switchPerspective () {
    const content = document.getElementById('content');
    let last = content.firstChild;
    content.removeChild(content.firstChild);
    content.firstChild.setAttribute('class', 'big');
    content.appendChild(last);
    last.setAttribute('class', 'small');
    changeShipPartsSize();
}

function changeShipPartsSize() {
    const allShipParts = document.querySelectorAll('.ship-parts');
    const updateArea = document.getElementById('update-area');
    allShipParts.forEach(ship => {
        if (!player1Turn) {
            ship.setAttribute('name', 'big');
        }
        else {
            ship.setAttribute('name', 'small');
        }
    });
    if (!player1Turn) {
        cpuAttack();
        updateArea.textContent = 'Enemy Turn';
        updateArea.setAttribute('class', '');
    }
    else {
        canAttack = true;
        updateArea.textContent = 'Your Turn';
        updateArea.setAttribute('class', 'your-turn');
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
        let hitShipPart = player1.myBoard.squares[r][c].shipPart + 1;
        let divName = player1.myBoard.squares[r][c].ship.shipDomName;
        divName = divName + hitShipPart;
        square = document.getElementById(divName);
    }
    else {
        square = document.getElementById('board2-' + r + c);
    }
    let icon = document.createElement('span');
    icon.setAttribute('class', 'material-icons-outlined');
    icon.textContent = 'radio_button_checked';
    icon.style.color = 'red'
    square.appendChild(icon);
}

function missUpdate (r,c) {
    let square;
    if (!player1Turn) {
        square = document.getElementById('board1-' + r + c);
    }
    else {
        square = document.getElementById('board2-' + r + c);
    }
    let icon = document.createElement('span');
    icon.setAttribute('class', 'material-icons-outlined');
    icon.textContent = 'radio_button_checked';
    icon.style.color = 'white'
    square.appendChild(icon);
}

function shipDestroyed (ship) {
    for (let i = 0; i < ship.length; i++) {
        let r = ship.position[i].boardR;
        let c = ship.position[i].boardC;
        let square;
        if (!player1Turn) {
            let divName = ship.shipDomName + (i + 1);
            let shipDiv = document.getElementById(divName);
            shipDiv.style.backgroundColor = 'rgba(255, 70, 70, 0.7)'
            square = document.getElementById('board1-' + r + c);
        }
        else {
            square = document.getElementById('board2-' + r + c);
        }
        square.style.backgroundColor = 'rgba(255, 100, 70, 0.6)';
    }
    if(player1Turn) {
        roundUpdate('You sunk their ' + ship.title + '!');
    }
    else {
        roundUpdate('They sunk your ' + ship.title + '!');
    }
    
}

function roundUpdate (update) {
    results.textContent = update;
    resultsDiv.setAttribute('class', 'slide-left');
    canAttack = false;
    // results.textContent = '';
    // results.setAttribute('class', '');
    setTimeout(() => {results.textContent = '';}, 3000);
    setTimeout(() => {resultsDiv.setAttribute('class', '');}, 3000);
    setTimeout(() => {canAttack = true;}, 3000);
}

function gameOver () {
    game = false;
    canAttack = false;
    const updateDiv = document.getElementById('update-area');
    if (player1Turn) {
        updateDiv.textContent= 'You Win!';
    }
    else {
        updateDiv.textContent= 'You Lose!';
    }
    
    playAgainScreen();
}


function playAgainScreen() {
    const content = document.querySelector('#content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    const updateDiv = document.getElementById('update-area');
    const playAgainDiv = document.createElement('div');
    playAgainDiv.id = 'play-again';
    playAgainDiv.textContent = 'Play Again?'
    content.appendChild(playAgainDiv);
    playAgainDiv.addEventListener('click', () => {
        content.removeChild(playAgainDiv);
        updateDiv.textContent = 'Deploy Your Ships!';
        resetShipSetup();
    });
}


export {createLayout, hitUpdate, missUpdate, shipDestroyed, gameOver, switchPerspective};