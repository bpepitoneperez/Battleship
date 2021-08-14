import { Player } from './player';
import { Ship } from './ships';
import { Gameboard } from './gameboard';
import { hitUpdate, missUpdate, shipDestroyed, gameOver } from './DOMDisplay';

let player1Turn = true;
let board1 = Gameboard('board1', 10);
let board2 = Gameboard('board2', 10);
let player1 = Player('Me', board1, board2, true);
let player2 = Player('cpu', board2, board1, false);
let game = false;

function createGameRandom () {

    

    player1.myBoard.placeShip(Ship('boat1-1', 2), 0, 0, true);
    player1.myBoard.placeShip(Ship('boat2-1', 2), 1, 1, true);
    player1.myBoard.placeShip(Ship('boat3-1', 2), 2, 2, true);

    player2.myBoard.placeShip(Ship('boat1-2', 2), 0, 0, true);
    player2.myBoard.placeShip(Ship('boat2-2', 2), 1, 1, true);
    player2.myBoard.placeShip(Ship('boat3-2', 2), 2, 2, true);
    
    game = true;
}

function gameSetup () {
    
}

function attack (player, r, c) {
    if (!player.opponentBoard.squares[r][c].hit && game == true) {
        let result = player.opponentBoard.receiveAttack(r, c);
        if (result === 'Hit') {
            console.log('hit')
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
            console.log('miss')
            missUpdate(r, c);
            player1Turn = !player1Turn;
        }
    }
    if (!player1Turn) {
        let coords;
        if (player2.cpuInfo.shipFound) {
            coords = player2.cpuFoundAttack();
        }
        else {
            coords = player2.cpuRandomAttack();
        }

        if (!coords) {
            //console.log('failsafe');
            coords = player2.cpuRandomAttack();
        }
        setTimeout(() => {attack(player2, coords.r, coords.c);}, 800);
    }
}

export {createGameRandom, player1Turn, player1, player2, attack, game};