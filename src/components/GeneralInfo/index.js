import React, { Component } from "react";

import CrowdFunding from "../CrowdFunding";
import TronLinkInfo from "../TronLinkInfo";
export default class GeneralInfo extends Component {
  
  render() {

      return (        
        <nav class="Sidebar_root__3k9LL">
        <main class="Sidebar_content__1DsCZ">
                        <CrowdFunding />  
            <div class="row">     
                <table class="table">
                    <tbody>
                        <tr>
                            <td>
                                <p style={{fontSize: '16px'}}>My id</p>
                                <p style={{fontSize: '16px'}}>Wallet</p>
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <p style={{fontWeight: 'bold', fontSize: '16px'}}>12</p>
                                <p style={{textAlign: 'right',fontSize: '16px'}}>1e356n5y5hh <i class="fa fa-clipboard text-white"></i></p>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontSize: '16px', textAlign: 'left'}}>My partners</td>
                            <td><p style={{fontSize: '16px', textAlign: 'right'}}>11</p></td>
                        </tr>
                        <tr>
                            <td style={{fontSize: '16px', textAlign: 'left'}}>l earned</td>
                            <td style={{textAlign: 'right'}}>
                                <p style={{fontSize: '16px'}}>$23232</p>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row"></div>
            <div class="row"></div>
            <div class="row">
                <section class="widget Widget_widget__32uL4">
                    <header class="Widget_title__1U9X_"><div class="mt-0" style={{padding: '10px'}}>My affiliate link</div></header>
                    <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                        <div>
                            <div class="Widget_widgetBody__34soD widget-body">
                                <form>
                                    <div class="mt form-group">
                                        <div class="input-group input-group">
                                            <input id="link" required="" name="link" placeholder="Link" type="text" class="input-transparent pl-3 form-control" />
                                            <div class="bg-transparent input-group-prepend">
                                                <span class="input-group-text"><i class="fa fa-clipboard text-white"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt form-group"><button type="submit" class="auth-btn btn btn-success btn-sm" style={{color: 'white', width: '90%'}}>Copy referal link</button></div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
            </div>
        </main>
    </nav>   
      );
  }
}
