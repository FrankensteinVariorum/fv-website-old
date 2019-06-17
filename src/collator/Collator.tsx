import React from 'react';
import { collateFromURL } from '../tei-processing/collation-gathering';
import TeiApp from '../tei-components/TeiApp';
import { tryConverter } from '../models/TeiConverter';
// import TeiRdgGrp from '../tei-components/TeiRdgGrp';

class Collator extends React.Component {
    state = {
        processing: false,
        elements: [],
    }

    constructor(props: any) {
        super(props);
        this.state.processing = true;
    }

    componentDidMount() {
        this.collate();
    }

    render() {
        return (
            <div>
                { this.state.processing ? 'Processing...' : this.state.elements }
            </div>
        );
    }

    async delay(ms: number) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, ms)
        });
    }

    async collate() {
        const gatherer = await collateFromURL('https://raw.githubusercontent.com/PghFrankenstein/fv-data/master/standoff_Spine/spine_C04.xml');
        await gatherer.dereferencePointers();
        const ab = gatherer.collation.getElementsByTagName('ab')[0]; // 4 ab ?
        tryConverter(ab);
        
        const appElements = Array.from(gatherer.collation.getElementsByTagName('app'));

        // Take gatherer.collation and turn it into a React element tree. Plug it into this.elements        
        const elem: any = [];
        appElements.forEach((element, index) => {
            const id: string = element.attributes[0].nodeValue || '';
            elem.push(React.createElement(TeiApp, {id: id, key: index} ));
        });
        
        // appElements = Array.from(gatherer.collation.getElementsByTagName('rdgGrp'));

        // appElements.forEach((element, index) => {
        //     const id: string = element.attributes[1].nodeValue || '';
        //     elem.push(React.createElement(TeiRdgGrp, {id: id, n: '1', key: index} ));
        // });
        
        this.setState( { processing: false, elements: [elem]});
    }
}

export default Collator;