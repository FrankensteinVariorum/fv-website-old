import React from 'react';
import FvStore from '../../data/store';
import { Edition } from '../../data/edition';
import '../../styles/_viewer.sass';
// import '../../styles/general.sass';

import variations from '../../assets/variations.jpg';
import EditionDot from '../helpers/EditionDot';

interface HeaderData {
    edition: Edition | undefined;
}

class Header extends React.Component<HeaderData> {

    render() {
        const editions = FvStore.editions.map((e, index) => 
            <label key={index} className='edition-label'><EditionDot edition={e}/>{e.name}</label>);
        return (
            <div>
                <header className='viewer__cols'>
                    <div id='viewer__legend-editions'>
                        {editions}
                    </div>
                    <div id='viewer__title'>
                        {this.props.edition ?
                        <h2>{this.props.edition.name} Edition</h2>
                        : <h2>Edition</h2>}
                    </div>
                    <div id='viewer__legend-variance'>
                        <label>Amount of Variance</label>
                        <img src={variations} alt={variations} />
                    </div>
                </header>

                <hr className='line' />
                <div className='viewer__cols'>
                    <div>Marginalia</div>
                    <div>Text</div>
                    <div>Variations</div>
                </div>
            </div>
        );
    }
}

export default Header;
