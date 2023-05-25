import React from 'react';
import PropTypes from 'prop-types';
import { clearCart } from '../services/cart';

class UserInfo extends React.Component {
  state = {
    nome: '',
    email: '',
    cep: '',
    telefone: '',
    cpf: '',
    endereco: '',
    error: false,
    payment: '',
  };

  validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  sentCheckout = () => {
    const { nome, email, cep, cpf, telefone, endereco, payment } = this.state;
    if (!this.validateEmail(email)
    || !nome || !cep || !cpf || !telefone || !endereco || !payment) {
      this.setState((prevState) => ({
        ...prevState,
        error: true,
      }));
      return;
    }
    this.setState(
      {
        nome: '',
        email: '',
        cep: '',
        telefone: '',
        cpf: '',
        endereço: '',
        error: false,
      },
    );
    const { history } = this.props;
    clearCart();
    history.push('/');
  };

  render() {
    const { nome, email, cep, cpf, telefone, endereco, error } = this.state;
    return (
      <div>
        <h1>Informações do Comprador</h1>
        <input
          data-testid="checkout-fullname"
          type="text"
          placeholder="nome-completo"
          required
          maxLength={ 60 }
          name="nome"
          value={ nome }
          onChange={ this.onChange }
        />
        <input
          data-testid="checkout-email"
          type="text"
          placeholder="email"
          required
          onChange={ this.onChange }
          name="email"
          value={ email }
        />
        <input
          data-testid="checkout-cep"
          type="text"
          placeholder="cep"
          required
          onChange={ this.onChange }
          name="cep"
          value={ cep }
        />
        <input
          data-testid="checkout-phone"
          type="text"
          placeholder="telefone"
          required
          onChange={ this.onChange }
          name="telefone"
          value={ telefone }
        />
        <input
          data-testid="checkout-cpf"
          type="text"
          placeholder="CPF"
          required
          onChange={ this.onChange }
          minLength={ 11 }
          name="cpf"
          value={ cpf }
        />
        <input
          data-testid="checkout-address"
          type="text"
          placeholder="endereço"
          required
          onChange={ this.onChange }
          maxLength={ 100 }
          name="endereco"
          value={ endereco }
        />

        <div>
          <h1>Método de Pagamento</h1>
          <label>
            Boleto
            <input
              data-testid="ticket-payment"
              type="radio"
              name="payment"
              onChange={ this.onChange }
            />
          </label>
          <br />
          <label>
            Cartão de Crédito:
            <input
              data-testid="visa-payment"
              type="radio"
              onChange={ this.onChange }
              name="payment"
            />
            Visa
            <input
              data-testid="master-payment"
              type="radio"
              onChange={ this.onChange }
              name="payment"
            />
            MasterCard
            <input
              data-testid="elo-payment"
              type="radio"
              onChange={ this.onChange }
              name="payment"
            />
            Elo
          </label>

        </div>

        <button
          data-testid="checkout-btn"
          onClick={ this.sentCheckout }
        >
          Comprar
        </button>
        { error && <p data-testid="error-msg">Campos inválidos</p> }
      </div>
    );
  }
}
UserInfo.propTypes = { history: PropTypes.shape({
  push: PropTypes.func,
}),
};
UserInfo.defaultProps = {
  history: {
    push: () => {},
  },
};
export default UserInfo;
