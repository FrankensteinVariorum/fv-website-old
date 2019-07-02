import React from 'react';
import Select from 'react-select';
import './EditionSelector.sass';
import { Edition } from '../../data/edition';
import FvStore from '../../data/store';

export interface SelectOption {
    value: string;
    label: any;// HTMLSpanElement;
}

interface EditionSelectorProps {
    editions: Edition[],
    edition: Edition,

    onEditionSelected: (edition: Edition) => void;
}

interface EditionSelectorState {
    availableEditions: SelectOption[],
    edition: Edition | undefined,
}

class EditionSelector extends React.Component<EditionSelectorProps, EditionSelectorState> {

    state = {
        availableEditions: [] as SelectOption[],
        edition: undefined as Edition | undefined,
    }
    
    componentDidMount = () => {
        const editions = FvStore.editions.map((ed, index) => ({ key: index, value: ed.code, label: <label><span className={'dot ed-' + ed.code}></span>{ed.name}</label> } as SelectOption));

        this.setState({ availableEditions: editions, });
    }

    editionChanged = (selectedOption: SelectOption) => {
        const edition = FvStore.editions.find((ed) => ed.code === selectedOption.value);
        if(!edition) {
            console.warn(`Couldn't find edition for selection ${selectedOption.value}`);
            return;
        }

        this.props.onEditionSelected(edition);
    }


    render() {
        return (
        <div>
            <label>CHOOSE A VERSION</label>
            <Select
                className='select-style'
                onChange={this.editionChanged}
                options={this.state.availableEditions}
            ></Select>
        </div>
        );
    }
}

export default EditionSelector;
