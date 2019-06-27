import React from 'react';

interface TeiReactTextProps {
    text: string;
}

class TeiReactText extends React.Component<TeiReactTextProps> {
     
   render() {
      return (
          <span className="tei-cdata">
            { this.props.text }      
          </span>
      );
   }
}

export default TeiReactText;
