const generateShirtCombinations = (index, combination) => {
    if (index === girls) {
        allShirtCombinations.push(combination.join(' '));
        return;
    }
    const start = index ? combination[index - 1] + 1 : 0;
    for (let i = start; i < shirts; i += 1) {
        combination[index] = i;
        generateShirtCombinations(index + 1,
            combination);
    }
};

const shirts = 3;
const girls = 2;
const allShirtCombinations = [];

generateShirtCombinations(0, []);

allShirtCombinations.forEach((comb) => console.log(comb));