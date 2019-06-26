import React from 'react';

interface TeiReactTextProps {
    x_depth: number;   // TODO: drop x_depth 
    text: string;
}

class TeiReactText extends React.Component<TeiReactTextProps> {
     
  // TODO: Drop the <pre> block and the indentation
   render() {
      const indent = ' '.repeat(this.props.x_depth * 2);

      return (
          <span className="tei-cdata">
            <pre>{ indent }{ this.props.text }</pre>      
          </span>
      );
   }
}

export default TeiReactText;
