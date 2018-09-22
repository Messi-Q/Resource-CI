import {ADD_BUY_RESOURCE, SET_BUY_RESOURCES, BUY_RESOURCE_FETCHED} from '../constants';

const buyResources = (state = [], action = {}) => {
    switch (action.type){
        case SET_BUY_RESOURCES:
            return action.buyResources;
        case ADD_BUY_RESOURCE:
            return [
                ...state,
                action.buyResource
            ];
        case BUY_RESOURCE_FETCHED:
            const index = state.findIndex(item => item.id === action.buyResource.id);  //传过来的id是否在数组中
            console.log("index", index);
            if (index >= 0) {
                return state.map(item => {  //循环本地的state
                    if (item.id === action.buyResource.id) return action.buyResource;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.buyResource
                ];
            }
        default:
            return state;
    }
};

export default buyResources;