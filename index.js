'use strict';
import fs from 'fs';
import {elGamal, RSA, shamir, vernam} from './lab2/index.js';
import {filesCrypt, filesSign} from './utils.js';
import {SignElGamal, signRSA} from './lab3/index.js';
import {gcd_extended} from './lab1/index.js';

// console.log(vernam(84));
// files(vernam)
// console.log(signRSA(0))
console.log(SignElGamal(11))
// console.log(gcd_extended(5, 23))
