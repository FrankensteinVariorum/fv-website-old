import React from 'react';

interface TeiRenderingData {
    xml: XMLDocument;
}

class TeiRendering extends React.Component<TeiRenderingData> {
    render() {
        return (
            <pre>{this.props.xml.documentElement.outerHTML}</pre>
        );
    }
}

export default TeiRendering;
