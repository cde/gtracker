import axios from 'axios';
import {GET_ERRORS} from "./types";


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