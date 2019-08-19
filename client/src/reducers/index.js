import {
  combineReducers
} from 'redux';
import alert from './alert';
import auth from './auth';
import portfolio from './portfolio';

export default combineReducers({
  alert,
  auth,
  portfolio
});