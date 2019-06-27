import React, { ReactNode } from 'react';
import { TeiConverter } from '../../tei-processing/tei-converter';
import { Chunk } from '../../data/edition';

interface TeiRenderingData {
    chunk: Chunk;
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
        const body = this.props.chunk.root;
    
        const converter = new TeiConverter();
        const reactElement = converter.teiToReactElement(body, this.props.chunk);

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
