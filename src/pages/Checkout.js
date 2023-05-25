import React from 'react';
import ShowItens from '../components/ShowItens';
import UserInfo from '../components/UserInfo';

class Checkout extends React.Component {
  render() {
    return (

      <div>

        <ShowItens />
        <UserInfo />

      </div>

    );
  }
}

export default Checkout;
