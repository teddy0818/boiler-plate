// reducer 에서 next state를 반환한다

import {
    LOGIN_USER 
} from '../_actions/types'

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            break;
    
        default:
            return state;
    }
}