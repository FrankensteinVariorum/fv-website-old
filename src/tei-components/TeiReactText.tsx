import React from 'react';

interface TeiReactTextProps {
    x_depth: number;   
    text: string;
}

class TeiReactText extends React.Component<TeiReactTextProps> {
     
   render() {
      const indent = ' '.repeat(this.props.x_depth);

      return (
          <span className="tei-text">
            <pre>{ indent }{ this.props.text }</pre>      
          </span>
      );
   }
}

export default TeiReactText;
