import React from 'react';
import { Edition } from '../../data/edition';
import TeiAppWrapper from '../../tei-components/TeiAppWrapper';

interface TeiReadingGroupData {
    editions: Edition[];
    element: Element;
}


class TeiReadingGroup extends React.Component<TeiReadingGroupData> {

    render() {
        debugger
        const editions = this.props.editions.map((e) => <label>{e.name}</label>);
        const teiElement = React.createElement(TeiAppWrapper, {
            key: 0,
            showVariations: false,
            showText: true
        });
        debugger

        return (
            <div>
                {editions}
                {teiElement}
            </div>
        );
    }
}

export default TeiReadingGroup;
