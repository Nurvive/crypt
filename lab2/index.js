import {
    gcd,
    generateCoprime,
    generateRandomBinary,
    generateRandomPrime,
    getRandomInt,
    isPrime,
    pow, powBig
} from "../lab1/index.js";

export const shamir = (m = 0) => {
    let p = 23; // TODO Не пашет
    // let p = generateRandomPrime(m + 1);
    let Ca = generateRandomPrime();
    while (gcd(Ca, (p - 1)).gcd !== 1) {
        Ca = generateRandomPrime();
    }
    console.log(gcd(Ca, (p - 1)))
    let Da = gcd(Ca,(p - 1)).t;
    let Cb = generateRandomPrime();
    while (gcd(Cb, (p - 1)).gcd !== 1) {
        Cb = generateRandomPrime(p - 1);
    }
    console.log(gcd(Cb, (p - 1)))
    let Db = gcd(Cb, (p - 1)).t;
    Ca = BigInt(Ca);
    Cb = BigInt(Cb);
    Da = BigInt(Da);
    Db = BigInt(Db);
    p = BigInt(p)
    const x1 = powBig(BigInt(m), Ca, p);
    const x2 = powBig(x1, Cb, p);
    const x3 = powBig(x2, Da, p);
    const x4 = powBig(x3, Db, p);

    return {
        m,
        x4
    }
}

export const elGamal = (m = 0) => {
    let q = generateRandomPrime()
    let p = 2 * q + 1;
    while (!isPrime(p)) {
        q = generateRandomPrime();
        p = 2 * q + 1;
    }
    let g = getRandomInt(2, p - 2);
    while (pow(BigInt(g), BigInt(q), BigInt(p)) === 1n) {
        g = getRandomInt(2, p - 2)
    }
    g = BigInt(g)
    const x = BigInt(getRandomInt(2, p - 1));
    const k = BigInt(getRandomInt(2, p - 2))
    p = BigInt(p)
    const y = pow(g, x, p);
    const a = pow(g, k, p)
    const b = (BigInt(m) * pow(y, k, p)) % p;
    const m1 = (b * pow(a, (p - 1n - x), p)) % p;
    return {
        m, m1
    }
}

export const RSA = (m = 0) => {
    const q = 11; // TODO Не пашет
    // const q = generateRandomPrime(m + 1);
    // const p = generateRandomPrime(2);
    let p = 3;
    const N = p * q;
    const f = (p - 1) * (q - 1)
    let d = generateCoprime(f, 1, f)
    let c = generateRandomPrime(1, f);
    while (c * d % f !== 1) {
        c = generateRandomPrime();
    }
    const e = pow(BigInt(m), BigInt(d), BigInt(N));
    const m1 = pow(BigInt(e), BigInt(c), BigInt(N))
    return {
        m, m1
    }
}

export const verner = (m = 0) => {
    const message = m.toString(2).split('')
    const key = generateRandomBinary(message.length);
    const crypt = [];
    for (let i = 0; i < message.length; i++) {
        crypt.push(String(Number(message[i]) ^ Number(key[i])))
    }
    const decrypt = [];
    for (let i = 0; i < message.length; i++) {
        decrypt.push(String(Number(crypt[i]) ^ Number(key[i])));
    }
    const m1 = parseInt(decrypt.join(''), 2)
    return {
        m, m1
    }
}