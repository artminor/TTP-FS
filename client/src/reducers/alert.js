import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  //type mendatory
  const { type, payload } = action;

  switch (type) {
    //state is immutable
    case SET_ALERT:
      return [...state, payload];
    //remove alert by id
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
