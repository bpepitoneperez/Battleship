
const Player = (title, myBoard, opponentBoard, human) => {
    let shipFound = false;
    let shipFoundR;
    let shipFoundC;
    let move = 0;
    let lastHit = false;
    let goRight = true;
    let goLeft = true;
    let goUp = true;
    let goDown = true;
    function randomSpot () {
        return Math.floor(Math.random() * (10 - 0) + 0)
    }

    function cpuFoundAttack () {
        let coords = {
            r: 0,
            c: 0,
        };
        if (this.opponentBoard.squares[this.shipFoundR][this.shipFoundC].ship.sunk) {
            this.shipFound = false;
            this.move = 0;
            goRight = true;
            goLeft = true;
            goUp = true;
            goDown = true;
            cpuRandomAttack();
        }
        else {
            if (!this.lastHit) {
                this.move = 0;
            }
            if (goRight && this.shipFoundC + this.move > 9) {
                goRight = false;
            }
            else if(goLeft && this.shipFoundC + this.move < 0) {
                goLeft = false;
            }
            else if(goUp && shipFoundC + this.move < 0) {
                goUp = false;
            }
            else if(goDown && shipFoundC + this.move > 9) {
                goDown = false;
            }


            if (goRight) {
                this.move++;
                if (this.opponentBoard.squares[this.shipFoundR][this.shipFoundC + this.move].ship) {
                    goUp = false;
                    goDown = false;
                    this.lastHit = true;
                }
                else {
                    goRight = false;
                    lastHit = false;
                }
                coords.r = this.shipFoundR;
                coords.c = this.shipFoundC + this.move
                return coords;
            }
            else if (this.goLeft) {
                this.move--;
                if (this.opponentBoard.squares[this.shipFoundR][this.shipFoundC + this.move].ship) {
                    goUp = false;
                    goDown = false;
                    lastHit = true;
                }
                else {
                    goLeft = false;
                    lastHit = false;
                }
                coords.r = this.shipFoundR;
                coords.c = this.shipFoundC + this.move
                return coords;
            }
            else if (goUp) {
                this.move--;
                if (this.opponentBoard.squares[this.shipFoundR + this.move][this.shipFoundC].ship) {
                    goLeft = false;
                    goRight = false;
                    lastHit = true;
                }
                else {
                    goUp = false;
                    lastHit = false;
                }
                coords.r = this.shipFoundR + this.move;
                coords.c = this.shipFoundC;
                return coords;
            }
            else if (goDown) {
                this.move++;
                if (this.opponentBoard.squares[this.shipFoundR + this.move][this.shipFoundC].ship) {
                    goLeft = false;
                    lastHit = true;
                }
                else {
                    goDown = false;
                    lastHit = false;
                }
                coords.r = this.shipFoundR + this.move;
                coords.c = this.shipFoundC;
                return coords;
            }
        }
    }

    function cpuRandomAttack () {
        let coords = {
            r: 0,
            c: 0,
        };
        let row = randomSpot();
        let col = randomSpot();
        while (opponentBoard.squares[row][col].hit) {
            row = randomSpot();
            col = randomSpot();
        }
        if(opponentBoard.squares[row][col].ship) {
            this.shipFound = true;
            this.shipFoundR = row;
            this.shipFoundC = col;
        }
        coords.r = row;
        coords.c = col;
        return coords;
    }

    return {
        title,
        myBoard,
        human,
        opponentBoard,
        cpuRandomAttack,
        cpuFoundAttack,
        shipFound,
    }
}

export {Player};