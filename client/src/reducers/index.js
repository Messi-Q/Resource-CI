import {combineReducers} from 'redux'

import userLogin from './userLogin';
import flashMessage from './flashMessage';
import myResources from './myResources';
import locationResources from './locationResources';
import allWebResources from './allWebResources';
import buyResources from './buyResources';
import buyerResources from './buyerResources';
import mysqlResource from './mysqlResource';
import localUser from './localUser';
import blockUser from './blockUser';
import owner from './owner';
import owner1 from './owner1';
import userSignup from './userSignup';
import fileInfo from './fileInfo';

export default combineReducers({
    userLogin,
    flashMessage,
    blockUser: blockUser,
    localUser: localUser,
    owner: owner,
    owner1: owner1,
    Customer: userSignup,
    resources: myResources,
    fileInfo: fileInfo,
    buyResources: buyResources,
    buyerResources: buyerResources,
    localResources: locationResources,
    allWebResources: allWebResources,
    mysqlResource:mysqlResource,
});