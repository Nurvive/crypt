'use strict';
import fs from 'fs';
import {elGamal, RSA, shamir, vernam} from './lab2/index.js';
import {filesCrypt, filesSign} from './utils.js';
import {gost, SignElGamal, signRSA} from './lab3/index.js';

// console.log(vernam(84));
// filesSign(signRSA)
console.log(gost(11))
// console.log(gcd_extended(5, 23))
