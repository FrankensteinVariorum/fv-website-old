import React from 'react';
import FvStore from '../../data/store';
import { Edition } from '../../data/edition';
import '../../styles/general.sass';
import variations from '../../assets/variations.jpg';

interface HeaderData {
    edition: Edition | undefined;
}

class Header extends React.Component<HeaderData> {

    render() {
        const editions = FvStore.editions.map((e, index) => 
            <label key={index} className='edition-label'><span className={'dot ed-'+ e.code}></span>{e.name}</label>);
        return (
            <div>
                <div className='row'>
                    {editions}
                    {this.props.edition ?
                    <h2 className='edition-name'>{this.props.edition.name} Edition</h2>
                    : <h2 className='edition-name'>Edition</h2>}
                    <div className='right'>
                        <label>Amount of Variance</label>
                        <img src={variations} alt={variations} />
                    </div>
                </div>

                <hr className='line' />
                <label className='left'>Marginalia</label>
                <label className='center'>Text</label>
                <label className='right'>Variations</label>
            </div>
        );
    }
}

export default Header;
