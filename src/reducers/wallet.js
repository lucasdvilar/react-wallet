import { LOG_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_EXPENSE:
    return { expenses: [...state.expenses, action.expense] };
  default:
    return state;
  }
};

export default walletReducer;
