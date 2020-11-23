import React, { Component, Fragment } from 'react';
import SearchBox from '../../../common/SearchBox';
import Spinner from '../../../common/Spinner/Spinner';
import SearchResult from '../../../common/SearchResult';
import axios from '../../../../axios';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { getUploadsImg, requestAsync } from '../../../helpers/Utils';

const TeamSearchResult = ({ item, onClick, selected }) => {
  // console.log('TeamSearchResult: ', item);
  return (
    <tr>
      <td>{getUploadsImg(item.logoImgUrl, item.id, 'team', 'TeamLogo')}</td>
      <td className={selected ? 'Selected' : ''}>
        <div
          className="TeamSearchResult"
          onClick={() => {
            if (onClick) onClick(item);
          }}
        >
          <div>
            <b>
              {item.name} ({item.keyName})
            </b>
          </div>
          {item.tournament && item.season && <div>{`${item.tournament.name} (${item.season.name})`}</div>}
        </div>
      </td>
    </tr>
  );
};

@observer
export default class TeamSearch extends Component {
  @observable loading = false;
  @observable result = null;

  handleSearch = query => {
    requestAsync(this, axios.get, null, '/search?type=t&query=' + encodeURI(query)).then(res => {
      this.result = res;
      if (this.props.onSearchResult) this.props.onSearchResult(res);
    });
  };

  render() {
    return (
      <Fragment>
        <SearchBox onSubmit={this.handleSearch} />
        <Spinner loading={this.loading}>
          <SearchResult
            onItemSelected={this.props.onItemSelected}
            data={this.result}
            itemTemplate={TeamSearchResult}
          />
        </Spinner>
      </Fragment>
    );
  }
}
