import React from 'react';

class TeiAppWrapper extends React.Component {
    style = {
        backgroundColor: 'gray',
        marginBottom: '10px',
        border: '1px solid black'
    }
     
   render() {

      return (
         <div style={this.style}>
           {this.props.children}
         </div>
      );
   }
}

export default TeiAppWrapper;
