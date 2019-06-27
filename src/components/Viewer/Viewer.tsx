import React from 'react';
import EditionSelector from '../EditionSelector/EditionSelector';
import TeiRendering from '../TeiRendering/TeiRendering';
import FvStore from '../../data/store';
import { Edition, Chunk } from '../../data/edition';
import Paging from '../Paging/Paging';

interface ViewerProperties { }

interface ViewerState {
    loading: boolean,
    chunk?: Chunk,
    edition?: Edition,
}

class Viewer extends React.Component <ViewerProperties, ViewerState> {

    state = {
        loading: false,
        chunk: undefined as Chunk | undefined,
        edition: undefined as Edition | undefined,
        chunkNumber: 0,

        showVariations: false,
        showText: false,
    }

    
    onNewChunk = async (chunkNumber: number) => {
        this.setState( {loading: true, chunk: undefined } );
        
        if (!this.state.edition) {
            throw new Error("Cannot get chunk if there is no an edition");
        }
        const chunk = await Chunk.load(this.state.edition, chunkNumber);
        this.setState( {loading: false, chunk } );
    }

    onNewEdition = (edition: Edition) => {
        this.setState( {edition } );
    }
    onVariation = (variation: boolean) => {
        debugger
        // this.setState( {showVariations: variation} );
    }
    onText = (text: boolean) => {
        // this.setState( {showText: text } );
    }

    render() {
        return (
            <div>
                <EditionSelector 
                editions={FvStore.editions} 
                edition={this.state.edition!}
                showVariation={this.state.showVariations}
                showText={this.state.showText}
                onEditionSelected={this.onNewEdition}
                onVariationChanged={this.onVariation}
                onTextChanged={this.onText}
                />
                <Paging 
                edition={this.state.edition} 
                chunk={this.state.chunkNumber}
                onChunkSelected={this.onNewChunk} />
                { this.state.chunk ? <TeiRendering chunk={this.state.chunk} /> : '' }
            </div>

        );
    }
}

export default Viewer;
