import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  getTotal(expenses) {
    let total = 0;
    expenses.forEach((exp) => {
      const value = parseFloat(exp.value);
      const curr = exp.currency;
      const exchange = value * exp.exchangeRates[curr].ask;
      total += exchange;
    });
    return total;
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{ this.getTotal(expenses).toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
