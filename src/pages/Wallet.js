import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import SpendingTable from '../components/SpendingTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <SpendingTable />
      </div>
    );
  }
}

export default Wallet;
