import React, { Component } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direccion: "",
      link: "Haz una inversión para obtener el LINK de referido",
      registered: false,
      balanceRef: 0,
      totalRef: 0,
      invertido: 0,
      ganado: 0,
      my: 0,
      withdrawn: 0,
      canastas: [(
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+1}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 1 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+2}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 2 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+3}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 3 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+4}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 4 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+5}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 5 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+6}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 6 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+7}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 7 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+8}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 8 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+9}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 9 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+10}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 10 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+11}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 11 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+12}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 12 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+13}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 13 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+14}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 14 (Inactive) </strong></span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+15}>
          <div className="choose__item">
            <span style={{"fontSize" : "22px"}}><br /><strong>Level 15 (Inactive) </strong></span>
          </div>
        </div>
      )
    ]

    };

    this.Investors = this.Investors.bind(this);
    this.Link = this.Link.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.Link(),1*1000);
    setInterval(() => this.Investors(),7*1000);
  };

  async Link() {

    let mydireccion = await window.tronWeb.trx.getAccount();
    console.log(mydireccion);
      mydireccion = window.tronWeb.address.fromHex(mydireccion.address);

      var user = await Utils.contract.users(mydireccion).call();

    if( await Utils.contract.isUserExists(mydireccion).call() ){

      let loc = document.location.href;
      if(loc.indexOf('?')>0){
        loc = loc.split('?')[0]
      }
      

      mydireccion = loc+'?ref='+parseInt(user.id._hex);
      this.setState({
        link: mydireccion,
      });
    }else{
      this.setState({
        link: "Haz una inversión para obtener el LINK de referido",
      });
    }
  }
    

  async Investors() {

    var direccion = await window.tronWeb.trx.getAccount();
    direccion = window.tronWeb.address.fromHex(direccion.address);

    var LAST_LEVEL = 15;

    var canasta = this.state.canastas;

    var invertido = 0;
    var personas = 0;
    var ganado = 0;

    var levelPrice= [];
    var ownerPrice= [];
    levelPrice[1] = 20;
    ownerPrice[1] = 0;
    ownerPrice[4] = 4;
    var i;
    for (i = 2; i <= LAST_LEVEL; i++) {
        levelPrice[i] = levelPrice[i-1] * 2;
        if (i >= 5) {
            ownerPrice[i] = ownerPrice[i-1] * 2;
        }else{
          if (i !== 4) {
            ownerPrice[i] = 0;
          } 
        }
    }

    //console.log(levelPrice);
    //console.log(ownerPrice);

    for (i = 1; i <= LAST_LEVEL; i++) {

      if (await Utils.contract.usersActiveX3Levels(direccion, i).call()) {

        invertido += levelPrice[i];

        var matrix = await Utils.contract.usersX3Matrix(direccion, i).call();
        matrix[3] = parseInt(matrix[3]._hex);

        personas += (matrix[1].length+(matrix[3]*3));

        ganado += (matrix[1].length+(matrix[3]*3))*(ownerPrice[i]);

        //console.log(ganado);
        canasta[i-1] = (
          <div class="col-lg-4 col-md-6 col-12" key={"level"+i}>
            <div class="card">
              <div class="card-body" style={{"background": "rgba(100, 100, 100, 1)"}}>
                <h2> Level {i} || 400</h2>
                <hr/>
                <div class="row">
                  <div class="col-4"><span class="grey"><i class="fa fa-users"></i></span></div>
                  <div class="col-4"><span class="grey"><i class="fa fa-users"></i></span></div>
                  <div class="col-4"><span class="grey"><i class="fa fa-users"></i></span></div>
                </div>
                <p class="card-text"> <br/>
                  <button class="btn btn-secondary">Buyed</button>
                  <br/>
                  <i class="fa fa-users"></i>{matrix[1].length+(matrix[3]*3)}|&nbsp;&nbsp;<i class="fa fa-refresh"></i> {matrix[3]} </p>
              </div>
            </div>
          </div>
          
        );

      }else{

        canasta[i-1] = (
          <div class="col-lg-4 col-md-6 col-12" key={"level"+i}>
            <div class="card">
              <div class="card-body" style={{"background": "rgba(100, 100, 100, 1)"}}>
                <h2> ({i}) 400</h2>
                <hr/>
                <div class="row">
                  <div class="col-4"><span class="grey"><i class="fa fa-users"></i></span></div>
                  <div class="col-4"><span class="grey"><i class="fa fa-users"></i></span></div>
                  <div class="col-4"><span class="grey"><i class="fa fa-users"></i></span></div>
                </div>
                <p class="card-text"> <br/>
                  <button class="btn btn-secondary">Buy level</button>
                  <br/>
                  <i class="fa fa-users"></i>&nbsp;1 |&nbsp;&nbsp;<i class="fa fa-refresh"></i> 0 </p>
              </div>
            </div>
          </div>
        );

      }

      this.setState({
        canastas:canasta
        
      });

    }

    this.setState({
      invertido: invertido,
      ganado: ganado,
      personas: personas
      
    });

  };

  async withdraw(){
    var cosa = await Utils.contract.withdraw().send();
    console.log(cosa);
  };


  render() {

    return (

      <>
<main class="Layout_content__3Ygen">
                <div>
                    <section class="widget Widget_widget__32uL4">

                        <div class="Widget_widgetControls__B4-0r widget-controls">
                            <span>
                                <button id="collapseId-08c297e8-ed01-425e-8d08-93cf64b9410e"><i class="fa fa-angle-down"></i></button>
                            </span>
                            <button id="closeId-08c297e8-ed01-425e-8d08-93cf64b9410e"><strong class="text-gray-light"></strong></button>
                        </div>
                        <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                            <div>
                                <div class="Widget_widgetBody__34soD widget-body">
                                    <div class="row">
                                        <div class="col-12 col-lg-2 col-xl-3">
                                            <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-enable">
                                                <header class="Widget_title__1U9X_">
                                                    <div class="pack-header pack-header-enable">
                                                        <div class="pack-ind"><span class="badge badge-dark-no-border">1</span></div>
                                                        <div class="text-center mb-sm" style={{padding: '5px'}}><h5>100</h5></div>
                                                    </div>
                                                </header>
                                                <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                                                    <div>
                                                        <div class="Widget_widgetBody__34soD widget-body">
                                                            <div class="pack-body">
                                                                <div class="mt row"></div>
                                                                <div class="mt row">
                                                                    <span class="badge-left badge badge-blue-light"><i class="fa fa-users"></i></span><span class="badge-center badge badge-gray"><i class="fa fa-users"></i></span>
                                                                    <span class="badge-right badge badge-gray"><i class="fa fa-users"></i></span>
                                                                </div>
                                                            </div>
                                                            <footer>
                                                                <div color="transparent" class="btn-xs float-left py-0" id="load-parthers-btn"><i class="fa fa-users"></i> 11</div>
                                                                <div color="transparent" class="btn-xs float-right py-0" id="load-notifications-btn"><i class="fa fa-refresh"></i> 5</div>
                                                            </footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                                        </div>
                                        <div class="col-12 col-lg-2 col-xl-3">
                                            <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-enable">
                                                <header class="Widget_title__1U9X_">
                                                    <div class="pack-header pack-header-enable">
                                                        <div class="pack-ind"><span class="badge badge-dark-no-border">2</span></div>
                                                        <div class="text-center mb-sm" style={{padding: '5px'}}><h5>200</h5></div>
                                                    </div>
                                                </header>
                                                <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                                                    <div>
                                                        <div class="Widget_widgetBody__34soD widget-body">
                                                            <div class="pack-body">
                                                                <div class="mt row"></div>
                                                                <div class="mt row">
                                                                    <span class="badge-left badge badge-blue-light"><i class="fa fa-users"></i></span><span class="badge-center badge badge-blue-light"><i class="fa fa-users"></i></span>
                                                                    <span class="badge-right badge badge-gray"><i class="fa fa-users"></i></span>
                                                                </div>
                                                            </div>
                                                            <footer>
                                                                <div color="transparent" class="btn-xs float-left py-0" id="load-parthers-btn"><i class="fa fa-users"></i> 11</div>
                                                                <div color="transparent" class="btn-xs float-right py-0" id="load-notifications-btn"><i class="fa fa-refresh"></i> 5</div>
                                                            </footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                                        </div>
                                        <div class="col-12 col-lg-2 col-xl-3">
                                            <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-enable">
                                                <header class="Widget_title__1U9X_">
                                                    <div class="pack-header pack-header-enable">
                                                        <div class="pack-ind"><span class="badge badge-dark-no-border">3</span></div>
                                                        <div class="text-center mb-sm" style={{padding: '5px'}}><h5>400</h5></div>
                                                    </div>
                                                </header>
                                                <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                                                    <div>
                                                        <div class="Widget_widgetBody__34soD widget-body">
                                                            <div class="pack-body">
                                                                <div class="mt row"></div>
                                                                <div class="mt row">
                                                                    <span class="badge-left badge badge-gray"><i class="fa fa-users"></i></span><span class="badge-center badge badge-gray"><i class="fa fa-users"></i></span>
                                                                    <span class="badge-right badge badge-gray"><i class="fa fa-users"></i></span>
                                                                </div>
                                                            </div>
                                                            <footer>
                                                                <div color="transparent" class="btn-xs float-left py-0" id="load-parthers-btn"><i class="fa fa-users"></i> 11</div>
                                                                <div color="transparent" class="btn-xs float-right py-0" id="load-notifications-btn"><i class="fa fa-refresh"></i> 5</div>
                                                            </footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                                        </div>
                                        <div class="col-12 col-lg-2 col-xl-3">
                                            <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-buy">
                                                <header class="Widget_title__1U9X_">
                                                    <div class="pack-header pack-header-buy">
                                                        <div class="pack-ind">
                                                            <span class="badge badge-dark-no-border">4</span><span class="badge badge-pink"><i class="fa fa-power-off"></i></span>
                                                        </div>
                                                        <div class="text-center mb-sm" style={{padding: '5px'}}><h5>800</h5></div>
                                                    </div>
                                                </header>
                                                <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                                                    <div>
                                                        <div class="Widget_widgetBody__34soD widget-body">
                                                            <div class="pack-body">
                                                                <div class="mt row"></div>
                                                                <div class="mt row">
                                                                    <p class="badge-center"><i class="fa fa-shopping-cart"></i></p>
                                                                    <p class="badge-center badge-top">Activate&nbsp;</p>
                                                                </div>
                                                            </div>
                                                            <footer></footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                                        </div>
                                        <div class="col-12 col-lg-2 col-xl-3">
                                            <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-disabled">
                                                <header class="Widget_title__1U9X_">
                                                    <div class="pack-header pack-header-disabled">
                                                        <div class="pack-ind"><span class="badge badge-dark-no-border">5</span></div>
                                                        <div class="text-center mb-sm" style={{padding: '5px'}}><h5>100</h5></div>
                                                    </div>
                                                </header>
                                                <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                                                    <div>
                                                        <div class="Widget_widgetBody__34soD widget-body">
                                                            <div class="pack-body">
                                                                <div class="mt row"></div>
                                                                <div class="mt row">
                                                                    <p class="badge-center"><i class="fa fa-shopping-cart"></i></p>
                                                                    <p class="badge-center badge-top">&nbsp;</p>
                                                                </div>
                                                            </div>
                                                            <footer></footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                                        </div>
                                        <div class="col-12 col-lg-2 col-xl-3">
                                            <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-disabled">
                                                <header class="Widget_title__1U9X_">
                                                    <div class="pack-header pack-header-disabled">
                                                        <div class="pack-ind"><span class="badge badge-dark-no-border">6</span></div>
                                                        <div class="text-center mb-sm" style={{padding: '5px'}}><h5>200</h5></div>
                                                    </div>
                                                </header>
                                                <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                                                    <div>
                                                        <div class="Widget_widgetBody__34soD widget-body">
                                                            <div class="pack-body">
                                                                <div class="mt row"></div>
                                                                <div class="mt row">
                                                                    <p class="badge-center"><i class="fa fa-shopping-cart"></i></p>
                                                                    <p class="badge-center badge-top">&nbsp;</p>
                                                                </div>
                                                            </div>
                                                            <footer></footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                                        </div>
                                        <div class="col-12 col-lg-2 col-xl-3">
                                            <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-disabled">
                                                <header class="Widget_title__1U9X_">
                                                    <div class="pack-header pack-header-disabled">
                                                        <div class="pack-ind"><span class="badge badge-dark-no-border">7</span></div>
                                                        <div class="text-center mb-sm" style={{padding: '5px'}}><h5>400</h5></div>
                                                    </div>
                                                </header>
                                                <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                                                    <div>
                                                        <div class="Widget_widgetBody__34soD widget-body">
                                                            <div class="pack-body">
                                                                <div class="mt row"></div>
                                                                <div class="mt row">
                                                                    <p class="badge-center"><i class="fa fa-shopping-cart"></i></p>
                                                                    <p class="badge-center badge-top">&nbsp;</p>
                                                                </div>
                                                            </div>
                                                            <footer></footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                                        </div>
                                        <div class="col-12 col-lg-2 col-xl-3">
                                            <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-disabled">
                                                <header class="Widget_title__1U9X_">
                                                    <div class="pack-header pack-header-disabled">
                                                        <div class="pack-ind"><span class="badge badge-dark-no-border">8</span></div>
                                                        <div class="text-center mb-sm" style={{padding: '5px'}}><h5>800</h5></div>
                                                    </div>
                                                </header>
                                                <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                                                    <div>
                                                        <div class="Widget_widgetBody__34soD widget-body">
                                                            <div class="pack-body">
                                                                <div class="mt row"></div>
                                                                <div class="mt row">
                                                                    <p class="badge-center"><i class="fa fa-shopping-cart"></i></p>
                                                                    <p class="badge-center badge-top">&nbsp;</p>
                                                                </div>
                                                            </div>
                                                            <footer></footer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                                        </div>
                                    </div>
                                    <footer class="text-sm card-footer" style={{height: '50px', maxHeight: '50px'}}>
                                        <div class="mt row">
                                            <div class="col-12 col-md-3">
                                                <div color="transparent" class="btn-xs float-left py-0" id="load-notifications-btn" style={{height: '45px', maxHeight: '45px'}}><i class="fa fa-refresh"></i> Recycle count</div>
                                            </div>
                                            <div class="col-12 col-md-3">
                                                <div color="transparent" class="btn-xs float-left py-0" id="load-notifications-btn" style={{height: '45px', maxHeight: '45px'}}><i class="fa fa-users"></i> Number partners in the slot</div>
                                            </div>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
                </div>
            </main></>
      
    );
  }
}
