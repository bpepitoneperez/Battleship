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

    function canPlace(ship, startingRow, startingCol, horizontal) {
        for (let i = 0; i < ship.length; i++) {
            if (horizontal) {
                if (startingCol + ship.length > 10) {
                    return false;
                }
                if (squares[startingRow][startingCol + i].shipHere) {
                    return false;
                }
            }
            else {
                if (startingRow + ship.length > 10) {
                    return false;
                }
                if (squares[startingRow + i][startingCol].shipHere) {
                    return false;
                }
            }
        }
        return true;
    }
    function placeShip(ship, startingRow, startingCol, horizontal) {
        ships.push(ship);
        ship.deployed = true;
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
                ship.position[i].boardR = startingRow;
                ship.position[i].boardC = startingCol;
            }
            
        }
    }

    function removeShip(ship, startingRow, startingCol, horizontal) {
        for (let i = 0; i < ship.length; i++) {
            if (horizontal) {
                squares[startingRow][startingCol + i].ship = null;
                squares[startingRow][startingCol + i].shipHere = false;
                squares[startingRow][startingCol + i].shipPart = null;
                ship.position[i].boardR = null;
                ship.position[i].boardC = null;
            }
            else {
                squares[startingRow + i][startingCol].ship = null;
                squares[startingRow + i][startingCol].shipHere = false;
                squares[startingRow + i][startingCol].shipPart = null;
                ship.position[i].boardR = null;
                ship.position[i].boardC = null;
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
        removeShip,
        receiveAttack,
        allShipsSunk,
        canPlace,
        ships,
    }
}

export {Gameboard};