import {SET_ALL_RESOURCES} from '../constants';

export const setAllResources = (localResources) => {
    console.log(localResources);
    return{
        type:SET_ALL_RESOURCES,
        localResources
    }
};

export const fetchAllResources = () => {
    return dispatch => {
        return fetch('/api/locationResources')
            .then(res => res.json())
            .then(data => dispatch(setAllResources(data.resources)))
    }
};