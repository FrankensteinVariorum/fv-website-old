import React from 'react';

// TODO: Drop x_dept, add chunk
export interface TeiReactElementProps {
   x_depth: number;   
   htmlTag?: string;
   tag: string;
   id?: string;
   teiProps: any;
}

class TeiReactElement extends React.Component<TeiReactElementProps> {
     
   render() {
      let tag = '';
      let closingTag = '';

      if(this.props.htmlTag) {
         tag = `<${this.props.htmlTag}>`;
         closingTag = `</${this.props.htmlTag}>`;
      }
      const appRef = this.props.teiProps['app-ref'];  // This can be undefined
      // const app = appRef ? this.props.chunk.getApp(appRef) : undefined;

      // TODO: Use react-html-parser
      return (
         <div className={`tei-element tei-${this.props.tag}`} data-tei-tag={`${this.props.tag}`}>
            {tag}
            {this.props.children}
            {closingTag}
         </div>
      );
   }
}

export default TeiReactElement;

