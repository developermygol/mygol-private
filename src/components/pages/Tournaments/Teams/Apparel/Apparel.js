import React, { Component } from 'react';
import ApparelSvg from './ApparelSvg';
import Loc from '../../../../common/Locale/Loc';
import { EditableSvgViewer } from '../Logo/LogoEditor';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import InfoBox from '../../../../common/InfoBox';

const defaultValues = {
  color1: { type: 'color', caption: 'Apparel.ShirtColor', value: '#FFFFFF' },
  color15: { type: 'color', caption: 'Apparel.ShirtColor2', value: '#EEEEEE' },
  color20: { type: 'color', caption: 'Apparel.PantsColor', value: '#FFFFFF' },
  color30: { type: 'color', caption: 'Apparel.SocksColor', value: '#FFFFFF' },
  color40: { type: 'color', caption: 'Apparel.TextColor', value: '#000000' },
};

@inject('store')
@observer
export default class Apparel extends Component {
  @observable canSave = false;

  saveButtonHandler = () => {
    const store = this.props.store.teams;
    const { idTournament, idTeam } = this.props.match.params;

    store.actions.edit(store.current).then(res => (this.canSave = false));
    this.props.history.push(`/tournaments/${idTournament}/teams/${idTeam}`);
  };

  onChange = data => {
    console.log('onChange');
    this.props.store.teams.current.apparelConfig = JSON.stringify(data);
    this.canSave = true;
  };

  render() {
    const team = this.props.store.teams.current;
    if (!team)
      return (
        <InfoBox>
          <Loc>No team</Loc>
        </InfoBox>
      );

    const jsonConfig = team.apparelConfig;
    const apparelConfig = jsonConfig ? JSON.parse(jsonConfig) : defaultValues;

    return (
      <div className="EditorContent">
        <h2>
          <Loc>Apparel</Loc>
        </h2>
        <EditableSvgViewer logo={ApparelSvg} onChange={this.onChange} data={apparelConfig} />
        <div className="">
          {/* <BackButton /> */}
          <button
            disabled={!this.canSave}
            className={'Button ' + (this.canSave ? 'Active' : 'Disabled')}
            onClick={this.saveButtonHandler}
          >
            <Loc>Save</Loc>
          </button>
        </div>
      </div>
    );
  }
}
