import React from 'react';
import EditionSelector from '../EditionSelector/EditionSelector';
import TeiRendering from '../TeiRendering/TeiRendering';
import { selectOption } from '../../classes/utils';

interface ViewerProperties { }

interface ViewerState {
    xml?: XMLDocument;
}

class Viewer extends React.Component <ViewerProperties, ViewerState> {

    state = {
        xml: undefined,
    }

    editionOptions: selectOption[] = [
        {value: '1818', label: '1818'},
        {value: '1823', label: '1823'},
        {value: '1831', label: '1831'},
        {value: 'Thomas', label: 'Thomas'}];

    chunkOptions: selectOption[] = [
        {value: '01', label: '1'},
        {value: '02', label: '2'},
        {value: '03', label: '3'},
        {value: '04', label: '4'},
        {value: '05', label: '5'},
        {value: '06', label: '6'},
        {value: '07', label: '7'},
        {value: '08', label: '8'},
        {value: '09', label: '9'},
        {value: '10', label: '10'}];

    output = (evt: XMLDocument) => {
        console.log("output changed", evt);
        this.setState( {xml: evt} );
    }    

    render() {
        return (
            <div>
                <EditionSelector editionOptions={this.editionOptions} chunkOptions={this.chunkOptions} func={this.output} />
                { this.state.xml ? <TeiRendering xml={this.state.xml!} /> : '' }
            </div>

        );
    }

}

export default Viewer;
