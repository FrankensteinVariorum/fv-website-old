import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export interface TeiReactElementProps {
   htmlTag?: string;
   tag: string;
   id?: string;
   teiProps: any;
   showText: boolean;
   showVariations: boolean;
}

class TeiReactElement extends React.Component<TeiReactElementProps> {
     
   render() {
      let tag = '';
      let closingTag = '';

      if(this.props.htmlTag) {
         tag = `<${this.props.htmlTag}>`;
         closingTag = `</${this.props.htmlTag}>`;
      }

      return (
         <div className={`tei-element tei-${this.props.tag}`} data-tei-tag={this.props.tag}>
             {/* data-app-ref={appRef}> */}
            {ReactHtmlParser(tag)}
            {this.props.children}
            {ReactHtmlParser(closingTag)}
         </div>
      );
   }
}

export default TeiReactElement;
