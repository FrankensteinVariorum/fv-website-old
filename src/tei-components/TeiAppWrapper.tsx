import React, { ReactNode } from 'react';
import './TeiComponents.sass';
import { Apparatus, ReadingGroup } from '../data/spine';
import { Edition } from '../data/edition';
import TeiReadingGroup from '../components/TeiReadingGroup/TeiReadingGroup';

interface TeiAppWrapperData {
   showVariations: boolean;
   showText: boolean;
   edition?: Edition;
   app?: Apparatus;
}

interface TeiAppWrapperState {
   elements: ReactNode[];
}

class TeiAppWrapper extends React.Component<TeiAppWrapperData, TeiAppWrapperState> {
   state = {
      elements: [],
   }

   appClicked = () => {
      if (!this.props.edition || !this.props.app) {
         console.error("can't show variations");
         return;
      }
      const otherGroups: ReadingGroup[] = this.props.app.getOtherGroups(this.props.edition);
      const groups = [] as ReactNode[];
      for (let i = 0; i < otherGroups.length; i++) {
         groups.push(React.createElement(TeiReadingGroup, {
            key: i,
            editions: otherGroups[i].editions,
            element: otherGroups[i].element}))
      }

      this.setState( {elements: groups} );
   }

   render() {
      return (
         <div> {
            this.props.showVariations ?
               <div className={this.props.showVariations ? 'app-wrapper' : ''} onClick={this.appClicked}>
                  {this.props.children}
               </div>
               : <div>children:{this.props.children}</div>
            }
            <div>
               {this.state.elements}
            </div>
         </div>
      );
   }
}

export default TeiAppWrapper;
