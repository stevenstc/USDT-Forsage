import React, { Component } from "react";

import CrowdFunding from "../CrowdFunding";
import Oficina from "../Oficina";
import TronLinkInfo from "../TronLinkInfo";

export default class BackOffice extends Component {
  
  render() {

      return (
        <>
          
    <div className="col-lg-4 col-sm-12">
      <div className="jumbotron  text-white text-center" style={{"background": "rgba(100, 100, 100, 0.24)"}}> <img src="images/TMC-blanco-verde.svg" alt="" className="img-fluid" />
		  <hr/>
      <TronLinkInfo tronWeb={window.tronWeb}/>

            <CrowdFunding />
        <p ><b>Id:</b> <br />
          <b>Wallet:</b><br />
          <b>My partners:</b><br/>
        </p>
        <hr />
        <p> <b>Earned:</b> <br />
          23423432 <b>TRX</b> ($23232)</p>
        <div className="row justify-content-center text-center">
          <div className="col-auto">
            <p>
              <input type="text" id="linkref" disabled />
              <a className="btn btn-success btn-lg" href="#" role="button">Copy Referal Link</a> </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-sm-12">
      <div class="jumbotron text-white text-center" style={{"background": "rgba(100, 100, 100, 0.24)"}}>
        <div class="row">
          <Oficina /> 
    
        </div>
        <p class="text-center">contador de ciclos y personas</p>
      </div>
    </div>
            
                          
            
      </>
      );
  }
}
