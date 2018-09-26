import {SET_BLOCK_USER} from '../constants';

const blockUser = (state = [], action = {}) => {
    switch (action.type) {
        case SET_BLOCK_USER:
            return action.blockUser;
        default:
            return state;
    }
};

export default blockUser;