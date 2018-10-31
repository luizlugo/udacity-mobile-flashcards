import * as api from '../libs/api';
export const INIT_DATA = 'INIT_DATA';

export function initData(decks) {
    return {
        type: INIT_DATA,
        decks
    }
}

export function fetchInitData() {
    return (dispatch) => {
        api
        .fetchDecksData()
        .then((_decks) => {
            dispatch(initData(_decks));
        });
    }
}