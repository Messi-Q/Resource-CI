import {SET_ALLWEB_RESOURCES, ADD_ALLWEB_RESOURCE, ALL_RESOURCE_FETCHED} from '../constants'

const allWebResources = (state = [], action = {}) => {
    switch (action.type){
        case SET_ALLWEB_RESOURCES:
            return action.allWebResources;
        case ADD_ALLWEB_RESOURCE:
            return[
                ...state,
                action.allWebResource
            ];
        case ALL_RESOURCE_FETCHED:
            const index = state.findIndex(item => item.id === action.allWebResource.id);
            if (index >= 0) {
                return state.map(item => {  //循环本地的state
                    if (item.id === action.allWebResource.id) return action.allWebResource;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.allWebResource
                ];
            }
        default:
            return state
    }
};

export default allWebResources;