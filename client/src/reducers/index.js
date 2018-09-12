import {combineReducers} from 'redux'

import userLogin from './userLogin';
import flashMessage from './flashMessage';
import myResources from './myResources';
import locationResources from './locationResources';
import allWebResources from './allWebResources';
import testResources from './testResources';
import user from './user';
import owner from './owner';
import userSignup from './userSignup';

export default combineReducers({
    userLogin,
    flashMessage,
    user: user,
    owner: owner,
    Customer: userSignup,
    resources: myResources,
    localResources: locationResources,
    allWebResources: allWebResources,
    testResources: testResources
});