import React from 'react';
import FvStore from '../../data/store';
import { Edition } from '../../data/edition';
import './Header.sass';

interface HeaderData {
    edition: Edition | undefined;
}

class Header extends React.Component<HeaderData> {

    render() {
        const editions = FvStore.editions.map((e, index) => <label><span key={index} className={'dot ed-'+ e.code}></span>{e.name}</label>);
        return (
            <div>
                {editions}
                {this.props.edition ?
                <h2 className='edition-name'>{this.props.edition.name} Edition</h2> : ''}
                <label className='right'>Variance Image</label>
                
                <hr className='line' />
                <label className='left'>Marginalia</label>
                <label className='center'>Text</label>
                <label className='right'>Variations</label>
            </div>
        );
    }
}

export default Header;
