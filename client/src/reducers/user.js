import {BALANCE_FETCHED} from '../constants';

const user = (state = [], action = {}) => {
    switch (action.type) {
        case BALANCE_FETCHED:
            return action.user;
        default:
            return state;
    }
};

export default user;