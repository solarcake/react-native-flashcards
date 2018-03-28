import {LOAD_DECKS, ADD_DECK, ADD_CARD} from '../actions'

export default function decks(state = {} , action) {
    switch(action.type) {
        case LOAD_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK: 
            return {
                ...state,
                ...action.deck,
            }
        case ADD_CARD:
            const {deck, question} = action;
            return {
                ...state,
                [deck.title]: {
                    ...deck,
                    questions: deck.questions.concat([question])
                }
            }
        default: return {
            ...state
        }
    }
}