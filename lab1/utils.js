import {evclidGCD, pow} from './index.js';

export const degreesTwo = (value) => {
    const result = [];
    value.split('').reverse().forEach((item, index) => {
        if (Number(item) > 0) {
            result.push(BigInt(index));
        }
    });
    return result;
};


export const generateCoprime = (p, min = 0, max = 1000000000) => {
    let result = generateRandomPrime(min, max);
    while (evclidGCD(result, p).gcd !== 1) {
        result = generateRandomPrime(min, max);
    }
    return result;
};

function generateRandomBigInt(lowBigInt = 0n, highBigInt = 1000000000n) {
    if (lowBigInt >= highBigInt) {
        throw new Error('lowBigInt must be smaller than highBigInt');
    }

    const difference = highBigInt - lowBigInt;
    const differenceLength = difference.toString().length;
    let multiplier = '';
    while (multiplier.length < differenceLength) {
        multiplier += Math.random()
            .toString()
            .split('.')[1];
    }
    multiplier = multiplier.slice(0, differenceLength);
    const divisor = '1' + '0'.repeat(differenceLength);

    const randomDifference = (difference * BigInt(multiplier)) / BigInt(divisor);

    return lowBigInt + randomDifference;
}

const isPrimeBig = (n) => {
    for (let i = 2n; i < n; i++) {
        if (n % i === 0n) {
            return false;
        }
    }
    return true;
};

export const generateRandomBinary = (length) => {
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(String(Math.round(Math.random())));
    }
    return result;
};

export const isPrime = (n) => {
    for (let i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};


export const generateRandomPrime = (min = 0, max = 1000000000) => {
    let q = getRandomInt(min, max);
    while (!isPrime(q)) {
        q = getRandomInt(min, max);
    }
    return q;
};

export const generateI = (a, m, y, p) => {
    const result = [];
    for (let i = 1; i <= m - 1; i++) {
        result.push({
            i,
            value: BigInt(y * a ** i % p)
        });
    }
    return result;
};

export const generateJ = (a, m, k, p) => {
    const result = [];
    for (let j = 1; j <= k; j++) {
        result.push({
            j,
            value: pow(BigInt(a), BigInt(m * j), BigInt(p))
        });
    }
    return result;
};

export function getRandomInt(min = 0, max = 1000000000) {
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
