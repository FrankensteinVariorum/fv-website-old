import React from 'react';
import '../../styles/tei.sass';

interface TeiReactTextProps {
    text: string;
    showText: boolean;
    showVariations: boolean;
}

class TeiReactText extends React.Component<TeiReactTextProps> {

    render() {
        let classes = 'tei-cdata';
        if (!this.props.showText) {
            classes += ' no-text';
        }

        return (
            <span className={classes}>
                { this.props.text }      
            </span>
        );
    }
}
            
export default TeiReactText;
