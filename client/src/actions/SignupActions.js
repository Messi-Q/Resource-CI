import axios from 'axios';

export const userSignupRequest = (userData) => {
    return dispatch => {
        return axios.post('/api/register', userData);
    }
};

export const isUserExists = (identifier) => {
    return dispatch => {
        return axios.get(`/api/register/${identifier}`,identifier);
    }
};