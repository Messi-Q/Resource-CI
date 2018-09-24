import {SET_BUYER_RESOURCES} from '../constants';

const buyerResources = (state = [], action = {}) => {
    switch (action.type){
        case SET_BUYER_RESOURCES:
            return action.buyerResources;
        default:
            return state;
    }
};

export default buyerResources;