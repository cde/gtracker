import axios from 'axios';

import {GET_PROFILE, GET_PROFILES,
    PROFILE_LOADING, CLEAR_CURRENT_PROFILE,
    GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types";

// Get Current ProfileItem
export const getCurrentProfile = () => dispatch => {
    dispatch(isProfileLoading());
    axios.get('api/profile')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
            }))
        .catch(err => dispatch({
            type: GET_PROFILE, // it tells us that user don't have a profile
            payload: {}
    }))
};

// Get all Profiles
// export const getProfiles = () => dispatch => {
//     dispatch(isProfileLoading());
//     axios.get('api/profile/all')
//         .then(res => dispatch({
//             type: GET_PROFILES,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_PROFILES,
//             payload: null
//         }))
// };

// Get all profiles
export const getProfiles = () => dispatch => {
    // dispatch(isProfileLoading());
    axios
        .get('api/profile/all')
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
        );
};


// Create / Edit Profile
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

// Create / Edit Social Links
export const addSocialLinks = (socialData, history) => dispatch => {
    console.log('socialData => ', socialData)
    axios
        .post('api/profile', socialData)
        .then(res => dispatch({
            type: GET_PROFILES,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILES,
            payload: null
        }))
};

// Create Profile Experience
export const addExperience = (experienceData, history) => dispatch => {
    console.log('experienceData => ', experienceData);
    axios
        .post('/api/profile/experience', experienceData)
        .then(res => history.push('/workspace') )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

// Delete Experience
export const deleteExperience = id => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Create Profile Favorite Tools
export const addTools = (toolData, history) => dispatch => {
    console.log('toolData => ', toolData);
    axios
        .post('/api/profile/tools', toolData)
        .then(res => history.push('/workspace') )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

// Delete User & ProfileItem
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        axios
            .delete('/api/profile')
            .then(res =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
};

// set loading state before it does the request
export const isProfileLoading = () => {
    return { type: PROFILE_LOADING }
};

export const clearCurrentProfile = () => {
    return { type: CLEAR_CURRENT_PROFILE }
};

// // Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
