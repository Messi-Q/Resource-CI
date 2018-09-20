import {SET_ALL_RESOURCES, LOCATION_RESOURCE_FETCHED} from '../constants';

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

export const locationResourceFetched = (localResource) => {
    console.log('local', localResource);
    return{
        type:LOCATION_RESOURCE_FETCHED,
        localResource
    }
};

export const fetchLocationResource = (id) => {
    return dispatch => {
        return fetch(`/api/locationResources/${id}`)
            .then(res => res.json())
            .then(data => dispatch(locationResourceFetched(data.resource)))
    }
};