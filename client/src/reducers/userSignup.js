import {SET_USER} from '../constants';

const userSignup = (state = [], action = {}) => {
    switch (action.type) {
        case SET_USER:
            return action.Customer;
        default:
            return state;
    }
};

export default userSignup;