const getGets = (arr) => {
    let index = 0;
    return () => {
        const toReturn = arr[index];
        index += 1;
        return toReturn;
    };
};
const test = `5
5
Q---Q
-----
-B---
--R--
Q---Q
10
a1 a1
a1 d4
e1 b4
a5 d2
e5 b2
b3 d5
b3 a2
b3 d1
b3 a4
c2 c5`.split('\n');
/* eslint-disable */
const gets = this.gets || getGets(test);
const print = this.print || console.log;
/* eslint-enable */

const r = +gets();
const c = +gets();

const matrix = Array.from({
    length: r,
});
matrix.forEach((_, index) => {
    const row = gets().split('');
    matrix[r - 1 - index] = row;
});
const moveInDirection = (row, col, moveRow, moveCol, endRow, endCol) => {
    const exp = true;
    while (exp) {
        row = row + moveRow;
        col = col + moveCol;
        if (row >= r || col >= c ||
            row < 0 || col < 0 ||
            matrix[row][col] !== '-') {
            return false;
        }
        if (row === endRow && col === endCol) {
            return true;
        }
    }
    return false;
};
const checkQueenMovement = (R, C, endR, endC) => {
    if (R < endR && C === endC) {
        return moveInDirection(R, C, 1, 0, endR, endC);
    }
    if (R < endR && C > endC) {
        return moveInDirection(R, C, 1, -1, endR, endC);
    }
    if (R < endR && C < endC) {
        return moveInDirection(R, C, 1, 1, endR, endC);
    }
    if (R > endR && C > endC) {
        return moveInDirection(R, C, -1, -1, endR, endC);
    }
    if (R > endR && C === endC) {
        return moveInDirection(R, C, -1, 0, endR, endC);
    }
    if (R > endR && C < endC) {
        return moveInDirection(R, C, -1, 1, endR, endC);
    }
    if (R === endR && C > endC) {
        return moveInDirection(R, C, 0, -1, endR, endC);
    }
    if (R === endR && C < endC) {
        return moveInDirection(R, C, 0, 1, endR, endC);
    }
    return false;
};
const checkBishopMovement = (R, C, endR, endC) => {
    if (R === endR || C === endC) {
        return false;
    } else if (R > endR && C > endC) {
        return moveInDirection(R, C, -1, -1, endR, endC);
    } else if (R < endR && C < endC) {
        return moveInDirection(R, C, 1, 1, endR, endC);
    } else if (R < endR && C > endC) {
        return moveInDirection(R, C, 1, -1, endR, endC);
    } else if (R > endR && C < endC) {
        return moveInDirection(R, C, -1, 1, endR, endC);
    }
    return false;
};
const checkRookMovement = (R, C, endR, endC) => {
    if (C === endC) {
        if (R < endR) {
            return moveInDirection(R, C, 1, 0, endR, endC);
        } else if (R > endR) {
            return moveInDirection(R, C, -1, 0, endR, endC);
        }
        return false;
    }
    if (R !== endR) {
        return false;
    } else if (C < endC) {
        return moveInDirection(R, C, 0, 1, endR, endC);
    }
    return moveInDirection(R, C, 0, -1, endR, endC);
};
const findMove = (R, C, endR, endC) => {
    const piece = matrix[R][C];
    if (piece === 'Q') {
        return checkQueenMovement(R, C, endR, endC);
    }
    if (piece === 'B') {
        return checkBishopMovement(R, C, endR, endC);
    }
    if (piece === 'R') {
        return checkRookMovement(R, C, endR, endC);
    }
    return false;
};

const t = +gets();
for (let i = 0; i < t; i += 1) {
    const [start, end] = gets()
        .split(' ')
        .map((coordinate) => {
            return {
                R: +coordinate[1] - 1,
                C: coordinate.charCodeAt(0) - 97,
            };
        });
    const isPossible = findMove(start.R, start.C, end.R, end.C);
    if (isPossible) {
        print('yes');
    } else {
        print('no');
    }
}