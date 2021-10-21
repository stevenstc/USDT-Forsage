import React, { Component } from "react";

export default class TronLinkInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountAddress: "Billetera NO conectada",
      accountBalance: "Billetera NO conectada",
      accountBandwidth: "Billetera NO conectada"
    };
  };

  
  componentDidMount() {
    setInterval(() => this.fetchAccountAddress(),1000);
    setInterval(() => this.fetchAccountBalance(),1000);
    setInterval(() => this.fetchAccountBandwidth(),1000);
  };


  async fetchAccountAddress() {
    const account =  await window.tronWeb.trx.getAccount();
    const accountAddress = account.address;
    const accountAddressInBase58 = window.tronWeb.address.fromHex(
      accountAddress
    );

    this.setState({
      accountAddress: accountAddressInBase58
    });
  };

  async fetchAccountBalance() {
    const balanceInSun = await window.tronWeb.trx.getBalance(); //number
    const balanceInTRX = window.tronWeb.fromSun(balanceInSun); //string
    //const changeBackToSun = window.tronWeb.toSun(balanceInTRX); //string

    this.setState({
      //accountBalance: balanceInSun // Muestra el balance en SUN
      accountBalance: balanceInTRX
    });
  };
  //
  // // La funcion aqui abajo muestra el ancho de banda como un numero
  async fetchAccountBandwidth() {
    const accountBandwidth = await window.tronWeb.trx.getBandwidth(); // number

    this.setState({
      accountBandwidth: accountBandwidth
    });
  };


  render() {
    const { accountAddress, accountBalance } = this.state;
    return (

      <>
        
        <h2>
          Wallet:
        </h2>
        <p>
            <strong style={{"word-break":"break-all"}}>{accountAddress}</strong><br/><br/>

          <strong>Balance:</strong><br/>
            {accountBalance} <strong>TRX</strong><br/>
            
        </p>
      </>

    
    );
  };
}
