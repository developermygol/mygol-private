import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import StagesTable from './StagesTable';
import { normalize, sortArrayByName } from '../../../helpers/Data';
import StagesTeams from './StagesTeams';
import EditDialog from './EditDialog';
import StageEdit from './StageEdit';
import GroupEdit from './GroupEdit';
import { redirect } from '../../../common/FormsMobx/Utils';
import InfoBox from '../../../common/InfoBox';
import MessageBox from '../../../common/Dialogs/MessageBox';

@inject('store') @observer
class Stages extends Component {

    @observable showStageDialog = false;
    @observable showGroupDialog = false;
    @observable dialogProps = null;


    isReadOnlyTournament = () => {
        return this.props.store.tournaments.current.status >= 3;
    }

    
    // __ Button handlers _____________________________________________________


    @action addStageHandler = () => {
        this.showStageDialog = true;
        this.dialogProps = {
            action: this.stageAddedHandler,
            isEditing: false,
            data: {
                name: '', type: 1, status: 1        // Default values
            }            
        };
    }

    @action editStageHandler = (stage) => {
        this.showStageDialog = true;
        this.dialogProps = {
            action: this.stageEditedHandler, 
            data: stage, 
            isEditing: true,
            readOnly: this.isReadOnlyTournament()
        }
    }

    deleteStageHandler = (stage) => {
        const msg = <p><Loc>Really delete?</Loc> {stage.name}?</p>;
        this.showConfirmation(msg, stage, this.stageDeletedHandler);
    }

    setActiveStageHandler = (stage) => {
        // Directly call action in store
    }

    @action addGroupHandler = (stage) => {
        this.showGroupDialog = true;
        this.dialogProps = {
            action: this.groupAddedHandler, 
            data: { name: '' },
            stage: stage,
            isEditing: false
        }
    }

    @action editGroupHandler = (group) => {
        this.showGroupDialog = true;
        this.dialogProps = {
            action: this.groupEditedHandler, 
            data: group, 
            isEditing: false,
            readOnly: this.isReadOnlyTournament()
        }
    }

    deleteGroupHandler = (group) => {
        const msg = <p><Loc>Really delete?</Loc> {group.name}?</p>;
        this.showConfirmation(msg, group, this.groupDeletedHandler);
    }

    editGroupCalendarHandler = (group) => {
        // TODO: Check that all group slots are filled with teams.
        
        const baseUrl = this.props.match.url;
        redirect(this, baseUrl + '/calendar/' + group.id);
    }

    teamCanDrop = (team, group) => {
        const teamAlready = 
            this.props.store.teamGroups.all
                .filter((tg => tg.idStage === group.idStage && tg.idTeam === team.id));

        return teamAlready.length === 0;
    }


    // __ Event handlers ______________________________________________________

    getTournament = () => {
        return this.props.match.params.idTournament;
    }

    @action stageAddedHandler = (stage) => {
        this.showStageDialog = false;
        if (!stage) return;

        stage.idTournament = this.getTournament();
        this.props.store.stages.actions.create(stage);
    }

    @action stageEditedHandler = (stage) => {
        this.showStageDialog = false;
        if (!stage) return;

        stage.idTournament = this.getTournament();
        this.props.store.stages.actions.edit(stage);
    }

    @action stageDeletedHandler = (stage) => {
        this.props.store.stages.actions.remove(stage);
    }


    @action groupAddedHandler = (group, stage) => {
        this.showGroupDialog = false;
        if (!stage || !group) return;

        group.idStage = stage.id;
        group.idTournament = this.getTournament();
        this.props.store.groups.actions.create(group);
    }

    @action groupEditedHandler = (group) => {
        this.showGroupDialog = false;
        if (!group) return;

        group.idTournament = this.getTournament();
        this.props.store.groups.actions.edit(group);
    }

    @action groupDeletedHandler = (group) => {
        this.props.store.groups.actions.remove(group);
    }

    @action teamDroppedHandler = (team, source, destinationGroup, position) => {
        //console.log("team", team.name, "desde" , source && source.name, "hasta" , destinationGroup.name, position);
        
        if (!source) {
            const teamGroup = {
                idTournament: this.getTournament(),
                idTeam: team.id, 
                idStage: destinationGroup.idStage,
                idGroup: destinationGroup.id,
                sequenceOrder: position
            };

            this.props.store.teamGroups.actions.create(teamGroup, null, 'TeamAddedToGroup');
        }
        else {
            // moving an existing team to a different location, have to update instead of adding
        }
    }

    @action teamDeletedHandler = (teamGroup) => {
        this.props.store.teamGroups.actions.remove(teamGroup);
    }

    
    // __ Confirm dialog _______________________________________________________


    @observable showConfirmDialog = false;
    confirmDialogProps  = null;

    @action showConfirmation(msg, data, onAccept) {
        this.confirmDialogProps = {msg, data, onAccept };
        this.showConfirmDialog = true;
    }

    @action confirmDialogCloseHandler = (button) => {
        if (button === 'Yes') this.confirmDialogProps.onAccept(this.confirmDialogProps.data);

        this.showConfirmDialog = false;
    }


    callbacks = {
        editStage: this.editStageHandler,
        deleteStage: this.deleteStageHandler, 
        setActiveStage: this.setActiveStageHandler, 
        addGroup: this.addGroupHandler, 
        editGroup: this.editGroupHandler, 
        deleteGroup: this.deleteGroupHandler, 
        editGroupCalendar: this.editGroupCalendarHandler,
        
        deleteTeamGroup: this.teamDeletedHandler,
        teamCanDrop: this.teamCanDrop,
        teamDropped: this.teamDroppedHandler,
    }
    
    render() {
        const p = this.props;
        const teams = p.store.teams.all;
        if (!teams) return null;
        
        const sortedTeams = sortArrayByName(teams);
        const readOnly = this.isReadOnlyTournament();

        const normalTeams = normalize(teams);

        return (
            <div>
                { readOnly ? <InfoBox><Loc>Stages.TournamentAlreadyStarted</Loc></InfoBox> : null}
                <div className='Flex'>
                    <div className='Stages'>
                        <h3><Loc>Stages</Loc></h3>
                        { readOnly ? null : <button className='Button Second' onClick={this.addStageHandler}><Loc>Add stage</Loc></button> }
                        <StagesTable 
                            stages={p.store.stages.all}
                            groups={p.store.groups.all}
                            teamGroups={p.store.teamGroups.all}
                            normalTeams={normalTeams}
                            edit={true}
                            callbacks={this.callbacks}
                            readOnly={readOnly}
                        />
                    </div>
                    { readOnly ? 
                        null :
                        <div className='Teams'>
                            <h3><Loc>Teams</Loc></h3>
                            <StagesTeams data={sortedTeams} readOnly={readOnly} />
                        </div>
                    }
                </div>
                <EditDialog show={this.showStageDialog}>
                    <StageEdit {...this.dialogProps}  />
                </EditDialog>
                <EditDialog show={this.showGroupDialog}>
                    <GroupEdit {...this.dialogProps} />
                </EditDialog>
                <MessageBox buttons='YesNo' show={this.showConfirmDialog} onClose={this.confirmDialogCloseHandler}>
                    {this.confirmDialogProps && this.confirmDialogProps.msg}
                </MessageBox>
            </div>
        )
    }
}

export default withRouter(Stages);