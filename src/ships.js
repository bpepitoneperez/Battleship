const Ship = (title, length) => {
    let hits = 0;
    let position = [];

    for (let i = 0; i < length; i++) {
        position[i] = {
            hit: false,
            pos: i,
        };
    }

    function hit (pos) {
        position[pos].hit = true;
        this.hits++;
    };

    function isSunk () {
        for (let i = 0; i < length; i++) {
            if (position[i].hit == false) {
                return false;
            }
        }
        return true;
    }

    return {
        title,
        length,
        hit,
        hits,
        position,
        isSunk
    }
}



export {Ship};