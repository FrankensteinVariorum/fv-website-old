import React from 'react';

interface TeiReactElementProps {
   x_depth: number;   
   tag: string;
   id?: string;
   teiProps: any;
}

class TeiReactElement extends React.Component<TeiReactElementProps> {
     
   render() {
      const indent = ' '.repeat(this.props.x_depth * 2);

      const tag = `<${this.props.tag}>`;
      const closeTag = `</${this.props.tag}>`;

      return (
         <div className="tei-element {`tei-${this.props.tag}`}" data-tei-tag={`${this.props.tag}`}>
            <pre>{indent}{tag}</pre>
            {this.props.children}
            <pre>{indent}{closeTag}</pre>
         </div>
      );
   }
}

export default TeiReactElement;
