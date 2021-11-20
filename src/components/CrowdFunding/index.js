import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {

      texto: "Loading...",
      sponsor: "",
      level: "Loading...",
      levelPrice: 0,
      balanceUSDT: "Loading...",
      aprovedUSDT: 0,
      contractUSDT:{}
  

    };

    this.deposit = this.deposit.bind(this);
    this.estado = this.estado.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    this.estado();
    setInterval(() => this.estado(),1*1000);
  };

  async estado(){
    
    var accountAddress = window.tronWeb.defaultAddress.base58

    //console.log(accountAddress);

    var activeLevels = 0;

    for (var i = 15; i >= 0; i--) {

      if (await Utils.contract.usersActiveX3Levels(accountAddress, i).call()) {
        activeLevels++ ;
      }
      
    }

    var levelPrice = await Utils.contract.levelPrice(activeLevels+1).call();

    var tokenAddress = await Utils.contract.tokenUSDT().call();

    const contractUSDT = await window.tronWeb.contract().at(tokenAddress);

    var balanceUSDT = await contractUSDT.balanceOf(accountAddress).call();

    balanceUSDT = parseInt(balanceUSDT._hex)/10**6;

    var aproved = await contractUSDT.allowance(accountAddress, contractAddress).call();

    //console.log(aproved);

    aproved = parseInt(aproved.remaining._hex)/10**6;

    var text;
    if(aproved > 0){
      if (activeLevels === 0){
        text = "Register and buy the first level"
      }else{
        text = "Buy next level"
      }
      
    }else{
      text = "Link Wallet"
    }

    this.setState({
      level: activeLevels,
      levelPrice: parseInt(levelPrice._hex)/10**6,
      balanceUSDT: balanceUSDT,
      texto: text,
      aprovedUSDT: aproved,
      contractUSDT: contractUSDT
    });

    //console.log(min);
  }

  async deposit() {

    const { level, levelPrice, balanceUSDT, aprovedUSDT, contractUSDT} = this.state;

    var amount = levelPrice;

    amount = parseFloat(amount);

    var accountAddress =  window.tronWeb.defaultAddress.base58;

    var balanceInTRX  = await window.tronWeb.trx.getBalance(); //number
    balanceInTRX = balanceInTRX/10**6;

    console.log(balanceInTRX);
    console.log(amount);

    var owner = await Utils.contract.owner().call();

    var direccionSP = window.tronWeb.address.fromHex(owner);

    var aproved = aprovedUSDT;

    if ( aproved <= 0 ) {
      await contractUSDT.approve(contractAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send();
      return;
    }

    var LAST_LEVEL = await Utils.contract.LAST_LEVEL().call();

    if ( balanceInTRX >= 50 && aproved >= amount && balanceUSDT >= amount && level < LAST_LEVEL){

      var loc = document.location.href;
      if(loc.indexOf('?')>0){
          var getString = loc.split('?')[1];
          var GET = getString.split('&');
          var get = {};
          for(var i = 0, l = GET.length; i < l; i++){
              var tmp = GET[i].split('=');
              get[tmp[0]] = unescape(decodeURI(tmp[1]));
          }
          
          if (get['ref']) {
            tmp = get['ref'].split('#');

            var inversor = await Utils.contract.idToAddress(tmp[0]).call();

            if ( await Utils.contract.isUserExists(inversor).call() ) {

              direccionSP = window.tronWeb.address.fromHex(inversor);
            
            }
          }     
        }

        this.setState({
          sponsor: direccionSP
        });


        if ( await Utils.contract.isUserExists(accountAddress).call() ) {


          await Utils.contract.buyNewLevel(level+1, amount*10**6).send();


        }else{

          await Utils.contract.registrationExt(direccionSP, amount*10**6).send();

        }


        

    }else{
      
      if (amount > 200 && balanceInTRX > 250) {

        if ( amount > balanceInTRX) {
          if (balanceInTRX <= 50) {
            window.alert("You do not have enough funds in your account you place at least 250 TRX");
          }else{
            document.getElementById("amount").value = balanceInTRX-50;
            window.alert("You must leave 50 TRX free in your account to make the transaction");
          }
          
          

        }else{

          document.getElementById("amount").value = amount-50;
          window.alert("You must leave 50 TRX free in your account to make the transaction");
          
        }
      }else{
        window.alert("You do not have enough funds in your account you place at least 250 TRX");
      }
    }
    
  };


  render() {
    
    return (
      <>
        <div class="row">     
        <img src="/images/TMC-blanco-verde.svg" width="100%" alt="TMC"></img>
          <table class="table">
              <tbody> 
                  <tr>
                      <td>
                          <p style={{fontSize: '18px'}}>Balance</p>
                          <p style={{fontSize: '18px'}}>Level</p>                                
                      </td>
                      <td style={{textAlign: 'right'}}>
                          <p style={{fontSize: '18px'}}>{this.state.balanceUSDT} <strong>USDT</strong></p>
                          <p style={{fontSize: '18px'}}>{this.state.level}</p>
                      </td>
                  </tr>                        
              </tbody>
          </table>
        </div>      
        <div class="row">
        <table class="table">
              <tbody>
                  <tr>
                      <td>
                          <p style={{fontSize: '16px'}}><button onClick={() => this.deposit()} type="submit" class="auth-btn btn btn-success btn-sm" style={{color: 'white', width: '100%'}}>{this.state.texto}</button></p>
                      </td>
                  </tr> 
                  <tr>
                      <td>
                      <p style={{fontSize: '16px'}}>Price {this.state.levelPrice} USDT</p>
                      <p style={{fontSize: '16px'}}>You must have ~ 50 TRX to make the transaction</p>
                      </td>
                  </tr>                        
              </tbody>
          </table>               
        </div>
      </>
    );
  }
}
