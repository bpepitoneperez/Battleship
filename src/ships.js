const Ship = (title, length) => {
    let hits = 0;
    let position = [];
    let sunk = false;

    for (let i = 0; i < length; i++) {
        position[i] = {
            hit: false,
            boardR: null,
            boardC: null,
            pos: i,
        };
    }

    function hit (pos) {
        position[pos].hit = true;
        hits++;
    };

    function isSunk () {
        for (let i = 0; i < length; i++) {
            if (position[i].hit == false) {
                return false;
            }
        }
        sunk = true;
        return true;
    }

    return {
        title,
        length,
        hit,
        hits,
        position,
        isSunk,
        sunk,
    }
}



export {Ship};