import {SET_BUY_RESOURCES, BUY_RESOURCE_FETCHED, ADD_BUY_RESOURCE} from "../constants";

export const setBuyResources = (buyResources) => {
    console.log('test', buyResources);
    return {
        type: SET_BUY_RESOURCES,
        buyResources
    }
};

export const fetchResources = (userId) => {
    return dispatch => {
        return fetch(`/api/buyResources/${userId}`)
            .then(res => res.json())
            .then(data => dispatch(setBuyResources(data.buyResources)))
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

export const testResourceFetched = (buyResource) => {
    console.log(buyResource);
    return{
        type:BUY_RESOURCE_FETCHED,
        buyResource
    }
};

export const fetchTestResources = (id) => {
    return dispatch => {
        return fetch(`/api/buyResource/${id}`)
            .then(res => res.json())
            .then(data => dispatch(testResourceFetched(data.resource)))
    }
};

export const addBuyResource = (buyResource) => {
    console.log(buyResource);
    return{
        type: ADD_BUY_RESOURCE,
        buyResource
    }
};

export const updateBuyer = (data) => {
    console.log(data);
    return dispatch => {
        return fetch('/api/updateBuyer', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => dispatch(addBuyResource(data.buyResource)))
    }
};