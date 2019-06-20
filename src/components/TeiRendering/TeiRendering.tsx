import React, { ReactNode } from 'react';
import { TeiConverter } from '../../classes/TeiConverter';

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
        const reactElement = converter.teiToReactElement(body, 0);

        this.setState( { processing: false, elements: [reactElement]});
    } 

    render() {
        return (
            <div>
                { this.state.processing ? 'Processing...' : this.state.elements }
            </div>
        );
    }
}

export default TeiRendering;
