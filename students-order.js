/* globals Symbol Map*/
/* eslint-disable */
const getGets = (arr) => {
    let index = 0;
    return () => {
        const toReturn = arr[index];
        index += 1;
        return toReturn;
    };
};
const test = `5 3
Gosho Tosho Penka Miro Stanka
Miro Gosho
Gosho Stanka
Stanka Miro`.split('\n');
const gets = this.gets || getGets(test);
const print = this.print || console.log;
/* eslint-enable */

class Node {
    constructor(value, prev) {
        this.value = value;
        this.next = null;
        this.prev = prev || null;

        if (prev) {
            prev.next = this;
        }
    }

    *[Symbol.iterator]() {
        let current = this;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }

    static detach(node) {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        node.next = null;
        node.prev = null;
    }

    static attach(node, next) {
        // const prev = next.prev || null;

        // if (prev) {
        //     prev.next = node;
        // }

        // next.prev = node;
        // node.next = next;
        // node.prev = prev;
        if (next.prev) {
            node.next = next;
            node.prev = next.prev;
            node.prev.next = node;
            node.next.prev = node;
        } else {
            node.next = next;
            node.next.prev = node;
            node.prev = null;
        }
    }
}
/* eslint-disable */
const [n, m] = gets().split(' ').map(Number);
/* eslint-enable */
const numbers = new Map();
const arr = gets().split(' ');
arr.forEach((name, index) => {
    arr[index] = new Node(name, arr[index - 1]);
    numbers.set(name, index);
});
let left = arr[0];
for (let i = 0; i < m; i += 1) {
    const [first, second] = gets()
        .split(' ')
        .map((name) => numbers.get(name));
    const element = arr[first];
    const next = arr[second];
    if (next === element.next) {
        continue;
    }
    if (!element.prev) {
        left = element.next;
    } else if (!next.prev) {
        left = element;
    }
    Node.detach(element);
    Node.attach(element, next);
}
print([...left].join(' '));
