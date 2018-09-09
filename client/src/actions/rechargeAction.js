import {BALANCE_FETCHED, OWNER_BALANCE_FETCHED} from '../constants';

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
    console.log(data);
    return dispatch => {
        return fetch('/api/user',{
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
};

const balanceFetched = (user) => {
    console.log('OK');
    console.log(user);
    return {
        type:BALANCE_FETCHED,
        user
    }
};

export const fetchBalance = (id) => {
    console.log('123', id);
    return dispatch => {
        return fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => dispatch(balanceFetched(data.user)))
    }
};

export const userSubBalance = (data) => {
  return dispatch => {
      return fetch(`/api/user/${data.id}`,{
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
        return fetch(`/api/owner/${data.id}`,{
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
};

const OwnerBalanceFetched = (owner) => {
    console.log('OK');
    console.log(owner);
    return {
        type:OWNER_BALANCE_FETCHED,
        owner
    }
};

export const fetchOwnerBalance = (id) => {
    return dispatch => {
        return fetch(`/api/user/${id}`)
            .then(res => res.json())
            .then(data => dispatch(OwnerBalanceFetched(data.owner)))
    }
};

export const updateResourceInfo = (data) => {
    return dispatch => {
        return fetch(`/api/locationResources/${data.id}`,{
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
};