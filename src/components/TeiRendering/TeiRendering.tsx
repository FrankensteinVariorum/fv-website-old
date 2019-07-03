import React, { ReactNode } from 'react';
import { TeiConverter } from '../../tei-processing/tei-converter';
import { Chunk, Edition } from '../../data/edition';
import { Apparatus } from '../../data/spine';

interface TeiRenderingProps {
    chunk: Chunk;
    showVariations: boolean;
    showText: boolean;
    edition: Edition;
    onAppClick: (app: Apparatus) => void;
}

interface TeiRenderingState {
    processing: boolean;
    elements: ReactNode[];
}

class TeiRendering extends React.Component<TeiRenderingProps, TeiRenderingState> {
    state = {
        processing: false,
        elements: [],
    }

    constructor(props: TeiRenderingProps) {
        super(props);

        this.state.processing = true;
    }

    componentDidMount() {
        this.getTeiObjects();
    }

    componentDidUpdate(prevProps: TeiRenderingProps) {
        if(!prevProps || 
            this.props.chunk !== prevProps.chunk || 
            this.props.edition !== prevProps.edition || 
            this.props.showText !== prevProps.showText ||
            this.props.showVariations !== prevProps.showVariations) {
            this.getTeiObjects(); // No matter which property has changed, we need to render everything again
        }
    }

    getTeiObjects = () => {
        const body = this.props.chunk.root;
    
        const converter = new TeiConverter(this.props.showVariations, this.props.showText, this.props.edition);
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
