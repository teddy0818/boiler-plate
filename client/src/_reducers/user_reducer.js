// reducer 에서 next state를 반환한다

import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from '../_actions/types.js'

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return {...state, register: action.payload }
            break;
        case AUTH_USER:
            return {...state, register: action.payload }
            break;
        default:
            return state;
    }
}