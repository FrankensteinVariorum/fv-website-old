import React from 'react';
import PropTypes from 'prop-types';

interface teiapp {
   id: string;
}

class TeiApp extends React.Component<teiapp> {
   // TeiApp.PropTypes = {
   //    id: PropTypes.string
   // }

        
   // constructor(props: any) {
   //    super(props);
   // }
   
   render() {
      // const id = this.props.id;
      return (
         <div>
            <label>TeiApp here</label>
            <label>{this.props.id}</label>
         </div>
      );
   }
}

export default TeiApp;
