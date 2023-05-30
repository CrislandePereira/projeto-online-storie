/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ShowItens from '../components/ShowItens';
import UserInfo from '../components/UserInfo';
import Header from '../components/Header';
import './Checkout.css';

class Checkout extends React.Component {
  handleSearch = (search) => {
    const { history } = this.props;
    history.push(`/?q=${search}`);
  };

  render() {
    const { history } = this.props;

    return (

      <div>
        <Header onSearch={ this.handleSearch } />
        <div className="checkout-page">
          <ShowItens history={ history } />
          <UserInfo />
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Checkout);
