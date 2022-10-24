export const pow = (base, power, module) => {
    if (power === 0n) return 1n;
    if (power === 1n) return base;
    if (power % 2n === 0n) return pow(base, power / 2n, module) ** 2n % module;
    return pow(base, power - 1n, module) * base % module;
}

export const powBig = (base, power, module) => {
    let r = 1n;
    let newBase = base % module;
    while (power > 0) {
        if (newBase === 0n) return 0n;
        if ((power & 1n) === 1n) {
            r = (r * newBase) % module
        }
        power = power >> 1n;
        newBase = (newBase * newBase) % module
    }
    return r;
}

export const generateCoprime = (p, min = 0, max = 1000000000) => {
    let result = generateRandomPrime(min, max);
    while (gcd(result, p).gcd !== 1) {
        result = generateRandomPrime(min, max);
    }
    return result
}

export const gcd = (x,
                    y,
                    s1 = 1,
                    s2 = 0,
                    t1 = 0,
                    t2 = 1
) => {
    if (y === 0) {
        return {
            gcd: x,
            s: s1,
            t: t1
        };
    }
    const q = Math.floor(x / y);
    const s1copy = s1;
    const t1copy = t1;
    return (x % y === 0) ? {
        gcd: y,
        s: s2,
        t: t2
    } : gcd(y, x % y, s1 = s2, s2 = s1copy - q * s2, t1 = t2, t2 = t1copy - q * t2);
}


export function getRandomInt(min = 0, max = 1000000000) {
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

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
    return true
}

export const generateRandomBinary = (length) => {
    const result = []
    for (let i = 0; i < length; i++) {
        result.push(String(Math.round(Math.random())))
    }
    return result;
}

export const isPrime = (n) => {
    for (let i = 2; i < Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true
}
export const generateRandomPrime = (min = 0, max = 1000000000) => {
    let q = getRandomInt(min, max);
    while (!isPrime(q)) {
        q = getRandomInt(min, max);
    }
    return q
}
export const defHell = () => {
    let q = generateRandomPrime()
    let p = 2 * q + 1;
    while (!isPrime(p)) {
        q = generateRandomPrime();
        p = 2 * q + 1;
    }
    let g = getRandomInt();
    while (1 >= g || g >= p - 1 || pow(BigInt(g), BigInt(q), BigInt(p)) === 1n) {
        g = getRandomInt()
    }
    g = BigInt(g)
    p = BigInt(p)
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
}

const generateI = (a, m, y, p) => {
    const result = [];
    for (let i = 1; i <= m - 1; i++) {
        result.push({
            i,
            value: BigInt(y * a ** i % p)
        })
    }
    return result
}

const generateJ = (a, m, k, p) => {
    const result = [];
    for (let j = 1; j <= k; j++) {
        result.push({
            j,
            value: pow(BigInt(a), BigInt(m * j), BigInt(p))
        })
    }
    return result
}

export const bigSmall = (a, p, y) => {
    const m = Math.floor(Math.sqrt(p)) + 1;
    const k = m;
    const is = generateI(a, m, y, p);
    const js = generateJ(a, m, k, p);
    let result = {}
    for (let i = 0; i < m; i++) {
        if (is[i].value === js[i].value) {
            result.i = is[i].i;
            result.j = js[i].j;
            return result.j * m - result.i;
        }
    }
    return result;
}

