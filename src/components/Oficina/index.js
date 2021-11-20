import React, { Component } from "react";
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
        <div className="col-lg-3" key={"level"+1}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 1 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+2}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 2 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+3}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 3 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+4}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 4 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+5}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 5 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+6}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 6 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+7}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 7 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+8}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 8 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+9}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 9 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+10}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 10 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+11}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 11 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+12}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 12 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+13}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 13 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+14}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 14 (Inactive) </strong>
            </span>
          </div>
        </div>
      ),
      (
        <div className="col-lg-3" key={"level"+15}>
          <div className="choose__item">
            <span style={{ fontSize: "22px" }}>
              <br />
              <strong>Level 15 (Inactive) </strong>
            </span>
          </div>
        </div>
        ),
      ],
    };

    this.Investors = this.Investors.bind(this);
    this.Link = this.Link.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.Link(), 1 * 1000);
    setInterval(() => this.Investors(), 7 * 1000);
  }

  async Link() {
    let mydireccion = await window.tronWeb.trx.getAccount();
    console.log(mydireccion);
    mydireccion = window.tronWeb.address.fromHex(mydireccion.address);

    var user = await Utils.contract.users(mydireccion).call();

    if (await Utils.contract.isUserExists(mydireccion).call()) {
      let loc = document.location.href;
      if (loc.indexOf("?") > 0) {
        loc = loc.split("?")[0];
      }

      mydireccion = loc + "?ref=" + parseInt(user.id._hex);
      this.setState({
        link: mydireccion,
      });
    } else {
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

    var levelPrice = [];
    var ownerPrice = [];
    levelPrice[1] = 20;
    ownerPrice[1] = 0;
    ownerPrice[4] = 4;
    var i;
    for (i = 2; i <= LAST_LEVEL; i++) {
      levelPrice[i] = levelPrice[i - 1] * 2;
      if (i >= 5) {
        ownerPrice[i] = ownerPrice[i - 1] * 2;
      } else {
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

        personas += matrix[1].length + matrix[3] * 3;

        ganado += (matrix[1].length + matrix[3] * 3) * ownerPrice[i];

        var rango = matrix[1].length + ((matrix[3] * 3) % 3);
        var estilo1, estilo2, estilo3;
        switch (rango) {
          case 1:
            estilo1 = "badge-on";
            estilo2 = "";
            estilo3 = "";

            break;
          case 2:
            estilo1 = "badge-on";
            estilo2 = "badge-on";
            estilo3 = "";

            break;

          case 0:
            estilo1 = "badge-on";
            estilo2 = "badge-on";
            estilo3 = "badge-on";

            break;

          default:
            break;
        }
        if (rango) {
        }

        //console.log(ganado);
        canasta[i-1] = (
          <div class="col-lg-4"  key={"level"+i}>
              <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-enable">
                  <header class="Widget_title__1U9X_">
                      <div class="pack-header pack-header-enable">
                          <div class="pack-ind"><span class="badge badge-dark-no-border">{i}</span></div>
                          <div class="text-center mb-sm" style={{padding: '5px'}}><h6>{"       "}{20 ** i}</h6></div>
                      </div>
                  </header>
                  <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                      <div>
                          <div class="Widget_widgetBody__34soD widget-body">
                              <div class="pack-body">
                                  <div class="mt row">
                                      <span class={"badge-left badge " + estilo1}><i class="fa fa-users"></i></span>
                                      <span class={"badge-center badge " + estilo2}><i class="fa fa-users"></i></span>
                                      <span class={"badge-right badge  "  + estilo3}><i class="fa fa-users"></i></span>
                                  </div>
                                  <div class="mt row"></div>
                                  <div class="mt row"></div>
                                  <div class="mt row">
                                  <div class="text-center mb-sm" style={{position:'relative',left: '20%'}}><button type="submit" class="auth-btn btn btn-success" style={{color: 'white', width:'100%'}}>Buyed</button></div>
                                    
                                  </div>
                              </div>
                              <footer>
                                  <div color="transparent" class="btn-xs float-left py-0" id="load-parthers-btn"><i class="fa fa-users"></i> {matrix[1].length+(matrix[3]*3)}</div>
                                  <div color="transparent" class="btn-xs float-right py-0" id="load-notifications-btn"><i class="fa fa-refresh"></i> {matrix[3]}</div>
                              </footer>
                          </div>
                      </div>
                  </div>
              </section>
              <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
          </div>
        );

      } else {
        canasta[i-1] = (          
              <div class="col-lg-4"  key={"level"+i}>
              <section class="widget Widget_widget__32uL4 widget-auth mx-auto pack pack-enable">
                  <header class="Widget_title__1U9X_">
                      <div class="pack-header pack-header-enable">
                          <div class="pack-ind"><span class="badge badge-dark-no-border">{i}</span></div>
                          <div class="text-center mb-sm" style={{padding: '5px'}}><h6>{20 ** i}</h6></div>
                      </div>
                  </header>
                  <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
                      <div>
                          <div class="Widget_widgetBody__34soD widget-body">
                              <div class="pack-body">
                                  <div class="mt row">
                                      <span class={"badge-left badge badge-gray" + estilo1}><i class="fa fa-users"></i></span>
                                      <span class={"badge-center badge badge-gray" + estilo2}><i class="fa fa-users"></i></span>
                                      <span class={"badge-right badge badge-gray" + estilo3}><i class="fa fa-users"></i></span>
                                  </div>
                                  <div class="mt row"></div>
                                  <div class="mt row"></div>
                                  <div class="mt row">
                                  <div class="text-center mb-sm" style={{position:'relative',left: '20%'}}><button type="submit" class="auth-btn btn btn-success" style={{color: 'white', width:'100%'}}>Buy level</button></div>
                                    
                                  </div>
                              </div>
                              <footer>
                                  <div color="transparent" class="btn-xs float-left py-0" id="load-parthers-btn"><i class="fa fa-users"></i> 0</div>
                                  <div color="transparent" class="btn-xs float-right py-0" id="load-notifications-btn"><i class="fa fa-refresh"></i> 0</div>
                              </footer>
                          </div>
                      </div>
                  </div>
              </section>
              <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>
          </div>
        );
      }

      this.setState({
        canastas: canasta,
      });
    }

    this.setState({
      invertido: invertido,
      ganado: ganado,
      personas: personas,
    });
  }

  async withdraw() {
    var cosa = await Utils.contract.withdraw().send();
    console.log(cosa);
  }

  render() {
    return (<main class="Layout_content__3Ygen">              
          <section class="widget Widget_widget__32uL4">
            <header class="Widget_title__1U9X_" style={{marginLeft:'30px', padding:'10px'}}>
                            <header class="dashboard-header">
                                
            <div className="row">
            <div className="col-lg-4" >
              <div className="choose__item">
                <h2>Earned:</h2>
                <p>
                {this.state.ganado} USDT
                </p>
              </div>
            </div>
            <div className="col-lg-4" >
              <div className="choose__item">
              <h2>My invested:</h2>
              <p>
                {this.state.invertido} USDT
              </p>
              </div>
            </div>
            <div className="col-lg-4" >
              <div className="choose__item">
                <h2>People:</h2>
                <p>
                {this.state.personas | 0}
                </p>
              </div>
            </div>
           </div>
                            </header>
                        </header>
              <div aria-hidden="false" class="rah-static rah-static--height-auto" style={{height: 'auto', overflow: 'visible'}}>
              <div class="Widget_widgetBody__34soD widget-body">
                          <div class="row">
                            {this.state.canastas}
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
          </section>
          <div class="Widget_widgetBackground__1F6dp" style={{display: 'none'}}></div>              
        </main>   
    );
  }
}
