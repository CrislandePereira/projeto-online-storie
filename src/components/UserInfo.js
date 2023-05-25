/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { clearCart } from '../services/cart';
import barcode from '../assets/barcode.svg';
import Visa from '../assets/Visa.svg';
import MasterCard from '../assets/MasterCard.svg';
import elo from '../assets/elo.svg';
import './UserInfo.css';

class UserInfo extends React.Component {
  state = {
    nome: '',
    email: '',
    cep: '',
    telefone: '',
    cpf: '',
    endereco: '',
    cidade: '',
    estado: '',
    complemento: '',
    numero: '',
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
    const {
      nome, email, cep, cpf, telefone,
      endereco, payment, cidade, numero,
      complemento, estado } = this.state;
    if (!this.validateEmail(email)
    || !nome || !cep || !cpf
    || !telefone || !endereco || !payment
    || !cidade || !numero || !estado || !complemento) {
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
        cidade: '',
        estado: '',
        complemento: '',
        numero: '',
        error: false,
      },
    );
    const { history } = this.props;
    clearCart();
    history.push('/');
  };

  render() {
    const { nome, email, cep, cpf, telefone,
      endereco, error, cidade, complemento, numero, estado } = this.state;
    return (
      <div className="div-info-comprador">
        <div className="infos-comprador">
          <h1>Informações do Comprador</h1>
          <div className="campos-preencher">
            <div className="inputs-info">
              <input
                className="input-1"
                data-testid="checkout-fullname"
                type="text"
                placeholder="Nome Completo"
                required
                maxLength={ 60 }
                name="nome"
                value={ nome }
                onChange={ this.onChange }
              />
              <input
                className="input-2"
                data-testid="checkout-cpf"
                type="text"
                placeholder="CPF"
                required
                onChange={ this.onChange }
                minLength={ 11 }
                name="cpf"
                value={ cpf }
              />
            </div>
            <div className="inputs-info">
              <input
                className="input-1"
                data-testid="checkout-email"
                type="text"
                placeholder="Email"
                required
                onChange={ this.onChange }
                name="email"
                value={ email }
              />
              <input
                className="input-2"
                data-testid="checkout-phone"
                type="text"
                placeholder="Telefone"
                required
                onChange={ this.onChange }
                name="telefone"
                value={ telefone }
              />
            </div>
            <div className="inputs-info">
              <input
                data-testid="checkout-cep"
                type="text"
                className="input-middle-1"
                placeholder="CEP"
                required
                onChange={ this.onChange }
                name="cep"
                value={ cep }
              />
              <input
                data-testid="checkout-address"
                type="text"
                className="input-middle-2"
                placeholder="Endereço"
                required
                onChange={ this.onChange }
                maxLength={ 100 }
                name="endereco"
                value={ endereco }
              />
            </div>
            <div className="inputs-info">
              <input
                className="input-3"
                type="text"
                placeholder="Complemento"
                required
                maxLength={ 50 }
                name="complemento"
                value={ complemento }
              />
              <input
                className="input-4"
                type="number"
                placeholder="Número"
                required
                maxLength={ 10 }
                name="numero"
                value={ numero }
              />
            </div>
            <div className="inputs-info">
              <input
                className="input-3"
                placeholder="Cidade"
                type="text"
                name="cidade"
                value={ cidade }
                required
                maxLength={ 100 }
              />
              <select name="estado" value={ estado } className="input-4">
                <option placeholder="Estado" value="estado">Estado</option>
                <option value="estado">Acre</option>
                <option value="estado">Alagoas</option>
                <option value="estado">Amapá</option>
                <option value="estado">Amazonas</option>
                <option value="estado">Bahia</option>
                <option value="estado">Ceará</option>
                <option value="estado">Distrito Federal</option>
                <option value="estado">Espírito Santo</option>
                <option value="estado">Goiás</option>
                <option value="estado">Maranhão</option>
                <option value="estado">Mato Grosso</option>
                <option value="estado">Mato Grosso do Sul</option>
                <option value="estado">Minas Gerais</option>
                <option value="estado">Pará</option>
                <option value="estado">Paraíba</option>
                <option value="estado">Paraná</option>
                <option value="estado">Pernambuco</option>
                <option value="estado">Piauí</option>
                <option value="estado">Rio de Janeiro</option>
                <option value="estado">Rio Grande do Norte</option>
                <option value="estado">Rio Grande do Sul</option>
                <option value="estado">Rondônia</option>
                <option value="estado">Roraima</option>
                <option value="estado">Santa Catarina</option>
                <option value="estado">São Paulo</option>
                <option value="estado">Sergipe</option>
                <option value="estado">Tocantins</option>
              </select>
            </div>
          </div>

          <div className="payment-div">
            <h1>Método de Pagamento</h1>
            <div className="payment-forms">
              <div className="boleto">
                <span>Boleto</span>
                <label>
                  <input
                    data-testid="ticket-payment"
                    type="radio"
                    name="payment"
                    onChange={ this.onChange }
                  />
                  <img className="icon" src={ barcode } alt="Boleto" />
                </label>
              </div>

              <div className="credict-card">
                <span>Cartão de Crédito</span>
                <div className="icones">
                  <label>
                    <input
                      data-testid="visa-payment"
                      type="radio"
                      onChange={ this.onChange }
                      name="payment"
                    />
                    <img className="icon" src={ Visa } alt="Visa" />
                    <input
                      data-testid="master-payment"
                      type="radio"
                      onChange={ this.onChange }
                      name="payment"
                    />
                    <img className="icon" src={ MasterCard } alt="MasterCard" />
                    <input
                      data-testid="elo-payment"
                      type="radio"
                      onChange={ this.onChange }
                      name="payment"
                    />
                    <img className="icon" src={ elo } alt="Elo" />
                  </label>
                </div>
              </div>
            </div>

          </div>

          <button
            className="btn-comprar"
            data-testid="checkout-btn"
            onClick={ this.sentCheckout }
          >
            Comprar
          </button>
        </div>
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
