import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import Loc from '../../../../common/Locale/Loc';
import DetailedTacticViewer from './DetailedTacticViewer';
import TacticSelector from './TacticSelector';
import { findByIdInArray } from '../../../../helpers/Data';
import { observable, observe } from 'mobx';
import InfoBox from '../../../../common/InfoBox';

@inject('store') @observer
export default class TeamTactics extends Component {
    
    @observable selectedTacticId = 0;

    disposer = null;

    saveChanges = () => {
        const team = this.props.store.teams.current;
        team.idTactic = this.selectedTacticId;
        this.props.store.teams.actions.edit(team);
    }

    handleTacticSelected = (tactic) => {
        this.setTactic(tactic.id);
    }

    setTactic = (idTactic) => {
        this.selectedTacticId = idTactic;
    }

    componentDidMount() {
        this.props.store.tactics.fetchOnce();

        const { teams } = this.props.store;
        if (teams.current) this.setTactic(teams.current.idTactic);
        
        this.disposer = observe(teams, "current", ({oldValue, newValue}) => {
            if (!newValue) return;
            this.setTactic(newValue.idTactic);
        })
    }

    componentWillUnmount() {
        if (this.disposer) this.disposer();
    }

    render() {
        const numPlayers = this.props.store.tournaments.teamSize;
        if (!numPlayers) return <InfoBox><Loc>Tactic.NoForNumPlayers</Loc></InfoBox>;

        const team = this.props.store.teams.current;
        if (!team) return <InfoBox><Loc>Error.TeamData</Loc></InfoBox>;
        
        const data = this.props.store.tactics.data;
        if (!data) return <InfoBox><Loc>Error.TacticData</Loc></InfoBox>;

        const allTactics = data.tactics;
        const selectedTactic = findByIdInArray(allTactics, this.selectedTacticId);
        const tactics = allTactics.filter(t => t.numPlayers === numPlayers);
        
        return (
            <Fragment>
                <div className='SelectedTactic'>
                    <DetailedTacticViewer value={selectedTactic} />
                    <TacticSelector data={tactics} value={this.selectedTacticId} onChange={this.handleTacticSelected}/>
                </div>
                <div className='BottomActions'>
                    <button className='Button Active' onClick={this.saveChanges}><Loc>Save</Loc></button>
                </div>
            </Fragment>
        )
    }
}