import React from 'react';

interface TeiReactElementProps {
   x_depth: number;   
   tag: string;
   id?: string;
   teiProps: any;
}

class TeiReactElement extends React.Component<TeiReactElementProps> {
     
   render() {
      // console.log("props", this.props);
      let spaces = '';
      for (let i = 0; i < this.props.x_depth; i++) {
         spaces += '  ';
      }

      const tag = `<${this.props.tag}>`;
      const closeTag = `</${this.props.tag}>`;

      return (
         <div className={`tei-${this.props.tag}`} data-tei-tag={`${this.props.tag}`}>
            <pre>{spaces}{tag}</pre>
            {this.props.children}
            <pre>{spaces}{closeTag}</pre>
         </div>
      );
   }
}

export default TeiReactElement;
