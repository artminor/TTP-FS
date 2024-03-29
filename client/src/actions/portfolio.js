import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    GET_PORTFOLIO,
    // GET_STOCKS,
    PORTFOLIO_ERROR,
    UPDATE_PORTFOLIO,
    // CLEAR_PORTFOLIO
} from './types';

//get user stock portfolio
export const getCurrentPort = () => async dispatch => {
    try {
        const res = await axios.get('/api/portfolio/me');

        dispatch({
            type: GET_PORTFOLIO,
            payload: res.data
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


//create portfolio
export const createPortfolio = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/portfolio', formData, config);

        dispatch({
            type: GET_PORTFOLIO,
            payload: res.data
        });

        dispatch(setAlert('Portfolio created'), 'success');

        //@todo fix bug not redirecting to dashboard after creating profile
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(err.msg, 'danger')));
        }
        dispatch({
            type: PORTFOLIO_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

//add stock
export const addStock = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/portfolio/stock', formData, config);

        dispatch({
            type: UPDATE_PORTFOLIO,
            payload: res.data
        });

        dispatch(setAlert('Stock purchased'), 'success');

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(err.msg, 'danger')));
        }
        dispatch({
            type: PORTFOLIO_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}