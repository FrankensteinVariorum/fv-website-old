import React from 'react';
import { Edition } from '../../data/edition';
import Select from 'react-select';
import { SelectOption } from './EditionSelector';
import pre from '../../assets/pre.jpg';
import next from '../../assets/next.jpg';
import '../../styles/general.sass';


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
                    <div className='in-line'>
                        <label>CHOOSE A SECTION</label>
                        <Select
                            className='select-style'
                            onChange={this.onChunkChanged}
                            options={this.state.availableChunks}
                            value={this.state.selectedOption}
                        />
                    </div>
                    
                    <div className='in-line paging-buttons'>
                        <button onClick={() => this.updateChunk(-1)} className={this.state.disablePrev ? 'disable-button': ''}
                            disabled={this.state.disablePrev}><img src={pre} alt={pre} /></button><label>Previous Section</label>
                        <label className='margin-button'>Next Section</label><button className={this.state.disableNext ? 'disable-button': ''} onClick={() => this.updateChunk(1)}
                            disabled={this.state.disableNext}><img src={next} alt={next} /></button>
                    </div>
                </div>
                : ''}
            </div>
        );
    }
}

export default Paging;
