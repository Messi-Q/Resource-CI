import {combineReducers} from 'redux'

import userLogin from './userLogin';
import flashMessage from './flashMessage';
import myResources from './myResources';
import locationResources from './locationResources';
import allWebResources from './allWebResources';
import testResources from './testResources';
import user from './user';

export default combineReducers({
    userLogin,
    flashMessage,
    user,
    resources: myResources,
    localResources: locationResources,
    allWebResources: allWebResources,
    testResources: testResources
});