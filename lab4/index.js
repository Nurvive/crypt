import {generateRandomPrime, getRandomInt, shuffle} from '../utils.js';
import {evclidGCD, pow} from '../lab1/index.js';

const cards = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7
}

export const poker = (players = 2, cardsCount = 1) => {
    const p = generateRandomPrime();
    const _p = p - 1;
    let Ca = getRandomInt(1, _p);
    while (evclidGCD(Ca, _p).gcd !== 1) {
        Ca = getRandomInt(1, _p);
    }
    let Da = evclidGCD(Ca, _p).x;
    if (Da < 0) {
        Da += _p;
    }
    let Cb = getRandomInt(1, _p);
    while (evclidGCD(Cb, _p).gcd !== 1) {
        Cb = getRandomInt(1, _p);
    }
    let Db = evclidGCD(Cb, _p).x;
    if (Db < 0) {
        Db += _p;
    }

    const u1 = pow(BigInt(cards.two), BigInt(Ca), BigInt(p))
    const u2 = pow(BigInt(cards.three), BigInt(Ca), BigInt(p))
    const u3 = pow(BigInt(cards.four), BigInt(Ca), BigInt(p))

    console.log(u1, u2, u3, Ca, Da, p);
    const receiveInfoA = shuffle([u1, u2, u3]);

    const Acard = pow(BigInt(receiveInfoA.pop()), BigInt(Da), BigInt(p));

    const u21 = pow(BigInt(receiveInfoA[0]), BigInt(Cb), BigInt(p))
    const u22 = pow(BigInt(receiveInfoA[1]), BigInt(Cb), BigInt(p))

    const receiveInfoB = shuffle([u21, u22]);

    const w1 = pow(BigInt(receiveInfoB.pop()), BigInt(Da), BigInt(p));

    const z = pow(w1, BigInt(Db), BigInt(p))

    return {Acard, Bcard: z, Ccard: receiveInfoB[0]}
};

console.log(poker())
