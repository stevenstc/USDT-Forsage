import React, { Component } from "react";

import Utils from "../../utils";
import contractAddress from "../Contract";

import CrowdFunding from "../CrowdFunding";
export default class GeneralInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "N/A",
            link: "Haz una inversión para obtener el LINK de referido"
        }

        this.Link = this.Link.bind(this);
    }

    async componentDidMount() {
        await Utils.setContract(window.tronWeb, contractAddress);
        setInterval(() => this.Link(), 1 * 1000);
      }

    async Link() {
        let mydireccion = await window.tronWeb.trx.getAccount();

        mydireccion = window.tronWeb.address.fromHex(mydireccion.address);
    
        var user = await Utils.contract.users(mydireccion).call();
    
        if (await Utils.contract.isUserExists(mydireccion).call()) {
          let loc = document.location.href;
          if (loc.indexOf("?") > 0) {
            loc = loc.split("?")[0];
          }
    
          mydireccion = loc + "?ref=" + parseInt(user.id._hex);
          this.setState({
            id: parseInt(user.id._hex),
            link: mydireccion,
          });
        } else {
          this.setState({
              id: "N/A",
            link: "Haz una inversión para obtener el LINK de referido",
          });
        }
      }
  
  render() {

      return (        
        <nav className="Sidebar_root__3k9LL">
        <main className="Sidebar_content__1DsCZ">
                        <CrowdFunding />  
            <div className="row">     
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <p style={{fontSize: '16px'}}>My id</p>
                                <p style={{fontSize: '16px'}}>Wallet</p>
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <p style={{fontWeight: 'bold', fontSize: '16px'}}>{this.state.id}</p>
                                <p style={{textAlign: 'right',fontSize: '16px', wordBreak:'break-all'}}>{window.tronWeb.defaultAddress.base58} <i className="fa fa-clipboard text-white"></i></p>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row">
                <section className="widget Widget_widget__32uL4">
                    <header className="Widget_title__1U9X_"><div className="mt-0" style={{padding: '10px'}}>My affiliate link</div></header>
                    <div aria-hidden="false" className="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                        <div>
                            <div className="Widget_widgetBody__34soD widget-body">
                                <form>
                                    <div className="mt form-group">
                                        <div className="input-group input-group">
                                            <input id="link" required="" name="link" placeholder="Link" value={this.state.link} type="text" className="input-transparent pl-3 form-control" disabled/>
                                            <div className="bg-transparent input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-clipboard text-white"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt form-group"><button type="button" className="auth-btn btn btn-success btn-sm" onClick={() => {navigator.clipboard.writeText(this.state.link); window.alert("link copied!")}} style={{color: 'white', width: '90%'}}>Copy referal link</button></div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
            </div>
        </main>
    </nav>   
      );
  }
}
