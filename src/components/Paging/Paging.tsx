import React from 'react';
import { Edition } from '../../data/edition';
import Select from 'react-select';
import { SelectOption } from '../EditionSelector/EditionSelector';
import { deflate } from 'zlib';


interface PagingData {
    edition: Edition | undefined;
    chunk: number;
    onChunkSelected: (chunk: number) => void;
}

interface PagingState {
    chunk: number,
    selectedOption: SelectOption | undefined,
    availableChunks: SelectOption[],
}

class Paging extends React.Component<PagingData, PagingState> {

    state = {
        chunk: this.props.chunk,
        selectedOption: undefined as SelectOption | undefined,
        availableChunks: [] as SelectOption[]
    }

    componentDidUpdate(prevProps: PagingData) {
        if (this.props.edition !== prevProps.edition) {
            let chunks = [] as SelectOption[];
            if (this.props.edition) {
                chunks = this.props.edition.chunks.map((c) => ({ value: c.toString(), label: c.toString() } as SelectOption));
                const firstChunk = this.props.edition.chunks[0];
                this.setState( { availableChunks: chunks, chunk: firstChunk, selectedOption: chunks[0] });
                this.props.onChunkSelected(firstChunk);
            }
        }
    }

    onChunkChanged = (selectedOption: SelectOption) => {
        const chunk = parseInt(selectedOption.value);
        this.setState({ chunk, selectedOption });

        this.props.onChunkSelected(chunk);
    }

    updateChunk = (delta: number) => {
        let chunk = this.state.chunk;
        const newChunk = chunk + delta;
        if (this.props.edition!.chunks.indexOf(newChunk) === -1) {
            return;
        }
        const newOption = this.state.availableChunks.find((opt) => opt.value === newChunk.toString());
        if (!newOption) {
            console.error("Can't locate new option!")
        }
        this.setState({ chunk: newChunk, selectedOption: newOption });
        this.props.onChunkSelected(newChunk);
    }

    render() {
        return (
            <div>
                {this.props.edition ?
                <div>
                    <label>Chunk</label>
                    <button onClick={() => this.updateChunk(-1)}>Prev</button>
                    
                    <Select
                        className='select-style'
                        onChange={this.onChunkChanged}
                        options={this.state.availableChunks}
                        value={this.state.selectedOption}
                    />
                    <button onClick={() => this.updateChunk(1)}>Next</button>
                </div>
                : <label>There is no edition</label>}
            </div>
        );
    }
}

export default Paging;
