const obj = {
    a1: 1,
    a2: 2,
    a3: 3,
};

console.log(JSON.stringify(obj).replace(/[^\:]/g, '').length);