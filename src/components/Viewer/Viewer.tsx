import React from 'react';
import EditionSelector from '../PageLayout/EditionSelector';
import TeiRendering from '../tei/TeiContainer';
import FvStore from '../../data/store';
import { Edition, Chunk } from '../../data/edition';
import Paging from '../PageLayout/Paging';
import Header from '../PageLayout/Header';
import OptionsSelector from '../PageLayout/OptionsSelector';
import { Apparatus } from '../../data/spine';
import Variation from '../Variations/Variation';

interface ViewerProperties { }

interface ViewerState {
    loading: boolean,
    chunk?: Chunk,
    chunkNumber: number,
    edition?: Edition,
    showVariations: boolean,
    showText: boolean,
    app: Apparatus | undefined,
}

class Viewer extends React.Component <ViewerProperties, ViewerState> {
    state = {
        loading: false,
        chunk: undefined as Chunk | undefined,
        edition: undefined as Edition | undefined,
        chunkNumber: 0,

        showVariations: true,
        showText: true,
        app: undefined,
    }

    
    onNewChunk = async (chunkNumber: number) => {
        this.setState( {loading: true, chunk: undefined } );
        
        if (!this.state.edition) {
            throw new Error("Cannot get chunk if there is no an edition");
        }
        const chunk = await Chunk.load(this.state.edition, chunkNumber);
        this.setState( {loading: false, chunk, chunkNumber: chunk.chunkNumber, app: undefined } );
    }

    onNewEdition = (edition: Edition) => {
        this.setState( { edition, app: undefined } );
    }
    onVariation = (show: boolean) => {
        this.setState( { showVariations: show } );
    }
    onText = (show: boolean) => {
        this.setState( { showText: show } );
    }

    onAppClick = (app: Apparatus) => {
        this.setState( {app} );
    }

    render() {
        let viewerClasses = 'viewer__cols';
        if (this.state.showText) {
            viewerClasses += ' view-text';
        }
        if (this.state.showVariations) {
            viewerClasses += ' view-variations';
        }

        return (
            <section id='viewer'>
                <div id='viewer__controls'>
                    <EditionSelector
                    key={0}
                    editions={FvStore.editions} 
                    edition={this.state.edition!}
                    onEditionSelected={this.onNewEdition}
                    />

                    <Paging
                    key={1}
                    edition={this.state.edition} 
                    chunk={this.state.chunkNumber}
                    onChunkSelected={this.onNewChunk} />

                    <OptionsSelector 
                    showVariations={this.state.showVariations}
                    showText={this.state.showText}
                    onVariationChanged={this.onVariation}
                    onTextChanged={this.onText}
                    />
                </div>
                
                <Header
                edition={this.state.edition} />

                <div id='viewer__contents' className={viewerClasses}>
                    <aside id="viewer__marginalia">
                    </aside>
                    { this.state.chunk && this.state.edition ? 
                    <TeiRendering
                    chunk={this.state.chunk}
                    edition={this.state.edition}
                    showVariations={this.state.showVariations}
                    showText={this.state.showText}
                    onAppClick={this.onAppClick}/> : <div></div>}
                    <aside id="viewer_variations">
                        { this.state.app ? <Variation app={this.state.app!} edition={this.state.edition!}/> : '' }
                    </aside>
                </div>

                <hr className='line' />
                <footer id="viewer_pagination_controls">
                    <EditionSelector
                    key={2}
                    editions={FvStore.editions} 
                    edition={this.state.edition!}
                    onEditionSelected={this.onNewEdition}
                    />
                    <Paging
                    key={3}
                    edition={this.state.edition} 
                    chunk={this.state.chunkNumber}
                    onChunkSelected={this.onNewChunk} />
                </footer>
            </section>
        );
    }
}

export default Viewer;
