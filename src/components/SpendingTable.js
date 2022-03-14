import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SpendingTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{exp.description}</td>
              <td>{exp.tag}</td>
              <td>{exp.method}</td>
              <td>{parseFloat(exp.value).toFixed(2)}</td>
              <td>{exp.exchangeRates[exp.currency].name}</td>
              <td>{parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
              <td>{(exp.value * exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

SpendingTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(SpendingTable);
