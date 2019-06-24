import React from 'react';
import EditionSelector from '../EditionSelector/EditionSelector';
import TeiRendering from '../TeiRendering/TeiRendering';
import FvStore from '../../data/store';
import { Edition } from '../../data/types';

interface ViewerProperties { }

interface ViewerState {
    xml?: XMLDocument;
}

class Viewer extends React.Component <ViewerProperties, ViewerState> {

    state = {
        xml: undefined,
    }

    onNewChunk = async (edition: Edition, chunk: number) => {
        const doc = await edition.getChunk(chunk);
        this.setState( {xml: doc} );
    }    

    render() {
        return (
            <div>
                <EditionSelector editions={FvStore.editions} onChunkSelected={this.onNewChunk} />
                { this.state.xml ? <TeiRendering xml={this.state.xml!} /> : '' }
            </div>

        );
    }
}

export default Viewer;
