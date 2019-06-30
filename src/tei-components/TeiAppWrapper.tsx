import React from 'react';
import './TeiComponents.sass';

class TeiAppWrapper extends React.Component {
   render() {
      return (
         <div className='app-wrapper'>
           {this.props.children}
         </div>
      );
   }
}

export default TeiAppWrapper;
