import React from 'react';
import { Apparatus } from '../data/spine';
import { Edition } from '../data/edition';
import '../styles/tei.sass';

interface TeiAppWrapperProps {
   showVariations: boolean;
   showText: boolean;
   edition?: Edition;
   app: Apparatus;
   onAppClick?: (app: Apparatus) => void,
}

class TeiAppWrapper extends React.Component<TeiAppWrapperProps> {
   onClick = () => {
      if (this.props.showVariations && this.props.onAppClick) {
         this.props.onAppClick(this.props.app);
      }
   }

   render() {
      const intensity = this.props.app.n || 0;
      const level = (intensity < 10) ? 0 : (intensity < 100) ? 1  : (intensity < 1000) ? 2 : 3;
      const classNames = `app-wrapper app-intensity-${level}`;

      return (
         <div> {
            this.props.showVariations ?
               <div className={ classNames } onClick={this.onClick}>
                  {this.props.children}
               </div>
               : <div>{this.props.children}</div>
            }
         </div>
      );
   }
}

export default TeiAppWrapper;
