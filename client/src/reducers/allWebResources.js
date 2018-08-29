import {SET_ALLWEB_RESOURCES} from '../constants'

const allWebResources = (state = [], action = {}) => {
    switch (action.type){
        case SET_ALLWEB_RESOURCES:
            console.log('reducer');
            console.log(action.allWebResources);
            console.log('done');
            return action.allWebResources;
        default:
            return state
    }
};

export default allWebResources;