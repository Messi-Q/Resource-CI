import {SET_ALL_RESOURCES, LOCATION_RESOURCE_FETCHED} from '../constants'

const locationResources = (state = [], action = {}) => {
    switch (action.type){
        case SET_ALL_RESOURCES:
            return action.localResources;
        case LOCATION_RESOURCE_FETCHED:
            const index = state.findIndex(item => item.id === action.localResource.id);  //传过来的id是否在数组中
            if (index >= 0) {
                return state.map(item => {  //循环本地的state
                    if (item.id === action.localResource.id) return action.localResource;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.localResource
                ];
            }
        default:
            return state
    }
};

export default locationResources;