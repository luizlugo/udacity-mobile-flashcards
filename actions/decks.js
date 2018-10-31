import * as api from '../libs/api';
export const NEW_DECK = 'NEW_DECK';
export const NEW_QUESTION = 'NEW_QUESTION';
export const DELETE_DECK = 'DELETE_DECK';

export function newDeck(deck) {
    return {
        type: NEW_DECK,
        deck
    }
}

export function newQuestion(question) {
    return {
        type: NEW_QUESTION,
        question
    }
}

export function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export function handleNewDeck(deck) {
    return (dispatch) => {
        return api
        .saveDeck(deck)
        .then((deck) => {
            dispatch(newDeck(deck))
            return deck.id;
        });
    }
}

export function handleNewQuestion(question) {
    return (dispatch) => {
        return api
        .addQuestion(question)
        .then((_question) => {
            dispatch(newQuestion(_question));
        }).catch((_error) => {
            console.error('error', _error);
        })
    }
}

export function handleDeleteDeck(deckId) {
    return (dispatch) => {
        return api
        .removeDeck(deckId)
        .then(() => {
            dispatch(deleteDeck(deckId));
        })
    }
}
