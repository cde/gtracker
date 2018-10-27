import axios from 'axios';
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode";

import {GET_ERRORS, SET_CURRENT_USER} from "./types";

// we're dealing with asynchronous data we're fetching from
// our back end we have to wait for the response and
// then we're going to dispatch.
// we will use thunk middleware here (dispatch)
export const createUser = (userData, history) => dispatch => {
    axios.post('/api/users/create', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // save to localStore
            const { token } = res.data;
            localStorage.setItem('jwtToken',token);
            // set token
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set current user (logged user)
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

// Log User out
export const logoutUser = () => dispatch => {
    // remove token from localStorage
    localStorage.removeItem('jwtToken');

    // remove auth header
    setAuthToken(false);

    // set current user to {} which will set isAuthenticate to false
    dispatch(setCurrentUser({}))

}