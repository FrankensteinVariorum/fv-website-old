import React from 'react';
import { Apparatus } from '../../data/spine';
import { Edition } from '../../data/edition';
import '../../styles/tei.sass';
import EditionDot from '../helpers/EditionDot';

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
      if(!this.props.showVariations) {
         return <div className='app-wrapper-hidden'>{ this.props.children }</div>;
      }

      const intensity = this.props.app.n || 1;
      const level = (intensity < 5) ? 1 : (intensity < 25) ? 2 : 3;
      const innerClasses = `app-wrapper-content app-intensity-${level}`;

      // Calculate the dot elements
      const groups = this.props.app.getOtherGroups(this.props.edition!);
      let dotElements: any[] = [];
      for(const group of groups) {
         const groupDots = group.editions.map((ed) => <EditionDot edition={ ed } />);
         dotElements = dotElements.concat(groupDots);
         dotElements.push(<span className='dot dot-break'/>);
      }

      console.log('dotElements ', dotElements);
      return (
         <div className='app-wrapper' onClick={ this.onClick }>
            <div className={innerClasses}>
               { this.props.children }
            </div>
            <div className='app-wrapper-dots'>
               { dotElements }
            </div>
         </div>
      );
   }
}

export default TeiAppWrapper;
