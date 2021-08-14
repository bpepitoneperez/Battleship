
const Player = (title, myBoard, opponentBoard, human) => {
    let cpuInfo = {
        shipFound: false,
        shipFoundR: 0,
        shipFoundC: 0,
        move: 0,
        lastHit: false,
        goRight: true,
        goLeft: true,
        goUp: true,
        goDown: true,
        coords: {
            r: 0,
            c: 0,
        },
    }
    function randomSpot () {
        return Math.floor(Math.random() * (10 - 0) + 0)
    }

    function cpuFoundAttack () {
        if (opponentBoard.squares[cpuInfo.shipFoundR][cpuInfo.shipFoundC].ship.sunk) {
            cpuInfo.shipFound = false;
            cpuInfo.shipFoundR = 0;
            cpuInfo.shipFoundC = 0;
            cpuInfo.move = 0;
            cpuInfo.lastHit = false;
            cpuInfo.goRight = true;
            cpuInfo.goLeft = true;
            cpuInfo.goUp = true;
            cpuInfo.goDown = true;
            cpuRandomAttack();
        }
        else {
            if (!cpuInfo.lastHit) {
                cpuInfo.move = 0;
            }
            if (cpuInfo.goRight && cpuInfo.shipFoundC + cpuInfo.move > 9) {
                cpuInfo.goRight = false;
            }
            else if(cpuInfo.goLeft && cpuInfo.shipFoundC + cpuInfo.move < 0) {
                cpuInfo.goLeft = false;
            }
            else if(cpuInfo.goUp && cpuInfo.shipFoundC + cpuInfo.move < 0) {
                cpuInfo.goUp = false;
            }
            else if(cpuInfo.goDown && cpuInfo.shipFoundC + cpuInfo.move > 9) {
                cpuInfo.goDown = false;
            }


            if (cpuInfo.goRight) {
                cpuInfo.move++;
                if (opponentBoard.squares[cpuInfo.shipFoundR][cpuInfo.shipFoundC + cpuInfo.move].ship) {
                    cpuInfo.goUp = false;
                    cpuInfo.goDown = false;
                    cpuInfo.lastHit = true;
                }
                else {
                    cpuInfo.goRight = false;
                    cpuInfo.lastHit = false;
                }
                cpuInfo.coords.r = cpuInfo.shipFoundR;
                cpuInfo.coords.c = cpuInfo.shipFoundC + cpuInfo.move
                return cpuInfo.coords;
            }
            else if (cpuInfo.goLeft) {
                cpuInfo.move--;
                if (opponentBoard.squares[cpuInfo.shipFoundR][cpuInfo.shipFoundC + cpuInfo.move].ship) {
                    cpuInfo.goUp = false;
                    cpuInfo.goDown = false;
                    cpuInfo.lastHit = true;
                }
                else {
                    cpuInfo.goLeft = false;
                    cpuInfo.lastHit = false;
                }
                cpuInfo.coords.r = cpuInfo.shipFoundR;
                cpuInfo.coords.c = cpuInfo.shipFoundC + cpuInfo.move
                return cpuInfo.coords;
            }
            else if (cpuInfo.goUp) {
                cpuInfo.move--;
                if (opponentBoard.squares[cpuInfo.shipFoundR + cpuInfo.move][cpuInfo.shipFoundC].ship) {
                    cpuInfo.goLeft = false;
                    cpuInfo.goRight = false;
                    cpuInfo.lastHit = true;
                }
                else {
                    cpuInfo.goUp = false;
                    cpuInfo.lastHit = false;
                }
                cpuInfo.coords.r = cpuInfo.shipFoundR + cpuInfo.move;
                cpuInfo.coords.c = cpuInfo.shipFoundC;
                return coords;
            }
            else if (cpuInfo.goDown) {
                cpuInfo.move++;
                if (opponentBoard.squares[cpuInfo.shipFoundR + cpuInfo.move][cpuInfo.shipFoundC].ship) {
                    cpuInfo.goLeft = false;
                    cpuInfo.lastHit = true;
                }
                else {
                    cpuInfo.goDown = false;
                    cpuInfo.lastHit = false;
                }
                cpuInfo.coords.r = shipFoundR + move;
                cpuInfo.coords.c = shipFoundC;
                return cpuInfo.coords;
            }
        }
    }

    function cpuRandomAttack () {
        let row = randomSpot();
        let col = randomSpot();
        while (opponentBoard.squares[row][col].hit) {
            row = randomSpot();
            col = randomSpot();
        }
        if(opponentBoard.squares[row][col].shipHere) {
            cpuInfo.shipFound = true;
            cpuInfo.shipFoundR = row;
            cpuInfo.shipFoundC = col;
        }
        cpuInfo.coords.r = row;
        cpuInfo.coords.c = col;
        return cpuInfo.coords;
    }

    return {
        title,
        myBoard,
        human,
        opponentBoard,
        cpuRandomAttack,
        cpuFoundAttack,
        cpuInfo,
    }
}

export {Player};