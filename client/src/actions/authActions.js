import {TEST_DISPATCH} from "./types";

export const createUser = (userData) => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
}