import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    GET_PORTFOLIO,
    PORTFOLIO_ERROR
} from './types';

//get user stock portfolio
export const getCurrentPort = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PORTFOLIO,
            payload: res.datat
        });
    } catch (err) {
        dispatch({
            type: PORTFOLIO_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}