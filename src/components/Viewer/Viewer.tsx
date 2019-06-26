import React from 'react';
import EditionSelector from '../EditionSelector/EditionSelector';
import TeiRendering from '../TeiRendering/TeiRendering';
import FvStore from '../../data/store';
import { Edition, Chunk } from '../../data/edition';
import { Spine } from '../../data/spine';

interface ViewerProperties { }

interface ViewerState {
    loading: boolean,
    chunk?: Chunk,
}

class Viewer extends React.Component <ViewerProperties, ViewerState> {

    state = {
        loading: false,
        chunk: undefined as Chunk | undefined,
    }

    onNewChunk = async (edition: Edition, chunkNumber: number) => {
        this.setState( {loading: true, chunk: undefined } );
        
        const chunk = await Chunk.load(edition, chunkNumber);
        this.setState( {loading: false, chunk } );
    }    

    render() {
        return (
            <div>
                <EditionSelector editions={FvStore.editions} onChunkSelected={this.onNewChunk} />
                { this.state.chunk ? <TeiRendering chunk={this.state.chunk} /> : '' }
            </div>

        );
    }
}

export default Viewer;
