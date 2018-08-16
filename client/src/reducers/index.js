import {combineReducers} from 'redux'

import userLogin from './userLogin';
import flashMessage from './flashMessage';
import resources from './resources';

export default combineReducers({
    userLogin,
    flashMessage,
    resources
});