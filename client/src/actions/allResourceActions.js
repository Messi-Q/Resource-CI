import {SET_ALLWEB_RESOURCES, ADD_ALLWEB_RESOURCE, ALL_RESOURCE_FETCHED, ADD_RESOURCE_To_MYSQL} from '../constants';
// import axios from "axios/index";
import Config from '../utils/config';

export const allResourceFetched = (allWebResource) => {
    //console.log(allWebResource);
    return {
        type: ALL_RESOURCE_FETCHED,
        allWebResource
    }
};

export const fetchAllWebResource = (id) => {
    this.config = new Config();
    let cURL = this.config.restServer.httpURL + '/Resource';
    console.log(cURL);
    return dispatch => {
        return fetch(`http://localhost:3000/api/Resource/${id}`)
            .then(res => res.json())
            .then(data => dispatch(allResourceFetched(data)))
            .catch(res => res.status(500).json({errors: {global: "something went wrong"}}));
    }
};

export const setAllResources = (allWebResources) => {
    //console.log(allWebResources);
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
            .catch(res => res.status(500).json({errors: {global: "something went wrong"}}));
    }
};

export const addAllWebResource = (allWebResource) => {
    console.log(allWebResource);
    return {
        type: ADD_ALLWEB_RESOURCE,
        allWebResource
    }
};

export const saveResource = (resourceData) => {
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
            .then(data => dispatch(addAllWebResource(data)))
            .catch(res => res.status(500).json({errors: {global: "something went wrong"}}));
    }
};

export const addResourceToMysql = (resource) => {
    console.log(resource);
    return {
        type: ADD_RESOURCE_To_MYSQL,
        resource
    }
};

export const saveResourceToMysql = (data) => {
    console.log(data);
    return dispatch => {
        return fetch('/api/myResources', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addResourceToMysql(data.resource)));
    }
};

export const uploadRequest = (file) => {
    return dispatch => {
        return fetch('/api/allUpload', {
            method: "post",
            body: file,
        }).then(handleResponse)
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

export const deleteWebResource = (resource) => {
    const resourceId = 'A' + '-' + resource.fileTitle; //应改为站名+站内定位符
    console.log('resourceId', resourceId);
    return dispatch => {
        return fetch(`http://localhost:3000/api/Resource/${resourceId}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
};