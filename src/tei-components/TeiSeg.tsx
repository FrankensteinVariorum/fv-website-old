import React from 'react';

interface teiseg {
   id: string;
   // part: string;
}

class TeiSeg extends React.Component<teiseg> {
   
   render() {
      return (
         <div>
            <label>TeiSeg </label>
            <label>{this.props.id}</label>
         </div>
      );
   }
}

export default TeiSeg;
