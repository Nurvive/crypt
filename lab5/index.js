import {generateCoprime, generateRandomPrime, getRandomInt, hashString} from '../utils.js';
import {evclidGCD, pow} from '../lab1/index.js';
// import * as readline from 'readline';
// import {stdin as input, stdout as output} from 'node:process';

class Server {
    constructor() {
        this.q = generateRandomPrime(1);
        this.p = generateRandomPrime(1);
        this.N = BigInt(this.q * this.p);
        const f = (this.q - 1) * (this.p - 1);
        this.d = generateCoprime(f, 1, (f - 1));
        this.c = evclidGCD(this.d, f).x;
        if (this.c * this.d % f !== 1) {
            this.c = evclidGCD(this.d, f).x;
        }
        if (this.c < 0) {
            this.c += f;
        }
        this.c = BigInt(this.c);
        this.safe = [];
        this.bulls = []
    }

    vote(_h, name) {
        this.safe.push({name, _h})
        return pow(BigInt(_h), this.c, this.N);
    }

    check(bull) {
        const hash = hashString(String(bull.n));
        console.log(hash, pow(BigInt(bull.s), BigInt(this.d), this.N))
        if (BigInt(hash) === pow(BigInt(bull.s), BigInt(this.d), this.N)) {
            this.bulls.push(bull);
            console.log('successful')
        }
    }
}

class User {
    constructor(name) {
        this.rnd = getRandomInt();
        this.name = name;
    }

    getR(N) {
        this.r = generateCoprime(Number(N));
    }

    getN(answer, N, d) {
        this.n = String(this.rnd) + answer;
        this.hash = BigInt(hashString(String(this.n)));
        const hN = this.hash % N;
        const rdN = pow(BigInt(this.r), BigInt(d), N)
        this._h = (hN * rdN) % N;
    }

    getSign(_s, N) {
        let _r = evclidGCD(this.r, Number(N)).x;
        if (_r < 0) {
            _r += Number(N);
        }
        const s = _s * BigInt(_r) % N;
        return {n: this.n, s}
    }
}


const lab5 = () => {
    const q = generateRandomPrime(1);
    const p = generateRandomPrime(1);
    const N = BigInt(p * q);
    const f = (p - 1) * (q - 1);
    let d = generateCoprime(f, 1, (f - 1));
    let c = evclidGCD(d, f).x;
    if (c * d % f !== 1) {
        c = evclidGCD(d, f).x;
    }
    if (c < 0) {
        c += f;
    }
    c = BigInt(c);
    // const server = new Server();
    // const alice = new User();
    // alice.getR(server.N);
    const rnd = getRandomInt();
    // const rl = readline.createInterface({input, output});
    const answer = '1';
    // alice.getN(answer, server.N, server.d);
    // rl.question('1 || 0 ', (answer) => {
    const n = Number(String(rnd) + answer);
    const r = generateCoprime(Number(N));
    const hash = BigInt(hashString(String(n)));
    const hN = hash % N;
    const rdN = pow(BigInt(r), BigInt(d), N)
    const _h = (hN * rdN) % BigInt(N);
    // const _s = server.vote(alice._h, 'alice')
    // const bull = alice.getSign(_s, server.N);
    // server.check(bull);
    const _s = pow(BigInt(_h), c, BigInt(N));
    const _r = evclidGCD(r, Number(N)).x;
    const s = _s * BigInt(_r) % BigInt(N);
    const bull = {n, s};
    console.log(hash, pow(BigInt(s), BigInt(d), BigInt(N)));
    console.log(hash === pow(BigInt(s), BigInt(d), BigInt(N)));
    // rl.close();
    // });
};
// void lab5();

const x = () => {
    const server = new Server();
    const alice = new User('alice');
    alice.getR(server.N);
    const answer = '1';
    alice.getN(answer, server.N, server.d);
    const _s = server.vote(alice._h, alice.name)
    const bull = alice.getSign(_s, server.N);
    server.check(bull);
}

x()