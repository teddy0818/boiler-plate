import { combineReducers } from 'redux' ;
// import user from './user_reducer';

//여러 Reducer를 combineReducers 를 이용해서 rootReducer에서 하나로 합쳐준다!!
const rootReducer = combineReducers({
    // user,
})

export default rootReducer;