import React from 'react';
import { Edition } from '../../data/edition';
import TeiAppWrapper from '../../tei-components/TeiAppWrapper';
import { TeiConverter } from '../../tei-processing/tei-converter';

interface TeiReadingGroupData {
    editions: Edition[];
    element: Element;
}


class TeiReadingGroup extends React.Component<TeiReadingGroupData> {

    render() {
        const editions = this.props.editions.map((e) => <label>{e.name}</label>);

        const converter = new TeiConverter();
        const reactElement = converter.teiToReactElement(this.props.element);

        const teiElement = React.createElement(TeiAppWrapper, {
            key: 0,
            showVariations: false,
            showText: true
        }, [reactElement]);

        return (
            <div>
                {editions}:
                {teiElement}
                ___________
            </div>
        );
    }
}

export default TeiReadingGroup;
