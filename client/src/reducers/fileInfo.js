import {SET_FILEINFO} from '../constants';

const fileInfo = (state = [], action = {}) => {
    switch (action.type) {
        case SET_FILEINFO:
            return action.fileInfo;
        default:
            return state;
    }
};

export default fileInfo;