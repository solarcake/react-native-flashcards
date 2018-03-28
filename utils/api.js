import {AsyncStorage} from 'react-native'

/**
 * Return all of the decks
 */
export function getDecks() {
   return AsyncStorage.getItem('DECK')
   .then((decks) => {
    alert(desks);
        return JSON.parse(decks);   
   })
   .catch(() => {
        return {}
    });
}

/**
 * Return a specific deck
 * @param {String} deckID - the deck ID key
 */
export function getDeck(deckID) {
    return AsyncStorage.getItem('DECK').then((deck)=> {
        return deck[deckID];
    });
}

/**
 * Add Deck based on its title
 * @param {String} title 
 */
export function saveDeckTitle(title) {
    const titleDeck = {
        [title]: {
            'title': title,
            'questions': []
        }
    };

    return AsyncStorage.mergeItem('DECK', JSON.stringify(titleDeck)).then(() => titleDeck);
}

/**
 * Add card to a given deck
 * @param {String} deck 
 * @param {String} card 
 */
export function addCardToDeck(deck, card) {
    return AsyncStorage.mergeItem('DECK', JSON.stringify({
        [deck.title]: {
            ...deck,
            questions: deck.questions.concat([card])
        }
    })).then(() => deck);
}