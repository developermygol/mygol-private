import React, { Component, Fragment } from 'react';
import SearchBox from '../../common/SearchBox';
import SearchResult from '../../common/SearchResult';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { requestAsync } from '../../helpers/Utils';
import axios from '../../../axios';
import Spinner from '../../common/Spinner/Spinner';


@observer
export default class PlayerSearch extends Component {

    @observable loading = false;
    @observable data = null;

    handleSearch = (query) => {
        requestAsync(this, axios.get, null, '/search?type=p&query=' + encodeURI(query))
            .then(res => {
                this.data = res;
                if (this.props.onSearchResult) this.props.onSearchResult(res);
            });
    }

    render() {
        const p = this.props;

        return (
            <Fragment>
                <SearchBox
                    onSubmit={this.handleSearch}
                />
                <Spinner loading={this.loading}>
                    <SearchResult
                        onItemSelected={p.onItemSelected}
                        data={this.data}
                        itemTemplate={p.itemTemplate}
                    />
                </Spinner>
            </Fragment>
        )
    }
}