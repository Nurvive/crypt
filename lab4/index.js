import {generateRandomPrime, getRandomInt, shuffle} from '../utils.js';
import {evclidGCD, pow} from '../lab1/index.js';

const cards = {
    two: 2n,
    three: 3n,
    four: 4n,
    five: 5n,
    six: 6n,
    seven: 7n,
    eight: 8n,
    nine: 9n,
    ten: 10n,
};

const generateKeys = (p) => {
    let Ca = getRandomInt(1, p);
    while (evclidGCD(Ca, p).gcd !== 1) {
        Ca = getRandomInt(1, p);
    }
    let Da = evclidGCD(Ca, p).x;
    if (Da < 0) {
        Da += p;
    }
    return {Ca, Da};
};

const makePlayer = (i, p) => {
    const keys = generateKeys(p);
    return {
        name: `Player ${i}`,
        Ca: BigInt(keys.Ca),
        Da: BigInt(keys.Da),
        card: null
    };
};

const encryptDeck = (player, deck, p) => {
    return shuffle(deck.map(card => pow(card, BigInt(player.Ca), p)));
};

const decryptCard = (player, card, p) => {
    return pow(card, BigInt(player.Da), p);
};

export const poker = (players = 2, cardsCount = 1) => {
    const p = generateRandomPrime();
    const _p = p - 1;
    const playersList = [];
    let deck = Object.values(cards);
    for (let i = 1; i <= players; i++) {
        playersList.push(makePlayer(i, _p));
    }
    playersList.forEach(player => deck = encryptDeck(player, deck, BigInt(p)));
    playersList.forEach(player => {
        player.card = deck.pop();
        playersList.forEach(deepPlayer => {
            if (deepPlayer.name !== player.name) {
                player.card = decryptCard(deepPlayer, player.card, BigInt(p))
            }
        })
        player.card = decryptCard(player, player.card, BigInt(p));
    });

    deck = deck.map((card) => {
        let decryptedCard = card;
        for (let i = 0; i < playersList.length; i++) {
            decryptedCard = decryptCard(playersList[i], decryptedCard, BigInt(p));
        }
        return decryptedCard;
    });

    return [playersList, deck]
};

console.log(poker(4));
