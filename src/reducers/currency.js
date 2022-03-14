import { GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: {},
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { currencies: action.curr };
  default:
    return state;
  }
};

export default currencyReducer;
