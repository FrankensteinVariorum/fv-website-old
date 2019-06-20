import React from 'react';

interface teiElementProps {
   x_depth: number;   
   tag: string;
   id: string;
   n: string;
   wit: string;
   type: string;
}

class TeiElement extends React.Component<teiElementProps> {
   state = {
      tag: '',
      closeTag: ''
   }

   constructor(props) {
      super(props);

      this.state.tag = "<" + this.props.tag + ">";
      this.state.closeTag = "</" + this.props.tag + ">";
   }
   
   render() {
      let spaces = '';
      for (let i = 0; i < this.props.x_depth; i++) {
         spaces += '  ';
      }

      return (
         <div>
            <pre>{spaces}{this.state.tag}</pre>
            <label>{this.props.children}</label>
            <pre>{spaces}{this.state.closeTag}</pre>
         </div>
      );
   }
}

export default TeiElement;
