import React from 'react';
import { Edition } from '../../data/edition';

interface TeiAnnotationWrapperProps {
   showVariations: boolean;
   showText: boolean;
   edition?: Edition;
   annotation: Object;
}

class TeiAnnotationWrapper extends React.Component<TeiAnnotationWrapperProps> {
   state = {
      showAnnotation: false
   }

   onClick = () => {
      if (!this.state.showAnnotation) {
         this.setState({showAnnotation: true})
      } else {
         this.setState({showAnnotation: false})
      }
   }

   render() {
      let annotation
      if (this.state.showAnnotation) {
         const selector = this.props.annotation["target"]["selector"][0]
         annotation = <div style={{lineHeight: '1.5em',
            display: 'block', color: 'darkslategray', marginTop: '2em'}}>
            <blockquote>"{selector.prefix} <span style={{color: 'red'}}>{selector.exact}</span> {selector.suffix}"</blockquote>
            <span style={{fontStyle: "italic"}}>{this.props.annotation["body"][0]["value"]}</span>
         </div>
      }
      return (
         <div style={{position: 'relative'}}>
            <div onClick={this.onClick} style={{position: 'absolute', width: '1em', height: '1em', cursor: 'pointer', backgroundColor: 'red'}}></div>
            {annotation}
            { this.props.children }
         </div>
      );
   }
}

export default TeiAnnotationWrapper;
