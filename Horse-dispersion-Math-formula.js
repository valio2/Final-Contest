/* globals Map Symbol */
/* eslint-disable */
const getGets = (arr) => {
    let index = 0;
    return () => {
        const toReturn = arr[index];
        index += 1;
        return toReturn;
    };
};
const test = `6
7
3
4`.split('\n');
const gets = this.gets || getGets(test);
const print = this.print || console.log;
/* eslint-enable */

const n = +gets();
const m = +gets();
const startR = +gets();
const startC = +gets();

const distance = (x, y) => {
    // axes symmetry
    x = Math.abs(x);
    y = Math.abs(y);

    // diagonal symmetry
    if (x < y) {
        [x, y] = [y, x];
    }

    // 2 corner cases
    if (x === 1 && y === 0) {
        return 3;
    }
    if (x === 2 && y === 2) {
        return 4;
    }

    // main formula
    const delta = x - y;
    if (y > delta) {
        return delta - 2 * Math.floor((delta - y) / 3);
    }
    return delta - 2 * Math.floor((delta - y) / 4);
};

const wantedCol = Math.floor(m / 2);
const arr = [];

for (let i = 0; i < n; i += 1) {
    arr.push(distance(startR - i, wantedCol - startC) + 1);
}

print(arr.join('\n'));

// https://stackoverflow.com/questions/2339101/knights-shortest-path-chess-question