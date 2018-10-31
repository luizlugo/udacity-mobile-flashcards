import { AsyncStorage } from 'react-native';
import { ASYNC_STORAGE_KEY } from './constants';
import { generateUUID } from './utils';

export function fetchDecksData() {
    return AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(JSON.parse);
}

export function saveDeck(deck) {
    return new Promise((_success, _error) => {
        const id = generateUUID();
        const deckData = {
            id,
            ...deck,
            questions: []
        };
        AsyncStorage.mergeItem(ASYNC_STORAGE_KEY, JSON.stringify({
            [id]: deckData
        }))
        .then(() => {
            _success(deckData)
        })
        .catch(_error);
    });
}

export function addQuestion(question) {
    return new Promise((_success, _error) => {
        const id = generateUUID();
        const questionData = {
            id,
            ...question
        };
        AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(JSON.parse).then((_decks) => {
            AsyncStorage.mergeItem(ASYNC_STORAGE_KEY, JSON.stringify({
                [questionData.deckId] : {
                    ..._decks[questionData.deckId],
                    questions: _decks[questionData.deckId].questions.concat(questionData)
                }
            }))
            .then(() => {
                _success(questionData);
            })
            .catch(_error);
        });
    });
}

export function removeDeck(key) {
    return AsyncStorage.getItem(ASYNC_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(data));
        });
}