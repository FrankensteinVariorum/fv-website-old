import React from 'react';
import { collateFromURL } from '../tei-processing/collation-gathering';
import { tryConverter } from '../models/TeiConverter';
import TeiElement from '../tei-components/TeiElement';

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
        const gatherer = await collateFromURL('https://raw.githubusercontent.com/PghFrankenstein/fv-data/master/standoff_Spine/spine_C02.xml');
        await gatherer.dereferencePointers();
        const ab = gatherer.collation.getElementsByTagName('ab')[0]; // 4 ab ?
        const elements = tryConverter(ab);
        
        this.setState( { processing: false, elements: [elements]});
    }
}

export default Collator;