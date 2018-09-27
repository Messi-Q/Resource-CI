import {ADD_RESOURCE_To_MYSQL} from "../constants";

const mysqlResource = (state = [], action = {}) => {
    switch (action.type) {
        case ADD_RESOURCE_To_MYSQL:
            return action.mysqlResource;
        default:
            return state;
    }
};

export default mysqlResource;