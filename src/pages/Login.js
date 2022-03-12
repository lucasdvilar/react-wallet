import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      isDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.checkInputs);
  }

  onLogin() {
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  checkInputs() {
    const { email, senha } = this.state;
    const MIN_CHAR = 6;
    if (email.includes('@') && email.endsWith('.com') && senha.length >= MIN_CHAR) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled } = this.state;

    return (
      <div>
        <input
          placeholder="Email"
          data-testid="email-input"
          onChange={ this.onInputChange }
          name="email"
        />
        <input
          placeholder="Senha"
          data-testid="password-input"
          onChange={ this.onInputChange }
          name="senha"
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.onLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
