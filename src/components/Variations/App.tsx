import { Apparatus } from "../../data/spine";
import React from "react";

import '../../styles/tei.sass';
import { Edition } from "../../data/edition";
import ReadingGroupComponent from "./ReadingGroupComponent";

interface VariationProps {
    app: Apparatus;
    edition: Edition;
}

class Variation extends React.Component <VariationProps> {
    render() {
        const groups = this.props.app.groups.map((grp) => (
            <ReadingGroupComponent group={grp}/>
        ))
        return (
            <div className="app-list">
                <hr className="app-list-to-divider"/>
                { groups }
            </div>
        )
    }
}

export default Variation;