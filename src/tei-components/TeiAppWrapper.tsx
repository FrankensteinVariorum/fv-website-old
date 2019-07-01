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
   groups: ReactNode[];
}

class TeiAppWrapper extends React.Component<TeiAppWrapperData, TeiAppWrapperState> {
   state = {
      groups: [],
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

      this.setState( {groups} );
   }

   render() {
      return (
         <div> {
            this.props.showVariations ?
               <div className='app-wrapper' onClick={this.appClicked}>
                  {this.props.children}
               </div>
               : <div>{this.props.children}</div>
            }
            <div>
              {this.state.groups}
            </div>
         </div>
      );
   }
}

export default TeiAppWrapper;
