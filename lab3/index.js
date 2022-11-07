import {generateCoprime, generateRandomPrime, getRandomInt, hashString, isPrime} from '../utils.js';
import {evclidGCD, pow} from '../lab1/index.js';

export const signRSA = (m = '') => {
    const q = generateRandomPrime(1);
    const p = generateRandomPrime(1);
    let N = p * q;
    const f = (p - 1) * (q - 1);
    let d = generateCoprime(f, 1, f - 1);
    let c = evclidGCD(d, f).y;
    if (c * d % f !== 1) {
        c = evclidGCD(d, f).y;
    }
    if (c < 0) {
        c += f;
    }
    N = BigInt(N);
    c = BigInt(c);
    d = BigInt(d);
    const y = BigInt(hashString(m));
    console.log(y);
    const s = pow(y, c, N);
    const message = {m, sign: s};
    const w = pow(s, d, N);
    return {w, message};
};

export const SignElGamal = (m) => {
    const h = hashString(m);
    let q = generateRandomPrime(h / 2, 1000000000);
    let p = 23
    // let p = 2 * q + 1;
    // while (!isPrime(p)) {
    //     q = generateRandomPrime(h / 2, 1000000000);
    //     p = 2 * q + 1;
    // }
    const _p = p - 1;
    let g = getRandomInt(2, _p);
    while (pow(BigInt(g), BigInt(q), BigInt(p)) === 1n) {
        g = getRandomInt(2, _p);
    }
    const x = getRandomInt(1, _p);
    const y = Number(pow(BigInt(g), BigInt(x), BigInt(p)));
    // let k = 5;
    let k = getRandomInt(1, _p);
    while (evclidGCD(k, _p).gcd !== 1) {
        k = getRandomInt(1, _p);
    }
    console.log(k,p);
    console.log(evclidGCD(k, _p));
    const r = Number(pow(BigInt(g), BigInt(k), BigInt(p)));
    let u = (h - x * r) % (_p);
    if (u < 0) {
        u += _p
    }
    let _k = evclidGCD(k, _p).x;
    if (_k < 0) {
        _k += _p;
    }
    console.log(evclidGCD(k, _p).x * k + evclidGCD(k, _p).y * _p);
    const s = _k * u % _p;
    const yr = Number(pow(BigInt(y), BigInt(r), BigInt(p)));
    const rs = Number(pow(BigInt(r), BigInt(s), BigInt(p)));
    console.log((yr * rs % p) === Number(pow(BigInt(g), BigInt(h), BigInt(p))));
    return {m, r, s, sign: y};
};

export const gost = (m) => {
    
}
