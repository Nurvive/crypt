import {generateCoprime, generateRandomPrime, getRandomInt} from '../utils.js';

class Client {
    constructor(N) {
        this.s = getRandomInt();
        this.V = this.s ** 2 % N;
        // this.r = getRandomInt(1, N - 1);
        this.r = 38177;
        this.N = N;
    }

    getX() {
        return this.r ** 2 % this.N;
    }

    getE(e) {
        this.e = e;
    }

    getY() {
        this.y = this.r * (this.s ** this.e) % this.N;
        return this.y;
    }
}

class Server {
    constructor() {
        // const q = generateRandomPrime(1);
        const q = 683;
        // const p = generateRandomPrime(1);
        const p = 811;
        this.N = p * q;
    }

    getX(x) {
        this.x = x;
    }

    getE() {
        this.e = getRandomInt(0, 2);
        return this.e;
    }

    check(y, V) {
        const check = (y ** 2 % this.N) === ((this.x * V ** this.e) % this.N);
        if (!check) {
            throw new Error('Обман');
        }
    }
}

const fs = (t = 1) => {
    for (let i = 0; i < t; i++) {
        const server = new Server();
        const user = new Client(server.N);
        server.getX(user.getX());
        user.getE(server.getE());
        server.check(user.getY(), user.V);
    }
};

fs(20);
