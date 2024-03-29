import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from '../actions/types';

const initialState = {
  //store token in local storage
  token: localStorage.getItem('token'),
  //if success authenticated = true
  isAuthenticated: null,
  //if response loaded then loading status = false
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  //destructure
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // case LOGIN_SUCCESS, set token
      localStorage.setItem('token', payload.token);
      //current state
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      //remove everything in storage from that token
      localStorage.removeItem('token');
      //without payload
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
