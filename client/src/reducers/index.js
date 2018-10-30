import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileUserReducer from './profileUserReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileUserReducer
});


// const appReducer = combineReducers({
//     auth: authReducer,
//     errors: errorReducer,
//     profile: profileUserReducer
// })
//
// const initialState = appReducer({}, {})
//
// const rootReducer = (state, action) => {
//     if (action.type === 'LOG_OUT') {
//         state = initialState
//     }
//
//     return appReducer(state, action)
// }
//
// export default rootReducer