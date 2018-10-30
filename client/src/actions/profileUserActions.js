import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS} from "./types";

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
    dispatch(isProfileLoading());
    axios.get('api/profile').then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_PROFILE, // it tells us that user don't have a profile
        payload: {}
    }))
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    console.log('profileData => ', profileData)
    axios
        .post('api/profile', profileData)
        .then(res => history.push('/workspace') )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

// set loading state before it does the request
export const isProfileLoading = () => {
    return { type: PROFILE_LOADING }
};

export const clearCurrentProfile = () => {
    return { type: CLEAR_CURRENT_PROFILE }
};
