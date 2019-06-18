import React from 'react';

interface teielement {
        tag: string;
        key1: number;
        id: string;
        n: string;
        wit: string;
}

class TeiElement extends React.Component<teielement> {
   
   render() {
      return (
         <div>
            {/* <label>TeiElement </label> */}
            <label>key={this.props.key1}, tag={this.props.tag}, id={this.props.id}, n={this.props.n}, wit={this.props.wit}</label>
         </div>
      );
   }
}

export default TeiElement;
