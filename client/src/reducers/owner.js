import {OWNER_BALANCE_FETCHED} from '../constants';

const owner = (state = [], action = {}) => {
    switch (action.type) {
        case OWNER_BALANCE_FETCHED:
            return action.owner;
        default:
            return state;
    }
};

export default owner;