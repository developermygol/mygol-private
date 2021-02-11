import React, { Component } from 'react';
import Loc from '../Locale/Loc';
import PlayerFlagsViewComponent from '../../pages/Tournaments/Teams/Players/PlayerFlagsViewComponent';

class TeamPlayerStatus extends Component {
  render() {
    const { field, hint } = this.props;

    return (
      <div className="FormField">
        <label className="Label" htmlFor={field.id}>
          {field.label}
        </label>
        <small className="Hint">
          <Loc>{hint}</Loc>
        </small>
        <PlayerFlagsViewComponent onChange={field.onChange} value={field.value} />
        <small className="ValidationError">{field.error}</small>
      </div>
    );
  }
}

export default TeamPlayerStatus;
