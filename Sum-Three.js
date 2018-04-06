const getGets = (arr) => {
    let index = 0;
    return () => {
        const toReturn = arr[index];
        index += 1;
        return toReturn;
    };
};
const test = `3 3
4
UR 22
DL 2
DR 8
UL 75`.split('\n');
/* eslint-disable */
const gets = this.gets || getGets(test);
const print = this.print || console.log;
/* eslint-enable */

const [r, c] = gets().split(' ').map(Number);

const matrix = [];
for (let i = r - 1; i >= 0; i -= 1) {
    const row = Array.from({
        length: c,
    });
    row.forEach((_, index) => {
        row[index] = ((r - 1 - matrix.length) * 3) + (index * 3);
    });
    matrix.push(row);
}

const moveInDirection = (row, col, moveRow, moveCol, times) => {
    for (let j = 0; j < times; j += 1) {
        row = row + moveRow;
        col = col + moveCol;
        if (row >= r || col >= c ||
            row < 0 || col < 0) {
            startRow = row - moveRow;
            startCol = col - moveCol;
            return;
        }
        maxSum += matrix[row][col];
        matrix[row][col] = 0;
    }
    startRow = row;
    startCol = col;
};

const moves = +gets();
let maxSum = 0;
let startRow = r - 1;
let startCol = 0;
for (let i = 0; i < moves; i += 1) {
    const [move, times] = gets().split(' ').map((x) => {
        if (!isNaN(x)) {
            return +x;
        }
        return x;
    });

    if (move === 'UR' || move === 'RU') {
        moveInDirection(startRow, startCol, -1, 1, times - 1);
    } else if (move === 'RD' || move === 'DR') {
        moveInDirection(startRow, startCol, 1, 1, times - 1);
    } else if (move === 'UL' || move === 'LU') {
        moveInDirection(startRow, startCol, -1, -1, times - 1);
    } else if (move === 'DL' || move === 'LD') {
        moveInDirection(startRow, startCol, 1, -1, times - 1);
    }
}
print(maxSum);