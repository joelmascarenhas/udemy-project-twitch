import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});


//Use this as the base reducer when we have nothing declared so as to avoid the error 
// export default combineReducers({
//     replaceMe: () => 'asdsad'
// });