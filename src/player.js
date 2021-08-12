import {Gameboard} from './gameboard.js';

const Player = (title, myBoard, opponentBoard, human) => {

    function randomSpot () {
        return Math.floor(Math.random() * (8 - 0) + 0)
    }

    function cpuRandomAttack () {
        let row = randomSpot();
        let col = randomSpot();
        while (opponentBoard.squares[row][col].hit) {
            row = randomSpot();
            col = randomSpot();
        }
        return opponentBoard.receiveAttack(row, col);
    }

    return {
        title,
        myBoard,
        human,
        opponentBoard,
        cpuRandomAttack,
    }
}

export {Player};