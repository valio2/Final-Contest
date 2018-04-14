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

class Queue {
    constructor() {
        this._first = null;
        this._last = null;
        this._length = 0;
    }

    queue(element) {
        // const newNode = new ListNode(element);
        const newNode = {
            value: element,
            next: null,
        };
        if (this._first === null) {
            this._first = newNode;
            this._last = newNode;
        } else {
            this._last.next = newNode;
            this._last = newNode;
        }

        this._length += 1;

        return this;
    }

    dequeue() {
        const element = this._first.value;
        this._first = this._first.next;

        this._length -= 1;

        return element;
    }

    isEmpty() {
        return !this._length;
    }
}

const n = +gets();
const m = +gets();
const startR = +gets();
const startC = +gets();

const matrix = [];
for (let i = 0; i < n; i += 1) {
    matrix[i] = {};
}
matrix[startR][startC] = 1;

const colMovements = [1, 2, 1, 2];
const rowMovements = [-2, -1, 2, 1];

const checkAllHorseMoves = (r, c, turnNumber) => {
    for (let i = 0; i < rowMovements.length; i += 1) {
        const newR = r + rowMovements[i];
        const newC =
            (c > colToPrint) ? c - colMovements[i] : c + colMovements[i];

        if (newR >= 0 && newR < n &&
            newC >= 0 && newC < m &&
            !matrix[newR][newC]) {
            const newTurnNumber = turnNumber + 1;

            matrix[newR][newC] = newTurnNumber;

            queue.queue([newR, newC, newTurnNumber]);

            if (newC === colToPrint) {
                // toPrint[newR] = newTurnNumber;
                used -= 1;
                if (used === 0) {
                    return true;
                }
            }
        }
    }
    return false;
};
const queue = new Queue();
queue.queue([startR, startC, 1]);

const colToPrint = Math.floor(m / 2);

let used = n;
// const toPrint = [];

while (!queue.isEmpty()) {
    const newCell = queue.dequeue();
    if (checkAllHorseMoves(newCell[0], newCell[1], newCell[2])) {
        break;
    }
}
// print(toPrint.join('\n'));
for (let i = 0; i < n; i += 1) {
    print(matrix[i][colToPrint]);
}