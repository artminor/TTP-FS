import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

//load user
export const loadUser = () => async dispatch => {
  //check local storage, set token to header if there's one
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    //load user data or dispatch
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//resgiter user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  //prepare data to send
  const body = JSON.stringify({
    name,
    email,
    password
  });

  try {
    //get response from axios post request
    const res = await axios.post('/api/users', body, config);

    //payload would be token if register success
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    //display errors, show alerts for each
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  //prepare data to send
  const body = JSON.stringify({
    email,
    password
  });

  try {
    //get response from axios post request
    const res = await axios.post('/api/auth', body, config);

    //payload would be token if login success
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    //display errors, show alerts for each
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//clear profile and logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
