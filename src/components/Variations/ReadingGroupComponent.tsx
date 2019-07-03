import { ReadingGroup } from "../../data/spine";
import React from "react";
import EditionDot from "../helpers/EditionDot";
import { TeiConverter } from "../../tei-processing/tei-converter";

interface ReadingGroupComponentProps {
    group: ReadingGroup;
}

// Note: This class is called ReadingGroupComponent because ReadingGroup is already taken
class ReadingGroupComponent extends React.Component<ReadingGroupComponentProps> {
    render() {
        const editionNames = this.props.group.editions.map((ed) => ed.name);
        const title = editionNames.join(', ')
        const dots = this.props.group.editions.map((ed) => <EditionDot edition={ed}/>);

        const converter = new TeiConverter(false, true);
        const content = converter.teiToReactElement(this.props.group.element);

        return (
            <div className='reading-group'>
                <div className='reading-group-dots'>{ dots }</div>
                <div className='reading-group-title'>{ title }</div>
                <div className='reading-group-content'>
                    { content }
                </div>
            </div>
        )
    }
}

export default ReadingGroupComponent;