import {SET_PIC_DOWNLOAD} from '../constants';

const picDownload = (state = [], action = {}) => {
    switch (action.type) {
        case SET_PIC_DOWNLOAD:
            return action.picDownload;
        default:
            return state;
    }
};

export default picDownload;