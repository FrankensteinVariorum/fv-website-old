import React from 'react';
// import PropTypes from 'prop-types';

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
      return (
         <div>
            <label>TeiApp </label>
            <label>{this.props.id}</label>
         </div>
      );
   }
}

export default TeiApp;
