import React from 'react';
import Select from 'react-select';
import './EditionSelector.css';
import { NormalizedEdition } from '../../tei-processing/types';
import { SelectOption } from '../../classes/utils';

interface EditionSelectorProps {
        editionOptions: SelectOption[];
        chunkOptions: SelectOption[];
        func: Function;
}

class EditionSelector extends React.Component<EditionSelectorProps> {

    state = {
        edition: '',
        chunk: ''
    }
    
    load = async () => {
        const normalizedEdition = new NormalizedEdition({code: this.state.edition});
        const chunkData = await normalizedEdition.fetchChunks(this.state.chunk);

        this.props.func(chunkData);
    }

    editionChanged = (selectedOption: SelectOption) => {
        this.setState({ edition: selectedOption.value });
        this.setState({ chunk: '' });
    }

    chunkChanged = (selectedOption: SelectOption) => {
        this.setState({ chunk: selectedOption.value });
    }
    
    render() {
        return (
        <div>
            <label>Edition</label>
            <Select
                className='select-style'
                onChange={this.editionChanged}
                options={this.props.editionOptions}
            ></Select>

            <label>Chunk</label>
            <Select
                className='select-style'
                onChange={this.chunkChanged}
                options={this.props.chunkOptions}
            />

            <button onClick={this.load}>Load</button>
            <hr />
        </div>
        );
    }
}

export default EditionSelector;
