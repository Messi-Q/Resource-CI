import {BALANCE_FETCHED, OWNER_BALANCE_FETCHED} from '../constants';
import Config from '../utils/config';

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const userRecharge = (data) => {
    return dispatch => {
        return fetch('/api/localUser', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
};

const balanceFetched = (localUser) => {
    return {
        type: BALANCE_FETCHED,
        localUser
    }
};

export const fetchBalance = (id) => {
    return dispatch => {
        return fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => dispatch(balanceFetched(data.user)))
    }
};

export const userSubBalance = (data) => {
    return dispatch => {
        return fetch(`/api/localUser/${data.id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
};

export const userAddBalance = (data) => {
    return dispatch => {
        return fetch(`/api/owner/${data.userId}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
};

export const rechargeBlockchain = (data) => {
    this.config = new Config();
    let cURL = this.config.restServer.httpURL + '/RechargeTransaction';
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

const OwnerBalanceFetched = (owner) => {
    return {
        type: OWNER_BALANCE_FETCHED,
        owner
    }
};

export const fetchOwnerBalance = (id) => {
    return dispatch => {
        return fetch(`/api/localUser/${id}`)
            .then(res => res.json())
            .then(data => dispatch(OwnerBalanceFetched(data.owner)))
    }
};

export const updateResourceInfo = (data) => {
    return dispatch => {
        return fetch(`/api/locationResources/${data.id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
};