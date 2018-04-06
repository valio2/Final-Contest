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
        const prev = next.prev || null;
        if (prev) {
            prev.next = node;
        }
        if (next) {
            next.prev = node;
        }
        node.next = next;
        node.prev = prev;
    }
}

const [n, m] = gets().split(' ').map(Number);
const numbers = {};
const arr = gets().split(' ');
arr.forEach((name, index) => {
    arr[index] = new Node(name, arr[index - 1]);
    numbers[name] = index;
});
let left = arr[0];
for (let i = 0; i < m; i += 1) {
    const [first, second] = gets()
        .split(' ')
        .map((name) => numbers[name]);
    const element = arr[first];
    const next = arr[second];
    if (!element.prev && next !== element.next) {
        left = element.next;
    } else if (!next.prev) {
        left = element;
    }
    Node.detach(element);
    Node.attach(element, next);
}
print([...left].join(' '));