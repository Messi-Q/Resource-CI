import {SET_ALLWEB_FILEINFO} from '../constants';

const allWebFileInfo = (state = [], action = {}) => {
    switch (action.type) {
        case SET_ALLWEB_FILEINFO:
            return action.allWebFileInfo;
        default:
            return state;
    }
};

export default allWebFileInfo;