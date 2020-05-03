import types from './types';

export function getUser() {
    //axios request here

    const data = {
        user: "bkim"
    };

    return {
        type: types.GET_USER,
        payload: data
    }
}