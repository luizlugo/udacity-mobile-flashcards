import { INIT_DATA } from '../actions/shared';
import { NEW_DECK, NEW_QUESTION, DELETE_DECK } from '../actions/decks';

export default function decks(state = {}, action = {}) {
    switch (action.type) {
        case INIT_DATA:
            return {
                ...state, 
                ...action.decks
            };
        case NEW_DECK:
            return {
                ...state,
                [action.deck.id] : action.deck
            }
        case DELETE_DECK:
            const newState = Object.assign({}, state);
            delete newState[action.deckId];
            return newState;
        case NEW_QUESTION:
            return {
                ...state,
                [action.question.deckId]: {
                   ...state[action.question.deckId],
                    questions: state[action.question.deckId].questions.concat(action.question)
                }
            }
        default: 
            return state;
    }
}