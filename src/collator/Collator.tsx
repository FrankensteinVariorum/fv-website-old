import React from 'react';
import { collateFromURL } from '../tei-processing/collation-gathering';
import TeiApp from '../teiApp/TeiApp';

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
        
        const appElements = Array.from(gatherer.collation.getElementsByTagName('app'));
        console.log("appElements=", appElements);

        // Take gatherer.collation and turn it into a React element tree. Plug it into this.elements
        // const elem = React.createElement(TeiApp, {id: '12', key: 1} );
        
        const elem: any = [];
        appElements.forEach((element, index) => {
            debugger
            const id: any = element.attributes['xml:id'].nodeValue ? element.attributes["xml:id"].nodeValue : "empty";
            elem.push(React.createElement(TeiApp, {id: id, key: index} ));
        });
        
        this.setState( { processing: false, elements: [elem]});
    }

    // 1. Create TeiApp and see it's displayed.
    // 2. Add two TeiApps to this.state.elements and see they are both displayed
    // 3. Loop over gatherer.collation, find all <app> elements and turn them into TeiApp elements (const ptrElements = Array.from(this._collationDoc.getElementsByTagName('ptr'));)
}

export default Collator;