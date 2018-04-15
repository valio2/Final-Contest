/* eslint-disable */
const getGets = (arr) => {
    let index = 0;
    return () => {
        const toReturn = arr[index];
        index += 1;
        return toReturn;
    };
};
// const test = `2 < 14`.split('\n');
const test = `7 <=>>=< 23`.split('\n');
const gets = this.gets || getGets(test);
const print = this.print || console.log;
/* eslint-enable */

const [passLen, moves, k] = gets().split(' ').map((x) => {
    if (isNaN(x)) {
        return '>' + x;
    }
    return +x;
});
// const passLen = +gets();
// const moves = '>' + gets();
// const k = +gets();

const findPossiblePasswords = (number, exp, index) => {
    if (key) {
        return;
    }

    if (index === passLen) {
        combinations += 1;
        if (combinations === k) {
            print(exp);
            key = true;
        }
        return;
    }

    const dir = moves[index];
    if (dir === '=') {
        findPossiblePasswords(number, exp + number, index + 1);
    } else if (dir === '>') {
        if (number === 0) {
            return;
        }
        if (index !== 0) {
            findPossiblePasswords(0, exp + '0', index + 1);
        }
        for (let i = number + 1; i < 10; i += 1) {
            findPossiblePasswords(i, exp + i, index + 1);
        }
    } else if (dir === '<') {
        let end;

        if (number === 0) {
            end = 10;
        } else {
            end = number;
        }

        for (let i = 1; i < end; i += 1) {
            findPossiblePasswords(i, exp + i, index + 1);
        }
    }
};

let combinations = 0;
let key = false;

findPossiblePasswords(-1, '', 0);