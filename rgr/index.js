import {generateRandomPrime, getRandomInt, hashString} from '../utils.js';

class Client {
    constructor(N, name, s) {
        this.s = hashString(String(s));
        this.V = this.s ** 2 % N;
        this.r = getRandomInt(1, N - 1);
        this.N = N;
        this.name = name
    }

    getX() {
        return this.r ** 2 % this.N;
    }

    getE(e) {
        this.e = e;
    }

    getY() {
        this.y = (this.r * (this.s ** this.e));
        return this.y;
    }
}

class Server {
    constructor() {
        const q = generateRandomPrime(1);
        const p = generateRandomPrime(1);
        this.N = p * q;
        this.bd = [];
    }

    getX(x) {
        this.x = x;
    }

    getE() {
        this.e = getRandomInt(0, 2);
        return this.e;
    }

    checkBd(name, V) {
        const nameInBd = this.bd.some(mem => name === mem.name);
        if (nameInBd) {
            return true
        } else {
            this.bd.push({name, V})
            return false;
        }
    }

    check(y, V, name) {
        if (this.checkBd(name, V)) {
            const check = (y ** 2 % this.N) === ((this.x * V ** this.e) % this.N);
            if (!check) {
                throw new Error('Обман');
            }
        }
    }
}

const fs = (t = 1) => {
    const server = new Server();
    const user = new Client(server.N, 'alice', 12345);
    server.getX(user.getX());
    user.getE(server.getE());
    server.check(user.getY(), user.V, user.name);
    const badGuy = new Client(server.N, 'alice', 32141);

    for (let i = 0; i < t; i++) {
        server.getX(badGuy.getX());
        badGuy.getE(server.getE());
        server.check(badGuy.getY(), badGuy.V, badGuy.name);
    }
};

fs(20);
