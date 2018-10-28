import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";


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

// set loading state before it does the request
export const isProfileLoading = () => {
    return { type: PROFILE_LOADING }
};


export const clearCurrentProfile = () => {
    return { type: CLEAR_CURRENT_PROFILE }
};