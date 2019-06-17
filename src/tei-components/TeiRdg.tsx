import React from 'react';

interface teirdg {
   wit: string;
}

class TeiRdg extends React.Component<teirdg> {
   
   render() {
      return (
         <div>
            <label>TeiRdg </label>
            <label>{this.props.wit}</label>
         </div>
      );
   }
}

export default TeiRdg;
