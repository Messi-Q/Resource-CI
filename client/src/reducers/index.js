import {combineReducers} from 'redux'

import userLogin from './userLogin';
import flashMessage from './flashMessage';
import myResources from './myResources';
import locationResources from './locationResources';

export default combineReducers({
    userLogin,
    flashMessage,
    resources:myResources,
    localResources:locationResources
});