import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import IconButton from '../../../formFields/IconButton';
import Search from 'react-feather/dist/icons/search';
import { withRouter } from 'react-router-dom';
import { redirect } from '../../common/FormsMobx/Utils';

@inject('store') @observer
class GlobalSearchBox extends Component {

    @observable searchQuery = '';

    componentDidMount() {
        this.nameInput.focus();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.searchQuery || this.searchQuery.length < 3) return;

        const store = this.props.store.search;
        store.search(this.searchQuery);

        redirect(this, '/search/' + encodeURI(this.searchQuery));
    }

    render() {
        const p = this.props;

        return (
            <div className='GlobalSearchBox'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.searchQuery}
                        placeholder={p.placeHolder}
                        onChange={(e) => { this.searchQuery = e.target.value }}
                        ref={(input) => { this.nameInput = input }}
                    />
                    {/* <button onClick={this.handleSubmit}><</button> */}
                    <IconButton onClick={this.handleSubmit}><Search size={20} /></IconButton>
                </form>
            </div>
        )
    }
}

export default withRouter(GlobalSearchBox);