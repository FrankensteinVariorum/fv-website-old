import React from 'react';
import { Edition } from '../../data/edition';
import Select from 'react-select';
import { SelectOption } from '../EditionSelector/EditionSelector';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
// import arrow from '';


interface PagingData {
    edition: Edition | undefined;
    chunk: number;
    onChunkSelected: (chunk: number) => void;
}

interface PagingState {
    chunkIndex: number,
    selectedOption: SelectOption | undefined,
    availableChunks: SelectOption[],
    disablePrev: boolean,
    disableNext: boolean,
}

class Paging extends React.Component<PagingData, PagingState> {

    state = {
        chunkIndex: this.props.chunk,
        selectedOption: undefined as SelectOption | undefined,
        availableChunks: [] as SelectOption[],
        disablePrev: true,
        disableNext: false,
    }

    componentDidUpdate(prevProps: PagingData) {
        if (this.props.edition !== prevProps.edition) {
            let chunks = [] as SelectOption[];
            if (this.props.edition) {
                chunks = this.props.edition.chunks.map((c) => ({ value: c.toString(), label: c.toString() } as SelectOption));
                const firstChunk = this.props.edition.chunks[0];
                this.setState( { availableChunks: chunks, chunkIndex: 0, selectedOption: chunks[0] });
                this.props.onChunkSelected(firstChunk);
            }
        }
    }

    onChunkChanged = (selectedOption: SelectOption) => {
        const chunk = parseInt(selectedOption.value);
        const index = this.state.availableChunks.findIndex((opt) => opt.value === chunk.toString());
        this.setState({ chunkIndex: index, selectedOption });

        this.props.onChunkSelected(chunk);
    }

    updateChunk = (delta: number) => {
        this.setState( {disablePrev: false, disableNext: false} );
        const chunk = this.state.chunkIndex + 1;
        const newChunk = chunk + delta;
        if (newChunk === 1) {
            this.setState( {disablePrev: true} );
        } else if (newChunk === this.state.availableChunks.length) {
            this.setState( {disableNext: true })
        }
        if (this.props.edition!.chunks.indexOf(newChunk) === -1) {
            return;
        }
        const newOption = this.state.availableChunks.find((opt) => opt.value === newChunk.toString());
        if (!newOption) {
            console.error("Can't locate new option!")
        }
        this.setState({ chunkIndex: newChunk - 1, selectedOption: newOption });
        this.props.onChunkSelected((newChunk));
    }

    render() {
        return (
            <div>
                {this.props.edition ?
                <div>
                    <label>CHOOSE A SECTION</label>
                    <Select
                        className='select-style'
                        onChange={this.onChunkChanged}
                        options={this.state.availableChunks}
                        value={this.state.selectedOption}
                    />
                    {/* <img src={arrow} /> todo: add image */} 
                    <button onClick={() => this.updateChunk(-1)} disabled={this.state.disablePrev}><IoIosArrowBack />Previous Section</button>
                    <button onClick={() => this.updateChunk(1)} disabled={this.state.disableNext}>Next Section<IoIosArrowForward /></button>
                </div>
                : ''}
            </div>
        );
    }
}

export default Paging;
