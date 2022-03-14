import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logExpense, fetchCurrency } from '../actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD', // ?
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
      exchangeRates: {},
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
  }

  async componentDidMount() {
    const { getExchange } = this.props;
    await getExchange();
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async saveInfo() {
    const { saveExpense, getExchange } = this.props;
    const { id } = this.state;
    await getExchange();
    const { curr } = this.props;
    this.setState({ exchangeRates: curr });
    saveExpense(this.state);
    this.setState({ id: id + 1, value: '' });
  }

  render() {
    const { value } = this.state;
    const { curr } = this.props;
    return (
      <form>
        <input
          data-testid="value-input"
          placeholder="Valor"
          onChange={ this.onInputChange }
          name="value"
          value={ value }
        />
        <input
          data-testid="description-input"
          placeholder="Descrição"
          onChange={ this.onInputChange }
          name="description"
        />
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            onChange={ this.onInputChange }
            name="currency"
            id="currency"
          >
            {Object.keys(curr)
              .filter((el) => el !== 'USDT')
              .map((cur) => (
                <option
                  key={ cur }
                  data-testid={ cur }
                >
                  {cur}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            data-testid="method-input"
            onChange={ this.onInputChange }
            name="method"
            id="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            data-testid="tag-input"
            onChange={ this.onInputChange }
            name="tag"
            id="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.saveInfo }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  getExchange: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  curr: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  curr: state.currency.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(logExpense(expense)),
  getExchange: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
