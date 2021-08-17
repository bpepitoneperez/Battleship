import { Player } from './player';
import { Ship } from './ships';
import { Gameboard } from './gameboard';
import { createLayout, hitUpdate, missUpdate, shipDestroyed, gameOver, switchPerspective } from './DOMDisplay';

let shipDestroyedAnimation = false;
let player1Turn;
let canAttack = false;
let board1;
let board2;
let player1;
let player2;
let game = false;

let carrier;
let battleship;
let destroyer;
let submarine;
let patrol;

function initialSetup() {
    createBlankShips();
    createBlankBoards();
    createBlankPlayers();
    createLayout();
}

function resetEverything() {
    player1Turn = null;
    canAttack = false;
    board1 = null;
    board2 = null;
    player1 = null;
    player2 = null;
    game = false;

    carrier = null;
    battleship = null;
    destroyer = null;
    submarine = null;
    patrol = null;
    newGame();
}

function newGame() {
    createBlankShips();
    createBlankBoards();
    createBlankPlayers();
}

function createBlankShips() {
    carrier = Ship('Carrier', 5);
    carrier.shipDomName = 'carrier';
    carrier.horizontal = true;

    battleship = Ship('Battleship', 4);
    battleship.shipDomName = 'battleship';
    battleship.horizontal = true;

    destroyer = Ship('Destroyer', 3);
    destroyer.shipDomName = 'destroyer';
    destroyer.horizontal = true;

    submarine = Ship('Submarine', 3);
    submarine.shipDomName = 'submarine';
    submarine.horizontal = true;

    patrol = Ship('Patrol Boat', 2);
    patrol.shipDomName = 'patrol';
    patrol.horizontal = true;
}

function createBlankPlayers() {
    player1 = Player('Me', board1, board2, true);
    player2 = Player('cpu', board2, board1, false);
    player1Turn = true;
}

function createBlankBoards() {
    board1 = Gameboard('board1', 10);
    board2 = Gameboard('board2', 10);
}

function setupCPUBoard () {
    let carrier = Ship('Carrier', 5);
    let battleship = Ship('Battleship', 4);
    let destroyer = Ship('Destroyer', 3);
    let submarine = Ship('Submarine', 3);
    let patrol = Ship('Patrol Boat', 2);
    randomlyPlaceShip(player2, carrier);
    randomlyPlaceShip(player2, battleship);
    randomlyPlaceShip(player2, destroyer);
    randomlyPlaceShip(player2, submarine);
    randomlyPlaceShip(player2, patrol);
}

function randomlyPlaceShip (player, ship) {
    let coords;
    coords = player.cpuRandomPlace();
    while(!player.myBoard.canPlace(ship, coords.r, coords.c, coords.horizontal)) {
        coords = player.cpuRandomPlace();
    }
    player.myBoard.placeShip(ship, coords.r, coords.c, coords.horizontal);
}

function attack (player, r, c) {
    if (!player.opponentBoard.squares[r][c].hit && game == true) {
        let result = player.opponentBoard.receiveAttack(r, c);
        if (result === 'Hit') {
            hitUpdate(r, c);
            if (player.opponentBoard.squares[r][c].ship.isSunk()) {
                player.opponentBoard.squares[r][c].ship.sunk = true;
                shipDestroyed(player.opponentBoard.squares[r][c].ship);
                shipDestroyedAnimation = true;
                if (player.opponentBoard.allShipsSunk()) {
                    game = false;
                    setTimeout(() => {gameOver()}, 3000);
                }
            }
            if (!player1Turn && game) {
                if (shipDestroyedAnimation) {
                    console.log('ship was destroyed so waiting for the animation')
                    setTimeout(() => {cpuAttack();}, 3000);
                    setTimeout(() => {shipDestroyedAnimation = false;}, 3000);
                }
                else {
                    cpuAttack();
                }
            }
        }
        else {
            missUpdate(r, c);
            player1Turn = !player1Turn;
            if (!player1Turn) {
                canAttack = false;
            }
            setTimeout(() => {switchPerspective();}, 1000);
        }
    }
}

function cpuAttack () {
    let coords;
    if (player2.cpuInfo.shipFound) {
        //console.log('found');
        coords = player2.cpuFoundAttack();
    }
    else {
        //console.log('random');
        player2.resetCPUInfo();
        coords = player2.cpuRandomAttack();
    }

    if (!coords) {
        //console.log('failsafe');
        player2.resetCPUInfo();
        coords = player2.cpuRandomAttack();
    }
    setTimeout(() => {attack(player2, coords.r, coords.c);}, 1000);
}

export {initialSetup, setupCPUBoard, randomlyPlaceShip, player1Turn, player1, player2, canAttack,
     attack, game, carrier, battleship, destroyer, submarine, patrol, newGame,
      cpuAttack, resetEverything, createBlankPlayers, createBlankBoards};