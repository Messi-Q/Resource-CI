import {BALANCE_FETCHED} from '../constants';

const localUser = (state = [], action = {}) => {
    switch (action.type) {
        case BALANCE_FETCHED:
            return action.localUser;
        default:
            return state;
    }
};

export default localUser;