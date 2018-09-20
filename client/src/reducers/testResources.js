import {SET_TEST_RESOURCES, Test_RESOURCE_FETCHED} from "../constants";

const testResources = (state = [], action = {}) => {
    switch (action.type) {
        case SET_TEST_RESOURCES:
            return action.testResources;
        case Test_RESOURCE_FETCHED:
            const index = state.findIndex(item => item.id === action.testResource.id);  //传过来的id是否在数组中
            console.log("index", index);
            if (index >= 0) {
                return state.map(item => {  //循环本地的state
                    if (item.id === action.testResource.id) return action.testResource;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.testResource
                ];
            }
        default:
            return state;
    }
};

export default testResources;