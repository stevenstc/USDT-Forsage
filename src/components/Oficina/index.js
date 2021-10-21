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

        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>My referral link:</h2>
              <p>
                <a style={{"color":"blue"}} href={this.state.link}>{this.state.link}</a> &nbsp;&nbsp;
                <CopyToClipboard text={this.state.link}>
                  <button type="button" className="primary-btn">Copy</button>
                </CopyToClipboard>
              </p>
            </div>
          </div>
        </div>    

        <div className="row">
          <div className="col-lg-4">
            <div className="section-title">
              <h2>My invested:</h2>
              <p>
                {this.state.invertido} USDT
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="section-title">
              <h2>Earned:</h2>
              <p>
              {this.state.ganado} USDT
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="section-title">
              <h2>People:</h2>
              <p>
              {this.state.personas}
              </p>
            </div>
          </div>
        </div>   
        <hr></hr>

        <div className="row">

          {this.state.canastas}
                  
        </div>

      </>
      
    );
  }
}
