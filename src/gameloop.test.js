/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});

import { randomlyPlaceShip, player2, createBlankPlayers, createBlankBoards} from './gameloop';
import { Ship } from './ships';

test('cpu place ship randomly', () => {
    createBlankBoards();
    createBlankPlayers();
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
    expect(player2.myBoard.ships.length).toBe(5);
});