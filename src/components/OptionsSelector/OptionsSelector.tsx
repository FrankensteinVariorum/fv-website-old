import React from 'react';

interface OptionsSelectorProps {
    showVariations: boolean,
    showText: boolean,

    onVariationChanged: (variation: boolean) => void;
    onTextChanged: (text: boolean) => void;
}

interface OptionsSelectorState {
    showVariations: boolean,
    showText: boolean,
}

class OptionsSelector extends React.Component<OptionsSelectorProps, OptionsSelectorState> {

    state = {
        showVariations: true,
        showText: true,
    }
    
    componentDidUpdate(prevProps: OptionsSelectorProps) {
        if (this.props.showVariations !== this.state.showVariations) {
            this.setState( { showVariations: this.props.showVariations });
        }

        if(this.props.showText !== this.state.showText) {
            this.setState( { showText: this.props.showText });
        }
        
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
            <label>CHOOSE OPTIONS</label>
            <label>
                <input
                    name="variation"
                    type="checkbox"
                    checked={this.state.showVariations}
                    onChange={this.onVariationChanged} />
                See Variants
            </label>
            
            <label>
                <input
                    name="text"
                    type="checkbox"
                    checked={this.state.showText}
                    onChange={this.onTextChanged} />
                See Text
            </label>
        </div>
        );
    }
}

export default OptionsSelector;
