import {DELETE_RESOURCE, TEST} from "../constants";

export const setResources = (testResources) => {
    return {
        type: TEST,
        testResources
    }
};

export const fetchResources = (userId) => {
    return dispatch => {
        return fetch(`/api/tesResources/${userId}`)
            .then(res => res.json())
            .then(data => dispatch(setResources(data.testResources)))
    }
};

export const resourceDeleted = (resourceId) => {
    return {
        type: DELETE_RESOURCE,
        resourceId
    }
};

export const deleteResource = (id) => {
    return dispatch => {
        return fetch(`/api/myResources/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(resourceDeleted(id)));
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