import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import Select from "react-select";

import Loc from "../Locale/Loc";
import { getSelectTheme } from "./FacilitySelector";
import Spinner from "../Spinner/Spinner";

@inject("store")
@observer
export class GoalkeeperSelector extends Component {
  @observable teamPlayers = null;
  @observable loading = false;

  componentDidMount = async () => {
    // Get team players
    const currentTeamId = this.props.passProps.teamId;
    if (currentTeamId) {
      this.loading = true;
      const currentTeamPlayers = await this.props.store.players.actions.getAll(
        "/players/forteam/" + currentTeamId
      );
      this.teamPlayers = currentTeamPlayers;
      this.loading = false;
    }
  };

  adaptOptions = (players) => {
    if (!players) return [{ key: -1, label: "", value: -1 }];

    const result = players.map((p) => ({
      key: p.id,
      label: `(${p.id}) ${p.name} ${p.surname}`,
      value: p.id,
    }));

    const p = this.props;
    if (p.passProps && p.passProps.wantsEmptyRow)
      result.unshift({ key: 0, value: 0, label: "--" });

    return result;
  };

  adaptValue = (options, value) => {
    if (!value || value === "") value = -1;
    return options.filter((opt) => opt.value === value);
  };

  onChange = (data) => {
    this.props.field.onChange(data.value);
  };

  render() {
    const { field, hint } = this.props;
    const options = this.adaptOptions(this.teamPlayers);

    return (
      <div className="FormField">
        <label className="Label forText" htmlFor={field.id}>
          {field.label}
        </label>
        <small className="Hint">
          <Loc>{hint}</Loc>
        </small>
        <Spinner loading={this.loading}>
          <Select
            {...field.bind()}
            onChange={this.onChange}
            value={this.adaptValue(options, field.value)}
            options={options}
            theme={getSelectTheme}
          />
        </Spinner>
        <small className="ValidationError">{field.error}</small>
      </div>
    );
  }
}

export default GoalkeeperSelector;
