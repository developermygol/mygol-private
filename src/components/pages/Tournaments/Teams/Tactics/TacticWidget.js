import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SoccerField from './SoccerField';
import InfoBox from '../../../../common/InfoBox';
import { findByIdInArray } from '../../../../helpers/Data';
import Loc from '../../../../common/Locale/Loc';

@inject('store')
@observer
class TacticWidget extends Component {
  componentDidMount() {
    this.props.store.tactics.fetchOnce();
  }

  render() {
    const p = this.props;
    const { data } = p.store.tactics;
    if (!data) return null;

    const selectedTactic = findByIdInArray(data.tactics, p.idTactic);
    if (!selectedTactic)
      return (
        <InfoBox>
          <Loc>Error.TacticNotFound</Loc>
        </InfoBox>
      );

    return (
      <div>
        <SoccerField positions={selectedTactic.positions} className="none" />
        <div>
          <p className="Center">
            {selectedTactic.name} {selectedTactic.title}
          </p>
        </div>
      </div>
    );
  }
}

export default TacticWidget;
