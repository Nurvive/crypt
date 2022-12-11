import {generateCoprime, generateRandomPrime, getRandomInt, hashString} from '../utils.js';
import {evclidGCD, pow} from '../lab1/index.js';
import * as readline from 'readline';
import {stdin as input, stdout as output} from 'node:process';


const lab5 = () => {
    const q = generateRandomPrime(1);
    const p = generateRandomPrime(1);
    const N =BigInt(p * q);
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
    const rnd = getRandomInt();
    // const rl = readline.createInterface({input, output});
    const answer = '1';
    // rl.question('1 || 0 ', (answer) => {
    const n = Number(String(rnd) + answer);
    const r = generateCoprime(Number(N));
    const hash = BigInt(hashString(String(n)));
    const hN = hash % N;
    const rdN = pow(BigInt(r), BigInt(d), N)
    const _h = (hN * rdN) % BigInt(N); //TODO
    const _s = pow(BigInt(_h), c, BigInt(N));
    const _r = generateCoprime(r);
    const s = _s * BigInt(_r) % BigInt(N);
    const bull = {n, s};
    console.log(hash, pow(BigInt(s), BigInt(d), BigInt(N)));
    console.log(hash === pow(BigInt(s), BigInt(d), BigInt(N)));
    // rl.close();
    // });
};

void lab5();
