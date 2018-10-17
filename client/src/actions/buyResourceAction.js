import {
    SET_BUY_RESOURCES,
    BUY_RESOURCE_FETCHED,
    ADD_BUY_RESOURCE,
    SET_BUYER_RESOURCES,
    SET_PIC_DOWNLOAD
} from "../constants";

export const setBuyResources = (buyResources) => {
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

export const setPicDownLoad = (picDownload) => {
    return {
        type: SET_PIC_DOWNLOAD,
        picDownload
    }
};

export const picDownloads = (data) => {
    return dispatch => {
        return fetch(`/api/picDownload/${data.fileName}`)
            .then(handleResponse)
            .then(data => dispatch(setPicDownLoad(data.success)))
    }
};

export const setVidDownLoad = (success) => {
    console.log(success)
};

export const vidDownloads = (data) => {
    return dispatch => {
        return fetch(`/api/vidDownload/${data.fileName}`)
            .then(res => res.json())
            .then(data => dispatch(setVidDownLoad(data.success)))
    }
};

export const setFileDownLoad = (success) => {
    console.log(success)
};

export const fileDownloads = (data) => {
    return dispatch => {
        return fetch(`/api/fileDownload/${data.fileName}`)
            .then(res => res.json())
            .then(data => dispatch(setFileDownLoad(data.success)))
    }
};

export const buyResourceFetched = (buyResource) => {
    return {
        type: BUY_RESOURCE_FETCHED,
        buyResource
    }
};

export const fetchBuyResources = (id) => {
    return dispatch => {
        return fetch(`/api/buyResource/${id}`)
            .then(res => res.json())
            .then(data => dispatch(buyResourceFetched(data.resource)))
    }
};

export const addBuyResource = (buyResource) => {
    return {
        type: ADD_BUY_RESOURCE,
        buyResource
    }
};

export const updateBuyer = (data) => {
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

export const setBuyerResources = (buyerResources) => {
    return {
        type: SET_BUYER_RESOURCES,
        buyerResources
    }
};

export const fetchBuyerResource = (id) => {
    return dispatch => {
        return fetch(`/api/buyerResource/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setBuyerResources(data.buyerResources)))
    }
};

export const blockUserAddToken = (userData) => {
    const userId = userData.blockUserId_owner;
    const customer = {};
    customer["$class"] = userData.$class;
    customer["website"] = userData.website;
    customer["token"] = userData.totalBalance;
    customer["userId"] = userData.blockUserId_owner;

    return dispatch => {
        return fetch(`http://localhost:3000/api/Customer/${userId}`, {
            method: 'put',
            body: JSON.stringify(customer),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
};

export const blockUserSubToken = (userData) => {
    const userId = userData.blockUserId_buy;
    const customer = {};
    customer["$class"] = userData.$class;
    customer["website"] = userData.website;
    customer["token"] = userData.restBalance;
    customer["userId"] = userData.blockUserId_buy;

    return dispatch => {
        return fetch(`http://localhost:3000/api/Customer/${userId}`, {
            method: 'put',
            body: JSON.stringify(customer),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
};