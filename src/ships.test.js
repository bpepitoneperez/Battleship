import { expect, test } from '@jest/globals';
import {Ship} from './ships.js';

test('creates basic ship', () => {
    const ship = Ship('boat', 3);
    expect(ship.title).toBe('boat');
    expect(ship.length).toBe(3);
});

test('can hit ship position', () => {
    const ship = Ship('battleship', 4);
    ship.hit(0);
    expect(ship.position[0].hit).toBe(true);
});

test('sink ship check', () => {
    const ship = Ship('teeny', 2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
});

test('sink ship check 2 (not sunk)', () => {
    const ship = Ship('teeny', 2);
    ship.hit(0);
    expect(ship.isSunk()).toBe(false);
});