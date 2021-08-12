import {Gameboard} from './gameboard.js';
import {Ship} from './ships.js';

test('creates basic board', () => {
    const board = Gameboard('board1', 10);
    expect(board.title).toBe('board1');
    expect(board.squares.length * board.squares[0].length).toBe(100);
    expect(board.squares[0][2].row).toBe(0);
    expect(board.squares[0][2].col).toBe(2);
    expect(board.squares[0][2].hit).toBe(false);
    expect(board.squares[0][2].ship).toBe(null);
});

test('place ship horizontal', () => {
    const ship1 = Ship('boat', 3);
    const board = Gameboard('board1', 10);
    board.placeShip(ship1, 1, 2, true);
    expect(board.squares[1][2].shipPos.pos).toBe(0);
    expect(board.squares[1][3].shipPos.pos).toBe(1);
    expect(board.squares[1][4].shipPos.pos).toBe(2);
});

test('place ship vertical', () => {
    const ship1 = Ship('boat', 3);
    const board = Gameboard('board1', 10);
    board.placeShip(ship1, 1, 2, false);
    expect(board.squares[1][2].shipPos.pos).toBe(0);
    expect(board.squares[2][2].shipPos.pos).toBe(1);
    expect(board.squares[3][2].shipPos.pos).toBe(2);
});

test('attack miss', () => {
    const ship1 = Ship('boat', 3);
    const board = Gameboard('board1', 10);
    board.placeShip(ship1, 1, 2, true);
    expect(board.receiveAttack(2, 5)).toBe('Miss');
    expect(board.squares[2][5].hit).toBe(true);
});

test('attack hit', () => {
    const ship1 = Ship('boat', 3);
    const board = Gameboard('board1', 10);
    board.placeShip(ship1, 1, 2, true);
    expect(board.receiveAttack(1, 3)).toBe('Hit');
    expect(board.squares[1][3].hit).toBe(true);
});

test('boat sunk', () => {
    const board = Gameboard('board1', 10);
    const ship1 = Ship('boat', 2);
    const ship2 = Ship('boat', 3);
    board.placeShip(ship1, 1, 2, true);
    board.placeShip(ship2, 0, 0, false);
    expect(board.receiveAttack(1, 2)).toBe('Hit');
    expect(board.squares[1][2].hit).toBe(true);
    expect(board.receiveAttack(1, 3)).toBe('Hit');
    expect(board.squares[1][3].hit).toBe(true);
    expect(board.squares[1][2].ship.isSunk()).toBe(true);
    expect(board.squares[1][3].ship.isSunk()).toBe(true);
})

test('all boats sunk', () => {
    const board = Gameboard('board1', 10);
    const ship1 = Ship('boat', 2);
    const ship2 = Ship('boat', 3);
    board.placeShip(ship1, 1, 2, true);
    board.placeShip(ship2, 0, 0, false);
    expect(board.receiveAttack(1, 2)).toBe('Hit');
    expect(board.squares[1][2].hit).toBe(true);
    expect(board.receiveAttack(1, 3)).toBe('Hit');
    expect(board.squares[1][3].hit).toBe(true);
    expect(board.receiveAttack(0, 0)).toBe('Hit');
    expect(board.squares[0][0].hit).toBe(true);
    expect(board.receiveAttack(1, 0)).toBe('Hit');
    expect(board.squares[1][0].hit).toBe(true);
    expect(board.receiveAttack(2, 0)).toBe('Hit');
    expect(board.squares[2][0].hit).toBe(true);
    expect(board.allShipsSunk()).toBe(true)
});

test('all boats not sunk', () => {
    const board = Gameboard('board1', 10);
    const ship1 = Ship('boat', 2);
    const ship2 = Ship('boat', 3);
    board.placeShip(ship1, 1, 2, true);
    board.placeShip(ship2, 0, 0, false);
    expect(board.receiveAttack(1, 2)).toBe('Hit');
    expect(board.squares[1][2].hit).toBe(true);
    expect(board.receiveAttack(1, 3)).toBe('Hit');
    expect(board.squares[1][3].hit).toBe(true);
    expect(board.receiveAttack(0, 0)).toBe('Hit');
    expect(board.squares[0][0].hit).toBe(true);
    expect(board.receiveAttack(1, 0)).toBe('Hit');
    expect(board.squares[1][0].hit).toBe(true);
    expect(board.allShipsSunk()).toBe(false)
});