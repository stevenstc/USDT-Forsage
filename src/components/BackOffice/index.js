import React, { Component } from "react";

import GeneralInfo from "../GeneralInfo";
import Oficina from "../Oficina";

export default class BackOffice extends Component {
  render() {

      return (        
    <div class="Layout_root__tsDUs">
        <div class="Layout_wrap__3suIr">
            <GeneralInfo />
            <Oficina />
        </div>
    </div> 
      );
  }
}
