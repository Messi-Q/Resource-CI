import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import {SET_CURRENT_USER} from '../constants'

export const logoutRequest = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}))
    }
};

export const loginRequest = (data) => {
    return dispatch => {
        return axios.post('/api/login', data).then(res => {
            const token = res.data.token;

            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
            console.log(jwtDecode(token));
            dispatch(setCurrentUser(jwtDecode(token)))
        });
    }
};

export const setCurrentUser = (user) => {
    return{
        type:SET_CURRENT_USER,
        user
    }
};

