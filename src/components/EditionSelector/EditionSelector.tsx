import React from 'react';
import Select from 'react-select';
// import { NormalizesEdition } from '../../classes/NormalizedEdition';
import './EditionSelector.css';
import { NormalizesEdition } from '../../classes/NormalizedEdition';
import { selectOption } from '../../classes/utils';

interface EditionSelectorProps {
        editionOptions: selectOption[];
        chunkOptions: selectOption[];
        func: Function;
}

class EditionSelector extends React.Component<EditionSelectorProps> {
    constructor(props: any) {
        super(props);
    }

    state = {
        edition: '',
        chunk: ''
    }
    
    load = async () => {
        const normalizedEdition = new NormalizesEdition({code: this.state.edition});
        const chunkData = await normalizedEdition.fetchChunks(this.state.chunk);

        this.props.func(chunkData);
    }

    editionChanged = (selectedOption: selectOption) => {
        this.setState({ edition: selectedOption.value });
        this.setState({ chunk: '' });
    }

    chunkChanged = (selectedOption: selectOption) => {
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
