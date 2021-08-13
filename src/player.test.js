import {Player} from './player';
import {Gameboard} from './gameboard.js';
import {Ship} from './ships.js';
import { expect, test } from '@jest/globals';

test('create player', () => {
    const board1 = Gameboard('board1', 10);
    const board2 = Gameboard('board2', 10);
    let player1 = Player('Player 1', board1, board2, true)
    expect(player1.title).toBe('Player 1');
    expect(player1.human).toBe(true);
})

test('cpu found ship function', () => {
    const board1 = Gameboard('board1', 10);
    const board2 = Gameboard('board2', 10);
    let player1 = Player('Player 1', board1, board2, true);
    let player2 = Player('Player 1', board2, board1, false);
    const ship1 = Ship('boat', 3);
    board1.placeShip(ship1, 1, 2, true);
    while(!player2.shipFound) {
        let coords = player2.cpuRandomAttack();
        board1.receiveAttack(coords.r, coords.c);
    }
    expect(player2.shipFound).toBe(true);
});

test('cpu find and kill ship', () => {
    const board1 = Gameboard('board1', 10);
    const board2 = Gameboard('board2', 10);
    let player1 = Player('Player 1', board1, board2, true);
    let player2 = Player('Player 1', board2, board1, false);
    const ship1 = Ship('boat', 3);
    board1.placeShip(ship1, 1, 2, true);
    while(!player2.shipFound) {
        let coords = player2.cpuRandomAttack();
        board1.receiveAttack(coords.r, coords.c);
    }
    while(!board1.allShipsSunk()) {
        let coords = player2.cpuFoundAttack();
        board1.receiveAttack(coords.r, coords.c);
    }
    expect(board1.allShipsSunk()).toBe(true);
});