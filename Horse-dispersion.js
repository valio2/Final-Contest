/* globals Map */
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
class ListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
class Queue {
    constructor() {
        this._first = null;
        this._last = null;
        this._length = 0;
    }

    append(element) {
        const newNode = new ListNode(element);
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

    shift() {
        const element = this._first.value;
        this._first = this._first.next;

        this._length -= 1;

        return element;
    }

    isEmpty() {
        if (this._length > 0) {
            return false;
        }
        return true;
    }
}

const n = +gets();
const m = +gets();
const startR = +gets();
const startC = +gets();
const matrix = Array.from({
    length: n,
});
matrix.forEach((_, index) => {
    matrix[index] = Array.from({
        length: m,
    }).fill(0);
});
matrix[startR][startC] = 1;

const leftColMovements = [-1, -2, -1, -2];
const rightColMovements = [1, 2, 1, 2];
const rowMovements = [-2, -1, 2, 1];

const checkAllHorseMoves = (r, c, turnNumber) => {
    for (let i = 0; i < rowMovements.length; i += 1) {
        const newR = r + rowMovements[i];
        let newC;
        if (c > colToPrint) {
            newC = c + leftColMovements[i];
        } else {
            newC = c + rightColMovements[i];
        }

        const newTurnNumber = turnNumber + 1;
        if (newR >= 0 && newR < n &&
            newC >= 0 && newC < m &&
            matrix[newR][newC] === 0) {
            matrix[newR][newC] = newTurnNumber;
            const cell = [newR, newC, newTurnNumber];
            queue.append(cell);

            if (newC === colToPrint) {
                used.set(newR, newTurnNumber);
                if (used.size === n) {
                    throw new Error;
                }
            }
        }
    }
};
const queue = new Queue();
queue.append([startR, startC, 1]);
const colToPrint = Math.floor(m / 2);
const used = new Map();
try {
    while (!queue.isEmpty()) {
        const newCell = queue.shift();
        checkAllHorseMoves(newCell[0], newCell[1], newCell[2]);
    }
} catch (error) {
    for (let i = 0; i < n; i += 1) {
        print(used.get(i));
    }
}

// implementirai linked list, ako nai malkiqt row e po golqm ot r etc..
// trqbva da e kato swappings sus masiv ot node-ove