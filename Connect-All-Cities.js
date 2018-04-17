/* globals Set */
/* eslint-disable */
const getGets = (arr) => {
    let index = 0;
    return () => {
        const toReturn = arr[index];
        index += 1;
        return toReturn;
    };
};
const test = `3
2
01
10
5
01100
10100
11000
00001
00010
6
010000
101000
010100
001000
000001
000010`.split('\n');
const gets = this.gets || getGets(test);
const print = this.print || console.log;
/* eslint-enable */

const n = +gets();

for (let k = 0; k < n; k += 1) {
    const dfs = (row) => {
        used.add(row);
        for (let j = 0; j < m; j += 1) {
            if (matrix[row][j] === 1) {
                connections += 1;
                if (!used.has(j)) {
                    blocks[blocks.length - 1] += 1;
                    dfs(j);
                }
            }
        }
    };
    const m = +gets();
    const matrix = Array.from({
        length: m,
    });

    matrix.forEach((_, index) => {
        matrix[index] = gets().split('').map(Number);
    });
    const used = new Set();

    const blocks = [];
    let connections = 0;
    for (let i = 0; i < m; i += 1) {
        if (!used.has(i)) {
            blocks.push(1);
            dfs(i);
        }
    }
    connections = connections / 2;
    let moves = -1;
    let isPossible = true;

    if (connections < m - 1) {
        isPossible = false;
    } else {
        blocks.forEach((block) => {
            if (block === 1) {
                isPossible = false;
                return;
            }
            moves += 1;
        });
    }
    if (isPossible) {
        print(moves);
    } else {
        print(-1);
    }
}