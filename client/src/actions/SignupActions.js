import axios from 'axios';
import Config from '../utils/config';

export const userSignupRequest = (userData) => {
    console.log(userData);
    return dispatch => {
        return axios.post('/api/register', userData);
    }
};

export const userSignupBlockchain = (userData) => {
    this.config = new Config();
    let cURL = this.config.restServer.httpURL + '/Customer';
    return dispatch => {
        return fetch(cURL, {
            method: 'post',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
};

export const isUserExists = (identifier) => {
    return dispatch => {
        return axios.get(`/api/register/${identifier}`,identifier);
    }
};