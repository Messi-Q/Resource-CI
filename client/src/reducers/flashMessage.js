import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from '../constants';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

const flashMessage = (state = [], action = {}) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),  //给定随机数的id
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const index = findIndex(state, {id: action.id});
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ] //删除找到的index
            }
            return state;
        default:
            return state;
    }
};

export default flashMessage;