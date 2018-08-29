import {SET_ALLWEB_RESOURCES} from '../constants';
// import axios from "axios/index";
import Config from '../utils/config';

export const setAllResources = (allWebResources) => {
    console.log(allWebResources);
    return {
        type: SET_ALLWEB_RESOURCES,
        allWebResources
    }
};

export const fetchAllWebResources = () => {
    // let ResourceCard = {};
    this.config = new Config();
    let cURL = this.config.restServer.httpURL + '/Resource';
    console.log(cURL);
    return dispatch => {
        return fetch(cURL)
            .then(res => res.json())
            .then(data => dispatch(setAllResources(data)))
    }
};

export const saveResource = (resourceData) => {
    // let resourceDetails = {};
    this.config = new Config();
    let cURL = this.config.restServer.httpURL + '/Resource';
    return dispatch => {
        return fetch(cURL, {
            method: 'post',
            body: JSON.stringify(resourceData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
};

export const uploadRequest = (file) => {
    return dispatch => {
        return fetch('/api/allUpload', {
            method: "post",
            body: file,
        }).then(handleResponse)
            .then()
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