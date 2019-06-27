import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Chunk } from '../data/edition';

export interface TeiReactElementProps {
   htmlTag?: string;
   tag: string;
   id?: string;
   teiProps: any;
   chunk: Chunk;
}

class TeiReactElement extends React.Component<TeiReactElementProps> {
     
   render() {
      let tag = '';
      let closingTag = '';

      if(this.props.htmlTag) {
         tag = `<${this.props.htmlTag}>`;
         closingTag = `</${this.props.htmlTag}>`;
      }
      // const appRef = this.props.teiProps['app-ref'];  // This can be undefined
      // const app = appRef ? this.props.chunk.getApp(appRef) : undefined;

      // let children = this.props.children;
      // if (app) {
      //    children = React.createElement(TeiAppWrapper, {appChildren: this.props.children});
      // }

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

