import { Player } from './player';
import { Ship } from './ships';
import { Gameboard } from './gameboard';
import { createLayout, hitUpdate, missUpdate, shipDestroyed, gameOver } from './DOMDisplay';

let player1Turn;
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
    cpuPlaceShip(carrier);
    cpuPlaceShip(battleship);
    cpuPlaceShip(destroyer);
    cpuPlaceShip(submarine);
    cpuPlaceShip(patrol);
}

function cpuPlaceShip (ship) {
    let coords;
    coords = player2.cpuRandomPlace();
    while(!player2.myBoard.canPlace(ship, coords.r, coords.c, coords.horizontal)) {
        coords = player2.cpuRandomPlace();
    }
    player2.myBoard.placeShip(ship, coords.r, coords.c, coords.horizontal);
}

function attack (player, r, c) {
    if (!player.opponentBoard.squares[r][c].hit && game == true) {
        let result = player.opponentBoard.receiveAttack(r, c);
        if (result === 'Hit') {
            console.log('Hit')
            hitUpdate(r, c);
            if (player.opponentBoard.squares[r][c].ship.isSunk()) {
                player.opponentBoard.squares[r][c].ship.sunk = true;
                shipDestroyed(player.opponentBoard.squares[r][c].ship);
                if (player.opponentBoard.allShipsSunk()) {
                    game = false;
                    gameOver();
                }
            }
        }
        else {
            console.log('Miss')
            missUpdate(r, c);
            player1Turn = !player1Turn;
        }
    }
    if (!player1Turn) {
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
        setTimeout(() => {attack(player2, coords.r, coords.c);}, 800);
    }
}

export {initialSetup, setupCPUBoard, cpuPlaceShip, player1Turn, player1, player2,
     attack, game, carrier, battleship, destroyer, submarine, patrol, newGame};