import React from 'react';
import Select from 'react-select';
import './EditionSelector.css';
import { Edition } from '../../data/edition';
import FvStore from '../../data/store';

export interface SelectOption {
    value: string;
    label: string;
}

interface EditionSelectorProps {
    editions: Edition[],
    edition: Edition,
    showVariation: boolean,
    showText: boolean,

    onEditionSelected: (edition: Edition) => void;
    onVariationChanged: (variation: boolean) => void;
    onTextChanged: (text: boolean) => void;
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

        // const chunks = edition.chunks.map((c) => ({ value: c.toString(), label: c.toString() } as SelectOption));
        // this.setState( { edition, availableChunks: chunks, });

        this.props.onEditionSelected(edition);
    }

    onVariationChanged = (variation: any) => {
        debugger
        this.props.onVariationChanged(variation);
    }
    
    onTextChanged = (text: any) => {
        this.props.onTextChanged(text);
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

            <label>
                Show Variations
                <input
                    name="variation"
                    type="checkbox"
                    checked={this.props.showVariation}
                    onChange={()=>this.onVariationChanged} />
            </label>
            
            <label>
                Show Text
                <input
                    name="text"
                    type="checkbox"
                    checked={this.props.showText}
                    onChange={this.onTextChanged} />
            </label>

            <button onClick={this.load}>Load</button>
            <hr />
        </div>
        );
    }
}

export default EditionSelector;
