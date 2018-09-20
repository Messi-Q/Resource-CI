import {SET_RESOURCES, ADD_RESOURCE, RESOURCE_FETCHED, UPDATE_RESOURCE, DELETE_RESOURCE} from '../constants';
//import axios from "axios/index";

export const uploadRequest = (file) => {
    return dispatch => {
        return fetch('/api/upload', {
            method: "post",
            body: file,
        }).then(handleResponse)
            .then()
    }
};

export const setResources = (resources) => {
    return {
        type: SET_RESOURCES,
        resources
    }
};

export const fetchResources = (userId) => {
    return dispatch => {
        return fetch(`/api/myResources/${userId}`)
            .then(res => res.json())
            .then(data => dispatch(setResources(data.resources)))
    }
};

const resourceFetched = (resource) => {
    return {
        type: RESOURCE_FETCHED,
        resource
    }
};

export const fetchResource = (id) => {
    return dispatch => {
        return fetch(`/api/myResource/${id}`)
            .then(res => res.json())
            .then(data => dispatch(resourceFetched(data.resource)))
    }
};

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

const addResource = (resource) => {
    return {
        type: ADD_RESOURCE,
        resource
    }
};

export const saveResource = (data) => {
    console.log(data);
    return dispatch => {
        return fetch('/api/myResources', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addResource(data.resource)));
    }
};

export const resourceUpdated = (resource) => {
    return {
        type: UPDATE_RESOURCE,
        resource
    }
};

export const updateResource = (data) => {
    return dispatch => {
        return fetch(`/api/myResources/${data.id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(resourceUpdated(data.resource)));
    }
};

export const updateAllWebResource = (data) => {
    return dispatch => {
        return fetch(`http://localhost:3000/api/Resource/${data.resourceId}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then();
    }
};

export const resourceDeleted = (resourceId) => {
    return {
        type: DELETE_RESOURCE,
        resourceId
    }
};

export const deleteResource = (resource) => {
    console.log('resource', resource);
    return dispatch => {
        return fetch(`/api/myResources/${resource.id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(resourceDeleted(resource.id)));
    }
};

