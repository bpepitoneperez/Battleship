/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});

import { cpuPlaceShip, player2} from './gameloop';
import { Ship } from './ships';

test('cpu place ship randomly', () => {
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
    expect(player2.myBoard.ships.length).toBe(5);
});