export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function loadDecks(decks) {
    return {
        type: LOAD_DECKS,
        decks,
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function addCard(deck, question) {
    return {
        type: ADD_CARD,
        deck,
        question
    }
}