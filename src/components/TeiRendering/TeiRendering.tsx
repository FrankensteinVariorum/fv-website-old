import React, { ReactNode } from 'react';
import { TeiConverter } from '../../classes/TeiConverter';
import TeiElement from '../../tei-components/TeiElement';

interface TeiRenderingData {
    xml: XMLDocument;
}

interface TeiRenderingState {
    processing: boolean;
    elements: ReactNode[];
}

class TeiRendering extends React.Component<TeiRenderingData, TeiRenderingState> {
    state = {
        processing: false,
        elements: [],
    }

    constructor(props: TeiRenderingData) {
        super(props);

        this.state.processing = true;
    }

    componentDidMount() {
        this.getTeiObjects();
    }

    getTeiObjects = () => {
        const body = this.props.xml.getElementsByTagName('body')[0];
    
        const converter = new TeiConverter();
        const reactElement = converter.teiToReactElement(body);
        console.log("reactElement", reactElement);

        this.setState( { processing: false, elements: [reactElement]});

        ////////////////////////////////
        // const props = {
        //     tag: 'tag',
        //     id: 'id',
        //     n: 'n',
        //     wit: 'wit',
        //     type: 'type',
        //     key: 0
        // }
        // const props1 = {
        //     tag: 'tag1',
        //     id: 'id1',
        //     n: 'n1',
        //     wit: 'wit1',
        //     type: 'type1',
        //     key: 1
        // }

        // const twoElements = React.createElement(TeiElement, props1, 
        //          React.createElement(TeiElement, props));

        // 
        // this.setState( { processing: false, elements: [twoElements]});
    } 

    render() {
        return (
            <div>
                { this.state.processing ? 'Processing...' : this.state.elements }
                <pre>{this.props.xml.documentElement.outerHTML}</pre>
            </div>
        );
    }
}

export default TeiRendering;
