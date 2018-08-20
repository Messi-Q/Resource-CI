import {SET_ALL_RESOURCES} from '../constants'

const locationResources = (state = [], action = {}) => {
    switch (action.type){
        case SET_ALL_RESOURCES:
            return action.localResources;
        default:
            return state
    }
};

export default locationResources;