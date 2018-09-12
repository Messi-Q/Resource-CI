import axios from 'axios';
import Config from '../utils/config';
import {SET_USER} from "../constants";

export const setUser = (Customer) => {
    console.log(Customer);
    return {
        type: SET_USER,
        Customer
    }
};

export const userSignupRequest = (userData) => {
    console.log(userData);
    return dispatch => {
        return fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => dispatch(setUser(data.Customer)));
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