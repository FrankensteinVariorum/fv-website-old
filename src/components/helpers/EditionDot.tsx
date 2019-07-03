import { Edition } from "../../data/edition";
import React from "react";

interface EditionDotProps {
    edition: Edition;
}

class EditionDot extends React.Component<EditionDotProps> {
    render() {
        const classes = `dot ed-${this.props.edition.code}`;

        return <span className={classes}/>;
    }
}

export default EditionDot;