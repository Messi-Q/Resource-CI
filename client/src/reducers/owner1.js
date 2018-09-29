import {SET_OWNER_ID} from '../constants';

const owner1 = (state = [], action = {}) => {
    switch (action.type) {
        case SET_OWNER_ID:
            return action.owner1;
        default:
            return state;
    }
};

export default owner1;