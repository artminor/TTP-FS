import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

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
