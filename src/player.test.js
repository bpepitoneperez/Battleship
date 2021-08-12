import {Player} from './player';
import {Gameboard} from './gameboard.js';
import {Ship} from './ships.js';

test('create player', () => {
    const board1 = Gameboard('board1', 10);
    const board2 = Gameboard('board2', 10);
    let player1 = Player('Player 1', board1, board2, true)
    expect(player1.title).toBe('Player 1');
    expect(player1.human).toBe(true);
})