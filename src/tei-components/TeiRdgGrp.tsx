import React from 'react';

interface teirdggrp {
   id: string;
   n: string;
}

class TeiRdgGrp extends React.Component<teirdggrp> {
   
   render() {
      return (
         <div>
            <label>TeiRdgGrp </label>
            <label>{this.props.id}</label>
         </div>
      );
   }
}

export default TeiRdgGrp;
