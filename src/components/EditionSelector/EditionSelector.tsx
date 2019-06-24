import React from 'react';
import Select from 'react-select';
import './EditionSelector.css';
import { Edition } from '../../data/types';
import FvStore from '../../data/store';

interface SelectOption {
    value: string;
    label: string;
}

interface EditionSelectorProps {
    editions: Edition[],
    onChunkSelected: (edition: Edition, chunk: number) => void;
}

interface EditionSelectorState {
    availableEditions: SelectOption[],
    availableChunks: SelectOption[],
    edition: Edition | undefined,
    chunk: number | undefined,
}

class EditionSelector extends React.Component<EditionSelectorProps, EditionSelectorState> {

    state = {
        availableEditions: [] as SelectOption[],
        availableChunks: [] as SelectOption[],
        edition: undefined as Edition | undefined,
        chunk: undefined as number | undefined,
    }
    
    load = async () => {
        if (!this.state.edition || !this.state.chunk) {
            console.warn('Load clicked with no edition or chunk');
            return;
        }

        this.props.onChunkSelected(this.state.edition, this.state.chunk);;
    }

    componentDidMount = () => {
        const editions = FvStore.editions.map((ed) => ({ value: ed.code, label: ed.name } as SelectOption));

        this.setState({ availableEditions: editions, availableChunks: [], });
    }

    editionChanged = (selectedOption: SelectOption) => {
        const edition = FvStore.editions.find((ed) => ed.code === selectedOption.value);
        if(!edition) {
            console.warn(`Couldn't find edition for selection ${selectedOption.value}`);
            return;
        }

        const chunks = edition.chunks.map((c) => ({ value: c.toString(), label: c.toString() } as SelectOption));
        this.setState( { edition, availableChunks: chunks, });
    }

    chunkChanged = (selectedOption: SelectOption) => {
        const chunk = parseInt(selectedOption.value);
        this.setState({ chunk: chunk });
    }
    
    render() {
        return (
        <div>
            <label>Edition</label>
            <Select
                className='select-style'
                onChange={this.editionChanged}
                options={this.state.availableEditions}
            ></Select>

            <label>Chunk</label>
            <Select
                className='select-style'
                onChange={this.chunkChanged}
                options={this.state.availableChunks}
            />

            <button onClick={this.load}>Load</button>
            <hr />
        </div>
        );
    }
}

export default EditionSelector;
