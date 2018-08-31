import {RESOURCE_FETCHED, ADD_RESOURCE, SET_RESOURCES, UPDATE_RESOURCE, DELETE_RESOURCE} from "../constants";

const myResources = (state = [], action = {}) => {
    switch (action.type) {
        case SET_RESOURCES:
            return action.resources;
        case ADD_RESOURCE:
            return [
                ...state,
                action.resource
            ];
        case RESOURCE_FETCHED:
            const index = state.findIndex(item => item.id === action.resource.id);  //传过来的id是否在数组中
            if (index >= 0) {
                return state.map(item => {  //循环本地的state
                    if (item.id === action.resource.id) return action.resource;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.resource
                ];
            }
        case UPDATE_RESOURCE:
            return state.map(item => {
                if (item.id === action.resource.id) return action.resource;
                return item;
            });
        case DELETE_RESOURCE:
            return state.filter(item => item.id !== action.resourceId);
        default:
            return state;
    }
};

export default myResources;