export const SAVE_EMAIL = 'SAVE_EMAIL';
export const LOG_EXPENSE = 'LOG_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const logExpense = (expense) => ({
  type: LOG_EXPENSE,
  expense,
});

export const getCurrencies = (curr) => ({
  type: GET_CURRENCIES,
  curr,
});

export const fetchCurrency = () => (
  async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    return dispatch(getCurrencies(currencies));
  }
);
