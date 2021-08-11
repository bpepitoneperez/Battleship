import {Ship} from './ships';

const Gameboard = (title, length) => {
    let squares = [];
    let ships = [];

    for (let r = 0; r < length; r++) {
        squares[r] = [];
        for (let c = 0; c < length; c++) {
            squares[r][c] = {
                row: r,
                col: c,
                hit: false,
                ship: null,
            };
        }
    }
    function placeShip(ship, startingRow, startingCol, horizontal) {
        ships.push(ship);
        for (let i = 0; i < ship.length; i++) {
            if (horizontal) {
                squares[startingRow][startingCol + i].ship = ship.position[i];
            }
            else {
                squares[startingRow + i][startingCol].ship = ship.position[i];
            }
            
        }
    }

    function receiveAttack (row, col) {
        squares[row][col].hit = true;
        if (squares[row][col].ship) {
            squares[row][col].ship.hit = true;
            return 'Hit';
        }
        else {
            return 'Miss';
        }
    }

    function allShipsSunk () {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    }

    return {
        title,
        squares,
        placeShip,
        receiveAttack,
        allShipsSunk,
    }
}

export {Gameboard};