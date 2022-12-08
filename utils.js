import {evclidGCD, pow} from './lab1/index.js';
import fs from 'fs';
import {elGamal} from './lab2/index.js';
import {signRSA} from './lab3/index.js';

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

export function generateRandomBigInt(lowBigInt = 0n, highBigInt = 1000000000n) {
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

export const isPrimeBig = (n) => {
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
    result[0] = '1';
    return result;
};

export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const isPrime = (n) => {
    for (let i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};

export const generateRandomPrime = (min = 0, max = 10000000) => {
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

export function getRandomInt(min = 0, max = 100000000) {
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export function hashString(key) {
    let hash = 0;
    for (let i = 0; i < key.length; ++i) {
        hash += key.charCodeAt(i);
        hash += (hash << 10);
        hash ^= (hash >> 6);
    }
    hash += (hash << 3);
    hash ^= (hash >> 11);
    hash += (hash << 15);
    return Math.abs(hash);
}

export const generateP = () => {

}

export const filesCrypt = (cryptFunction) => {
    const img = fs.readFileSync('jojo.jpg');
    const encryptedImg = new Uint32Array(img.length);
    const decryptedImg = new Uint8Array(img.length);

    img.forEach((byte, index) => {
        const res = cryptFunction(byte);
        decryptedImg[index] = Number(res.m1);
        if (byte !== Number(res.m1)) {
            console.error(res);
            throw new Error('qwerty');
        }
        encryptedImg[index] = Number(res.e);
    });
    fs.writeFile('djojo.jpg', Buffer.from(decryptedImg), (err) => {
        if (!err) {
            console.log('Data written');
        } else {
            console.log(err);
        }
    });

    fs.writeFile('ejojo.crypt', Buffer.from(encryptedImg.buffer), (err) => {
        if (!err) {
            console.log('Data written');
        } else {
            console.log(err);
        }
    });
};

export const filesSign = () => {
    const txt = fs.readFileSync('doc.txt');
    const txtArray = new Uint8Array(txt);
    const message = txtArray.toString().split(',').join('');
    const res = signRSA(message);
    console.log(res)
    console.log(hashString(message))
    console.log(Number(res.w) === hashString(message));
}
