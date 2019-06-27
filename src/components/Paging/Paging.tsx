import React from 'react';
import { Edition } from '../../data/edition';
import Select from 'react-select';
import { SelectOption } from '../EditionSelector/EditionSelector';


interface PagingData {
    edition: Edition | undefined;
    chunk: number;
    onChunkSelected: (chunk: number) => void;
}

class Paging extends React.Component<PagingData> {

    state = {
        chunk: this.props.chunk,
        availableChunks: [] as SelectOption[]
    }

    componentDidUpdate(prevProps: PagingData) {
        if (this.props.edition !== prevProps.edition) {
            let chunks = [] as SelectOption[];
            if (this.props.edition) {
                chunks = this.props.edition.chunks.map((c) => ({ value: c.toString(), label: c.toString() } as SelectOption));
            }
            this.setState( { availableChunks: chunks });
        }
    }

    chunkChanged = (selectedOption: SelectOption) => {
        const chunk = parseInt(selectedOption.value);
        this.setState({ chunk: chunk });

        this.props.onChunkSelected(chunk);
    }

    changeChunk = (num: number) => {
        let chunk = this.state.chunk;
        chunk += num;
        console.log("chunk before set", chunk)
        this.setState({ chunk });

        this.props.onChunkSelected(chunk);
    }

    render() {
        debugger
        return (
            <div>
                {this.props.edition ?
                <div>
                    <label>Chunk</label>
                    <button onClick={() => this.changeChunk(-1)}>Prev</button>
                    
                    <Select
                        className='select-style'
                        onChange={this.chunkChanged}
                        options={this.state.availableChunks}
                    />
                    <button onClick={() => this.changeChunk(1)}>Next</button>
                </div>
                : <label>There is no edition</label>}
            </div>
        );
    }
}

export default Paging;
