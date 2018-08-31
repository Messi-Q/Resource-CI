import {TEST} from "../constants";

const testResources = (state = [], action = {}) => {
    switch (action.type) {
        case TEST:
            return action.testResources;
        default:
            return state;
    }
};

export default testResources;