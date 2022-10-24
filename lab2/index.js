import {
    evclidGCD,
    pow,
} from '../lab1/index.js';

import {generateRandomBinary, isPrime, generateRandomPrime, generateCoprime, getRandomInt} from '../lab1/utils.js';

export const shamir = (m = 0) => {
    // const q = generateRandomPrime(m);
    // let p = 2 * q + 1;
    //
    // while (!isPrime(p)) {
    //     p = 2 * generateRandomPrime(m) + 1;
    // }
    //
    let p = 23; // TODO Не пашет

    // let p = generateRandomPrime(m + 1);
    const x = p - 1;
    let Ca = getRandomInt();
    while (evclidGCD(Ca, x).gcd !== 1) {
        Ca = getRandomInt();
    }
    let Da = evclidGCD(Ca, x).x;
    let Cb = getRandomInt();
    while (evclidGCD(Cb, x).gcd !== 1) {
        Cb = getRandomInt();
    }
    let Db = evclidGCD(Cb, x).x;
    Ca = BigInt(Ca);
    Cb = BigInt(Cb);
    Da = BigInt(Da);
    Db = BigInt(Db);
    p = BigInt(p);
    const x1 = pow(BigInt(m), Ca, p);
    // const x2 = pow(x1, Cb, p);
    // const x3 = pow(x2, Da, p);
    // const x4 = pow(x3, Db, p);
    //
    // return {
    //     m,
    //     x4
    // };
};

export const elGamal = (m = 0) => {
    let q = generateRandomPrime();
    let p = 2 * q + 1;
    while (!isPrime(p)) {
        q = generateRandomPrime();
        p = 2 * q + 1;
    }
    let g = getRandomInt(2, p - 2);
    while (pow(BigInt(g), BigInt(q), BigInt(p)) === 1n) {
        g = getRandomInt(2, p - 2);
    }
    g = BigInt(g);
    const x = BigInt(getRandomInt(2, p - 1));
    const k = BigInt(getRandomInt(2, p - 2));
    p = BigInt(p);
    const y = pow(g, x, p);
    const a = pow(g, k, p);
    const b = (BigInt(m) * pow(y, k, p)) % p;
    const m1 = (b * pow(a, (p - 1n - x), p)) % p;
    return {
        m, m1
    };
};

export const RSA = (m = 0) => {
    const q = 11; // TODO Не пашет
    // const q = generateRandomPrime(m + 1);
    const p = generateRandomPrime(2);
    // let p = 3;
    const N = p * q;
    const f = (p - 1) * (q - 1);
    let d = generateCoprime(f, 1, f)
    let c = evclidGCD(d, f).y;
    if (c * d % f !== 1) {
        c = evclidGCD(d, f).x
    }
    console.log(c);
    console.log(c * d % f);
    const e = pow(BigInt(m), BigInt(d), BigInt(N));
    const m1 = pow(BigInt(e), BigInt(c), BigInt(N));
    return {
        m, m1
    };
};

export const verner = (m = 0) => {
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
    const m1 = parseInt(decrypt.join(''), 2);
    return {
        m, m1
    };
};
