import {
  GET_PORTFOLIO,
  // GET_STOCKS,
  PORTFOLIO_ERROR,
  CLEAR_PORTFOLIO,
  UPDATE_PORTFOLIO
} from '../actions/types';

const initialState = {
  portfolio: null,
  stocks: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_PORTFOLIO:
    case UPDATE_PORTFOLIO:
      return {
        ...state,
        portfolio: payload,
          loading: false
      };
      // case GET_STOCKS:
      //   return {
      //     ...state,
      //     stocks: payload,
      //       loading: false
      //   };
    case PORTFOLIO_ERROR:
      return {
        ...state,
        error: payload,
          loading: false
      };
    case CLEAR_PORTFOLIO:
      return {
        ...state,
        portfolio: null,
          loading: false
      };
    default:
      return state;
  }
}