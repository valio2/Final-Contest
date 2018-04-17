/* eslint-disable */
const getGets = (arr) => {
    let index = 0;
    return () => {
        const toReturn = arr[index];
        index += 1;
        return toReturn;
    };
};
const test = `0 0
5 6
1 # 5 4 6 4
3 2 # 2 6 2
9 1 7 6 3 1
8 2 7 3 8 6
3 6 1 3 1 2`.split('\n');
const gets = this.gets || getGets(test);
const print = this.print || console.log;
/* eslint-enable */

const [startRow, startCol] = gets().split(' ').map(Number);
const [n, m] = gets().split(' ').map(Number);

const matrix = Array.from({
    length: n,
}).map((row) => gets().split(' ')
    .map((x) => {
        if (!isNaN(x)) {
            return +x;
        }
        return x;
    }));

let maxPower = Number.MIN_SAFE_INTEGER;
const getMaxPower = (row, col, currentPower) => {
    if (currentPower > maxPower) {
        maxPower = currentPower;
    }

    const power = matrix[row][col];
    matrix[row][col] = 0;

    if (power !== 0) {
        if (row + power < n && matrix[row + power][col] !== '#') {
            getMaxPower(row + power, col, currentPower + power);
        }
        if (row - power >= 0 && matrix[row - power][col] !== '#') {
            getMaxPower(row - power, col, currentPower + power);
        }
        if (col + power < m && matrix[row][col + power] !== '#') {
            getMaxPower(row, col + power, currentPower + power);
        }
        if (col - power >= 0 && matrix[row][col - power] !== '#') {
            getMaxPower(row, col - power, currentPower + power);
        }
    }
    matrix[row][col] = power;
};
getMaxPower(startRow, startCol, 0);
print(maxPower);