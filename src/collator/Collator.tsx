import React from 'react';
import { collateFromURL } from '../tei-processing/collation-gathering';
import { TeiConverter } from '../classes/TeiConverter';

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

        const converter = new TeiConverter();
        const node = gatherer.collation.getElementsByTagName('ab')[0];

        const reactElement = converter.teiToReactElement(node, 0);
        console.log("**************reactElement", reactElement);
        this.setState( { processing: false, elements: [reactElement]});
    }
}

export default Collator;
