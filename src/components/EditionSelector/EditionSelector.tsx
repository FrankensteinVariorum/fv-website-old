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
    showVariations: boolean,
    showText: boolean,

    onEditionSelected: (edition: Edition) => void;
    onVariationChanged: (variation: boolean) => void;
    onTextChanged: (text: boolean) => void;
}

interface EditionSelectorState {
    availableEditions: SelectOption[],
    edition: Edition | undefined,
    showVariations: boolean,
    showText: boolean,
}

class EditionSelector extends React.Component<EditionSelectorProps, EditionSelectorState> {

    state = {
        availableEditions: [] as SelectOption[],
        edition: undefined as Edition | undefined,
        showVariations: true,
        showText: true,
    }
    
    componentDidMount = () => {
        const editions = FvStore.editions.map((ed) => ({ value: ed.code, label: ed.name } as SelectOption));

        this.setState({ availableEditions: editions, });
    }

    componentDidUpdate(prevProps: EditionSelectorProps) {
        if (this.props.showVariations !== this.state.showVariations) {
            this.setState( { showVariations: this.props.showVariations });
        }

        if(this.props.showText !== this.state.showText) {
            this.setState( { showText: this.props.showText });
        }
    }

    editionChanged = (selectedOption: SelectOption) => {
        const edition = FvStore.editions.find((ed) => ed.code === selectedOption.value);
        if(!edition) {
            console.warn(`Couldn't find edition for selection ${selectedOption.value}`);
            return;
        }

        this.props.onEditionSelected(edition);
    }

    onVariationChanged = () => {
        const newShow = !this.state.showVariations;
        this.setState( { showVariations: newShow });
        this.props.onVariationChanged(newShow);
    }
    
    onTextChanged = () => {
        const newShowText = !this.state.showText;
        this.setState( { showText: newShowText });
        this.props.onTextChanged(newShowText);
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
                <input
                    name="variation"
                    type="checkbox"
                    checked={this.state.showVariations}
                    onChange={this.onVariationChanged} />
                Show Variations
            </label>
            
            <label>
                <input
                    name="text"
                    type="checkbox"
                    checked={this.state.showText}
                    onChange={this.onTextChanged} />
                Show Text
            </label>
            <hr />
        </div>
        );
    }
}

export default EditionSelector;
