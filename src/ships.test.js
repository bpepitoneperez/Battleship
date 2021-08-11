import { expect, test } from '@jest/globals';
import {Ship} from './ships.js';

test('creates basic ship', () => {
    const ship = Ship('boat', 3);
    expect(ship.title).toBe('boat')
    expect(ship.length).toBe(3)
})