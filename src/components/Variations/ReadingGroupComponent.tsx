import { ReadingGroup } from "../../data/spine";
import React from "react";

interface ReadingGroupComponentProps {
    group: ReadingGroup;
}

// Note: This class is called ReadingGroupComponent because ReadingGroup is already taken
class ReadingGroupComponent extends React.Component<ReadingGroupComponentProps> {
    render() {
        const editionNames = this.props.group.editions.map((ed) => ed.name);
        const title = editionNames.join(', ')

        return (
            <div className='reading-group'>
                <div className='title'>{ title }</div>
            </div>
        )
    }
}

export default ReadingGroupComponent;