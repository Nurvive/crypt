import {
    generateCoprime, generateRandomBigInt,
    generateRandomBinary,
    generateRandomPrime,
    getRandomInt,
    hashString,
    isPrime, isPrimeBig
} from '../utils.js';
import {bevclidGCD, evclidGCD, pow} from '../lab1/index.js';

export const signRSA = (m = '') => {
    const q = generateRandomPrime(1);
    const p = generateRandomPrime(1);
    let N = p * q;
    const f = (p - 1) * (q - 1);
    let d = generateCoprime(f, 1, f - 1);
    let c = evclidGCD(d, f).x;
    if (c * d % f !== 1) {
        c = evclidGCD(d, f).x;
    }
    if (c < 0) {
        c += f;
    }
    N = BigInt(N);
    c = BigInt(c);
    d = BigInt(d);
    const y = BigInt(hashString(String(m)));
    const s = pow(y, c, N);
    const message = {m, sign: s};
    const w = pow(s, d, N);
    return {w, message};
};

export const SignElGamal = (m) => {
    // const h = hashString(m);
    const h = 3;
    let q = generateRandomPrime(Math.floor(h / 2), 1000000000);
    let p = 2 * q + 1;
    // let p = 23;
    // let p = generateRandomPrime(Math.floor(h / 2), 1000000000);
    while (!isPrime(p)) {
        q = generateRandomPrime(Math.floor(h / 2), 1000000000);
        p = 2 * q + 1;
    }
    const _p = p - 1;
    // let g = 5;
    let g = getRandomInt(2, _p);
    while (pow(BigInt(g), BigInt(q), BigInt(p)) === 1n) {
        g = getRandomInt(2, _p);
    }
    const x = getRandomInt(1, _p);
    // const x = 7;
    const y = Number(pow(BigInt(g), BigInt(x), BigInt(p)));
    // const k = 5;
    let k = generateCoprime(_p, 1, _p);
    const r = Number(pow(BigInt(g), BigInt(k), BigInt(p)));
    let u = (h - x * r) % (_p);
    if (u < 0) {
        u += _p;
    }
    let _k = evclidGCD(k, _p).x;
    if (_k < 0) {
        _k += _p;
    }
    const s = _k * u % _p;
    const yr = Number(pow(BigInt(y), BigInt(r), BigInt(p)));
    const rs = Number(pow(BigInt(r), BigInt(s), BigInt(p)));
    console.log((yr * rs % p) === Number(pow(BigInt(g), BigInt(h), BigInt(p))));
    return {m, r, s, y};
};

export const gost = (m = '') => {
    let q = BigInt('0b' + generateRandomBinary(256).join(''));
    while (!isPrimeBig(q)) {
        console.log(q);
        q = BigInt('0b' + generateRandomBinary(256).join(''));
    }
    let p = BigInt('0b' + generateRandomBinary(1024).join(''));
    let b = (p - 1n) / q;
    if (!Number.isInteger(b)) {
        q = BigInt('0b' + generateRandomBinary(256).join(''));
        p = BigInt('0b' + generateRandomBinary(1024).join(''));
    }
    let a = generateRandomBigInt(1n, q);
    while (pow(a, q, p) !== 1n) {
        a = generateRandomBigInt(1n, q);
    }
    const x = BigInt(getRandomInt(1));
    const y = pow(a, x, p);
    const h = BigInt(hashString(String(m)));
    let k = BigInt(getRandomInt());
    let r = pow(a, k, p) % q;
    let s = (k * h + x * r) % q;
    while (r === 0n || s === 0n) {
        k = BigInt(getRandomInt());
        r = pow(a, k, p) % q;
        s = (k * h + x * r) % q;
    }
    if (r <= 0 || r >= q || s <= 0 || s >= q) {
        console.log('1 false');
    }
    let _h = bevclidGCD(h, q).x
    while (bevclidGCD(h, q).gcd !== 1n) {
        _h = bevclidGCD(h, q).x
    }
    const u1 = s * _h % q;
    const u2 = -r * _h % q;
    const au1 = pow(a, u1, p);
    const yu2 = pow(a, u2, p);
    const u = au1 * yu2 % p % q;
    console.log(u === r);
    return {m, r, s};
};
