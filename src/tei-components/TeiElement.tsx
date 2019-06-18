import React from 'react';

interface teielement {
        tag: string;
        id: string;
        n: string;
        wit: string;
        type: string;
}

class TeiElement extends React.Component<teielement> {
   
   render() {
      return (
         <div>
            {/* <label>TeiElement </label> */}
            <label>{this.props.children}</label>
            <label>tag={this.props.tag}, id={this.props.id}, n={this.props.n}, wit={this.props.wit}, type={this.props.type}</label>
         </div>
      );
   }
}

export default TeiElement;
