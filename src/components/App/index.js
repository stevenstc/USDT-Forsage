import React, { Component } from "react";
import TronWeb from "tronweb";

import Utils from "../../utils";
import BackOffice from "../BackOffice";
import TronLinkGuide from "../TronLinkGuide";


const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };
  }

  async componentDidMount() {
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {

          console.log("intento "+tries);

          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false
            }
          });
          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) {
          return tries++;
        }

        this.setState({
          tronWeb: tronWebState
        });

        resolve();
      }, 1000);
    });

    if (!this.state.tronWeb.loggedIn) {
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object if TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS
      };

      window.tronWeb.on("addressChange", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true
          }
        });
      });
    }

    Utils.setTronWeb(window.tronWeb);

    if(!this.state.tronWeb.loggedIn){
        document.location.reload();
    }
  }

  render() {
    var getString = "/";
    var loc = document.location.href;
    var interrogant = "";
    //console.log(loc);
    if(loc.indexOf('?')>0){
              
      getString = loc.split('?')[1];
      getString = getString.split('#')[0];
      interrogant = "?";
    }

    if (!this.state.tronWeb.installed) return (
      <>
        <div className="container">
          <TronLinkGuide />
        </div>
      </>
      );

    if (!this.state.tronWeb.loggedIn) return (
      <>
        <div className="container">
          <TronLinkGuide installed />
        </div>
      </>
      );

      switch (getString) {
        case "BackOffice": 
        case "backOffice":
        case "backoffice": return(<BackOffice url={interrogant+getString}/>);
  
        case "ViewOffice": 
        case "viewOffice": 
        case "viewoffice": return(<BackOffice url={interrogant+getString}/>);
      
        default:  return(<BackOffice url={interrogant+getString}/>);
      }


  }
}
export default App;

