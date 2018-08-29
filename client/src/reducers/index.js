import {combineReducers} from 'redux'

import userLogin from './userLogin';
import flashMessage from './flashMessage';
import myResources from './myResources';
import locationResources from './locationResources';
import allWebResources from './allWebResources';

export default combineReducers({
    userLogin,
    flashMessage,
    resources:myResources,
    localResources:locationResources,
    allWebResources:allWebResources
});