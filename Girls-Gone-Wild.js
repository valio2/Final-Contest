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
baca
2`.split('\n');
const gets = this.gets || getGets(test);
const print = this.print || console.log;
/* eslint-enable */

const shirts = +gets();
const skirts = gets().split('').sort((a, b) => a > b);
const girls = +gets();

const generateShirtCombinations = (index, combination) => {
    if (index === girls) {
        allShirtCombinations.push([...combination]);
        return;
    }

    const start = index ? combination[index - 1] + 1 : 0;
    for (let i = start; i < shirts; i += 1) {
        combination[index] = i;
        generateShirtCombinations(index + 1,
            combination);
    }
};

const generateSkirtCombinations = (index, combination) => {
    if (index === girls) {
        const comb = combination.join(' ');
        if (!globalUsed.has(comb)) {
            globalUsed.add(comb);
            allSkirtCombinations.push([...combination]);
        }
        return;
    }

    for (let i = 0; i < skirts.length; i += 1) {
        if (!used.has(i)) {
            combination[index] = skirts[i];
            used.add(i);
            generateSkirtCombinations(index + 1,
                combination);
            used.delete(i);
        }
    }
};

const allShirtCombinations = [];
generateShirtCombinations(0, []);

const globalUsed = new Set();
const used = new Set();

const allSkirtCombinations = [];
generateSkirtCombinations(0, []);


const finalCombinations = [];
for (let j = 0; j < allSkirtCombinations.length; j += 1) {
    for (let i = 0; i < allShirtCombinations.length; i += 1) {
        let comb = [];
        for (let k = 0; k < girls; k += 1) {
            comb.push(allShirtCombinations[i][k] + allSkirtCombinations[j][k]);
        }
        comb = comb.join('-');
        if (!used.has(comb)) {
            used.add(comb);
            finalCombinations.push(comb);
        }
    }
}
print(finalCombinations.length);

print(finalCombinations.sort((a, b) => {
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] < b[i]) {
            return -1;
        } else if (a[i] > b[i]) {
            return 1;
        }
    }
    return 0;
}).join('\n'));