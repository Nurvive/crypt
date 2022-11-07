import {
    evclidGCD,
    pow,
} from '../lab1/index.js';

import {generateRandomBinary, isPrime, generateRandomPrime, generateCoprime, getRandomInt} from '../utils.js';

export const shamir = (m = 0) => {
    let p = generateRandomPrime(m + 1);
    const x = p - 1;
    let Ca = getRandomInt();
    while (evclidGCD(Ca, x).gcd !== 1) {
        Ca = getRandomInt();
    }
    let Da = evclidGCD(Ca, x).x;
    if (Da < 0) {
        Da += x;
    }
    let Cb = getRandomInt();
    while (evclidGCD(Cb, x).gcd !== 1) {
        Cb = getRandomInt();
    }
    let Db = evclidGCD(Cb, x).x;
    if (Db < 0) {
        Db += x;
    }
    Ca = BigInt(Ca);
    Cb = BigInt(Cb);
    Da = BigInt(Da);
    Db = BigInt(Db);
    p = BigInt(p);
    const x1 = pow(BigInt(m), Ca, p);
    const x2 = pow(x1, Cb, p);
    const x3 = pow(x2, Da, p);
    const x4 = pow(x3, Db, p);
    return {
        m,
        e: x3,
        m1: x4
    };
};

export const elGamal = (m = 0) => {
    let q = generateRandomPrime(m);
    let p = 2 * q + 1;
    while (!isPrime(p)) {
        q = generateRandomPrime(m);
        p = 2 * q + 1;
    }
    let g = getRandomInt(2, p - 2);
    while (pow(BigInt(g), BigInt(q), BigInt(p)) === 1n) {
        g = getRandomInt(2, p - 2);
    }
    g = BigInt(g);
    const Cb = BigInt(getRandomInt(2, p - 1));
    const k = BigInt(getRandomInt(2, p - 2));
    p = BigInt(p);
    const Db = pow(g, Cb, p);
    const r = pow(g, k, p);
    const e = (BigInt(m) * pow(Db, k, p)) % p;

    const m1 = (e * pow(r, (p - 1n - Cb), p)) % p;
    return {
        m, m1, e
    };
};

export const RSA = (m = 0) => {
    const q = generateRandomPrime(m + 1);
    const p = generateRandomPrime(m + 1);
    const N = p * q;
    const f = (p - 1) * (q - 1);
    let d = generateCoprime(f, 1, f - 1);
    let c = evclidGCD(d, f).y;
    if (c * d % f !== 1) {
        c = evclidGCD(d, f).y;
    }
    if (c < 0) {
        c += f
    }
    const e = pow(BigInt(m), BigInt(d), BigInt(N));
    const m1 = pow(BigInt(e), BigInt(c), BigInt(N));
    return {
        m, e, m1
    };
};

export const vernam = (m = 0) => {
    const message = m.toString(2).split('');
    const key = generateRandomBinary(message.length);
    const crypt = [];
    for (let i = 0; i < message.length; i++) {
        crypt.push(String(Number(message[i]) ^ Number(key[i])));
    }
    const decrypt = [];
    for (let i = 0; i < message.length; i++) {
        decrypt.push(String(Number(crypt[i]) ^ Number(key[i])));
    }
    const e = parseInt(crypt.join(''), 2);
    const m1 = parseInt(decrypt.join(''), 2);
    return {
        m, e, m1
    };
};
