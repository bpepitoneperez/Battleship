
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
        hitCoords: {
            r: 0,
            c: 0,
        },
        placementCoords: {
            r: 0,
            c: 0,
            horizontal: false,
        },
    }
    function randomSpot () {
        return Math.floor(Math.random() * (9 - 0) + 0)
    }

    function cpuFoundAttack () {
        if (opponentBoard.squares[cpuInfo.shipFoundR][cpuInfo.shipFoundC].ship.sunk) {
            //resetCPUInfo();
            cpuRandomAttack();
        }
        else {
            if (!cpuInfo.lastHit) {
                cpuInfo.move = 0;
            }
            if (cpuInfo.goRight && cpuInfo.shipFoundC + cpuInfo.move + 1 > 9) {
                cpuInfo.goRight = false;
                cpuInfo.move = 0;
            }
            else if(cpuInfo.goLeft && cpuInfo.shipFoundC + cpuInfo.move - 1 < 0) {
                cpuInfo.goLeft = false;
                cpuInfo.move = 0;
            }
            else if(cpuInfo.goUp && cpuInfo.shipFoundC + cpuInfo.move - 1 < 0) {
                cpuInfo.goUp = false;
                cpuInfo.move = 0;
            }
            else if(cpuInfo.goDown && cpuInfo.shipFoundC + cpuInfo.move + 1 > 9) {
                cpuInfo.goDown = false;
                cpuInfo.move = 0;
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
                cpuInfo.hitCoords.r = cpuInfo.shipFoundR;
                cpuInfo.hitCoords.c = cpuInfo.shipFoundC + cpuInfo.move
                return cpuInfo.hitCoords;
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
                cpuInfo.hitCoords.r = cpuInfo.shipFoundR;
                cpuInfo.hitCoords.c = cpuInfo.shipFoundC + cpuInfo.move
                return cpuInfo.hitCoords;
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
                cpuInfo.hitCoords.r = cpuInfo.shipFoundR + cpuInfo.move;
                cpuInfo.hitCoords.c = cpuInfo.shipFoundC;
                return cpuInfo.hitCoords;
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
                cpuInfo.hitCoords.r = cpuInfo.shipFoundR + cpuInfo.move;
                cpuInfo.hitCoords.c = cpuInfo.shipFoundC;
                return cpuInfo.hitCoords;
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
        cpuInfo.hitCoords.r = row;
        cpuInfo.hitCoords.c = col;
        return cpuInfo.hitCoords;
    }

    function cpuRandomPlace () {
        let row = randomSpot();
        let col = randomSpot();
        let choice = randomSpot();
        if (choice >= 4) {
            cpuInfo.placementCoords.horizontal = true;
        }
        else {
            cpuInfo.placementCoords.horizontal = false;
        }
        cpuInfo.placementCoords.r = row;
        cpuInfo.placementCoords.c = col;
        return cpuInfo.placementCoords;
    }

    function resetCPUInfo () {
        cpuInfo.shipFound = false;
        cpuInfo.shipFoundR = 0;
        cpuInfo.shipFoundC = 0;
        cpuInfo.move = 0;
        cpuInfo.lastHit = false;
        cpuInfo.goRight = true;
        cpuInfo.goLeft = true;
        cpuInfo.goUp = true;
        cpuInfo.goDown = true;
    }

    return {
        title,
        myBoard,
        human,
        opponentBoard,
        cpuRandomAttack,
        cpuFoundAttack,
        cpuRandomPlace,
        cpuInfo,
        resetCPUInfo,
    }
}

export {Player};