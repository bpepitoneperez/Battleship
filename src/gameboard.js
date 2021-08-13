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
                shipHere: false,
                shipPart: null,
            };
        }
    }
    function placeShip(ship, startingRow, startingCol, horizontal) {
        ships.push(ship);
        for (let i = 0; i < ship.length; i++) {
            if (horizontal) {
                squares[startingRow][startingCol + i].ship = ship;
                squares[startingRow][startingCol + i].shipHere = true;
                squares[startingRow][startingCol + i].shipPart = i;
                ship.position[i].boardR = startingRow;
                ship.position[i].boardC = startingCol + i;
            }
            else {
                squares[startingRow + i][startingCol].ship = ship;
                squares[startingRow + i][startingCol].shipHere = true;
                squares[startingRow + i][startingCol].shipPart = i;
                ship.position[i].boardR = startingRow + i;
                ship.position[i].boardC = startingCol;
            }
            
        }
    }

    function receiveAttack (row, col) {
        squares[row][col].hit = true;
        if (squares[row][col].shipHere) {
            squares[row][col].ship.hit(squares[row][col].shipPart);
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