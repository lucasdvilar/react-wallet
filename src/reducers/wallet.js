import { DELETE_EXPENSE, LOG_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_EXPENSE:
    return { expenses: [...state.expenses, action.expense] };
  case DELETE_EXPENSE: {
    const newState = state.expenses.filter((exp) => exp.id !== action.expenseId);
    return { expenses: newState };
  }
  default:
    return state;
  }
};

export default walletReducer;
