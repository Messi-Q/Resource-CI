import {SET_TEST_RESOURCES, Test_RESOURCE_FETCHED} from "../constants";

export const setTestResources = (testResources) => {
    console.log('test', testResources);
    return {
        type: SET_TEST_RESOURCES,
        testResources
    }
};

export const fetchResources = (userId) => {
    return dispatch => {
        return fetch(`/api/testResources/${userId}`)
            .then(res => res.json())
            .then(data => dispatch(setTestResources(data.resources)))
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

export const fileDownloads = (id) => {
    return dispatch => {
        return fetch(`/api/download/${id}`, {
            method: "get",
        }).then(handleResponse)
            .then()
    }
};

export const testResourceFetched = (testResource) => {
    console.log(testResource);
    return{
        type:Test_RESOURCE_FETCHED,
        testResource
    }
};

export const fetchTestResources = (id) => {
    return dispatch => {
        return fetch(`/api/testResource/${id}`)
            .then(res => res.json())
            .then(data => dispatch(testResourceFetched(data.resource)))
    }
};