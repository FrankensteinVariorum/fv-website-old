import React, { ReactNode } from 'react';
import { TeiConverter } from '../../tei-processing/tei-converter';
import { Chunk, Edition } from '../../data/edition';
import { Apparatus } from '../../data/spine';

interface TeiRenderingProps {
    chunk: Chunk;
    showVariations: boolean;
    showText: boolean;
    edition: Edition;
    onAppClick?: (app: Apparatus) => void;
}

interface TeiRenderingState {
    element?: ReactNode;
}

class TeiRendering extends React.Component<TeiRenderingProps, TeiRenderingState> {
    state = {
        element: undefined,
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
    
        const converter = new TeiConverter(this.props.showVariations, this.props.showText, this.props.edition, this.props.chunk);
        const reactElement = converter.teiToReactElement(body, this.props.onAppClick);

        this.setState( { element: reactElement });
    } 

    render() {
        return (
            <div className="tei-container">
                { this.state.element }
            </div>
        );
    }
}

export default TeiRendering;
