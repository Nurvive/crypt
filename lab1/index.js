import {degreesTwo, generateRandomPrime, getRandomInt, isPrime, generateI, generateJ} from '../utils.js';

export const pow = (base = 1n, power = 0n, module = 2n) => {
    if (base < 0 || power < 0 || module <= 0) {
        throw new Error('Negative numbers and module=0 are not supported');
    }
    if (module === 1n) {
        return 0n;
    }
    let y = 1n;
    while (power !== 0n) {
        if ((power & 1n) === 1n) {
            y = (y * base) % module;
        }
        base = (base * base) % module;
        power >>= 1n;
    }
    return y;
};

export const evclidGCD = (a = 1, b = 1) => {
    let U = [a, 1, 0];
    let V = [b, 0, 1];
    let T = [];
    let q = 0;
    while (V[0] > 0) {
        q = Math.floor(U[0] / V[0]);
        T = [U[0] % V[0], U[1] - q * V[1], U[2] - q * V[2]];
        U = V;
        V = T;
    }
    return {gcd: U[0], x: U[1], y: U[2]};
};
export const bevclidGCD = (a = 1n, b = 1n) => {
    let U = [a, 1n, 0n];
    let V = [b, 0n, 1n];
    let T = [];
    let q = 0n;
    while (V[0] > 0n) {
        q = Math.floor(U[0] / V[0]);
        T = [U[0] % V[0], U[1] - q * V[1], U[2] - q * V[2]];
        U = V;
        V = T;
    }
    return {gcd: U[0], x: U[1], y: U[2]};
};

export const defHell = () => {
    let q = generateRandomPrime();
    let p = 2 * q + 1;
    while (!isPrime(p)) {
        q = generateRandomPrime();
        p = 2 * q + 1;
    }
    let g = getRandomInt();
    while (1 >= g || g >= p - 1 || pow(BigInt(g), BigInt(q), BigInt(p)) === 1n) {
        g = getRandomInt();
    }
    g = BigInt(g);
    p = BigInt(p);
    let XA = BigInt(getRandomInt());
    let XB = BigInt(getRandomInt());
    while (!(1 <= XA && XA < p && 1 <= XB && XA < p)) {
        XA = BigInt(getRandomInt());
        XB = BigInt(getRandomInt());
    }
    const YA = pow(g, XA, p);
    const YB = pow(g, XB, p);
    const ZAB = pow(YB, XA, p);
    const ZBA = pow(YA, XB, p);

    if (ZAB === ZBA) {
        return ZAB;
    }
    return false;
};

export const bigSmall = (a, p, y) => {
    const m = Math.floor(Math.sqrt(p)) + 1;
    const k = m;
    const is = generateI(a, m, y, p);
    const js = generateJ(a, m, k, p);
    let result = {};
    for (let i = 0; i < m; i++) {
        if (is[i].value === js[i].value) {
            result.i = is[i].i;
            result.j = js[i].j;
            return result.j * m - result.i;
        }
    }
    return result;
};

