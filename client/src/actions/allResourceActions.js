import {
    SET_ALLWEB_RESOURCES,
    ADD_ALLWEB_RESOURCE,
    ALL_RESOURCE_FETCHED,
    ADD_RESOURCE_To_MYSQL,
    SET_BLOCK_USER,
    SET_OWNER_ID,
    SET_ALLWEB_FILEINFO
} from '../constants';
import Config from '../utils/config';

export const allResourceFetched = (allWebResource) => {
    console.log("allWebResource", allWebResource);
    return {
        type: ALL_RESOURCE_FETCHED,
        allWebResource
    }
};

export const fetchAllWebResource = (id) => {
    return dispatch => {
        return fetch(`/api/allWebResources/${id}`)
            .then(res => res.json())
            .then(data => dispatch(allResourceFetched(data.resource)))
    }
};

export const setAllResources = (allWebResources) => {
    console.log(allWebResources);
    return {
        type: SET_ALLWEB_RESOURCES,
        allWebResources
    }
};

export const fetchAllWebResources = () => {
    return dispatch => {
        return fetch('/api/allWebResources')
            .then(res => res.json())
            .then(data => dispatch(setAllResources(data.resources)))
    }
};

export const addAllWebResource = (allWebResource) => {
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
        }).then(data => dispatch(addAllWebResource(data)))
            .catch(res => res.status(500).json({errors: {global: "something went wrong"}}));
    }
};

export const addResourceToMysql = (mysqlResource) => {
    return {
        type: ADD_RESOURCE_To_MYSQL,
        mysqlResource
    }
};

export const saveResourceToMysql = (data) => {
    return dispatch => {
        return fetch('/api/myResource', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => dispatch(addResourceToMysql(data.resource)))
    }
};

export const setAllWebFileInfo = (allWebFileInfo) => {
    return {
        type: SET_ALLWEB_FILEINFO,
        allWebFileInfo
    }
};

export const uploadRequest = (file) => {
    return dispatch => {
        return fetch('/api/allUpload', {
            method: "post",
            body: file,
        }).then(handleResponse)
            .then(data => dispatch(setAllWebFileInfo(data.allWebFileInfo)))
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
    const resourceId = "A" +
        "-" +
        resource.id;  //应改为站名+站内定位符
    return dispatch => {
        return fetch(`http://localhost:3000/api/Resource/${resourceId}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
};

export const setBlockUser = (blockUser) => {
    return {
        type: SET_BLOCK_USER,
        blockUser
    }
};

export const fetchBlockUser = (userId) => {
    return dispatch => {
        return fetch(`http://localhost:3000/api/Customer/${userId}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => dispatch(setBlockUser(data)))
    }
};

export const updateBlockOwnerToken = (data) => {
    this.config = new Config();
    let cURL = this.config.restServer.httpURL + '/BuyOwnershipTransaction';
    return dispatch => {
        return fetch(cURL, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
};

export const updateBlockReadToken = (data) => {
    this.config = new Config();
    let cURL = this.config.restServer.httpURL + '/BuyReadRightTransaction';
    return dispatch => {
        return fetch(cURL, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
};

export const setOwnerId = (owner1) => {
    return {
        type: SET_OWNER_ID,
        owner1
    }
};

export const fetchOwnerId = (id) => {
    return dispatch => {
        return fetch(`/api/fetchOwnerId/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setOwnerId(data.owner1)))
    }
};