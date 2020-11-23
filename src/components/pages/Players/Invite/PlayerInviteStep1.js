import React, { Component } from 'react';
import PlayerSearch from '../PlayerSearch';

class PlayerInviteStep1 extends Component {
  handleItemSelected = data => {
    this.props.state.selectedItem = data;
  };

  handleSearchResult = data => {
    this.props.state.searchResult = data;
  };

  render() {
    return <PlayerSearch onItemSelected={this.handleItemSelected} onSearchResult={this.handleSearchResult} />;
  }
}

export default PlayerInviteStep1;
