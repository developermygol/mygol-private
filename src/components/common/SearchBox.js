import React, { Component } from 'react';
import Loc from './Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';


const defaultProps = {
    label: 'Search',
    buttonText: 'Search',
    defaultValue: '',
    placeHolder: '',
    onSubmit: null
}


@observer
class SearchBox extends Component {

    @observable searchQuery = this.props.defaultValue;

    componentDidMount() {
        this.nameInput.focus();
    }

    handleSubmit = (e) => {
        const submit = this.props.onSubmit;
        if (submit) submit(this.searchQuery);
        e.preventDefault();
    }

    render() {
        const p = this.props;

        return (
            <div className='SearchBox'>
                <div className='FormField'>
                    <form onSubmit={this.handleSubmit}>
                        <label className='Label forText'><Loc>Search</Loc></label>
                        <input className='Text Search'
                            value={this.searchQuery}
                            placeholder={p.placeHolder}
                            onChange={(e) => {this.searchQuery = e.target.value}} 
                            ref={ (input) => {this.nameInput = input} }
                        />
                        <button className='Button Active' onClick={this.handleSubmit}><Loc>Search</Loc></button>
                    </form>
                </div>

            </div>
        )
    }
}

SearchBox.defaultProps = defaultProps;

export default SearchBox;