import React, { Component } from 'react';
import List from '../../common/FormsMobx/List';
import Loc from '../../common/Locale/Loc';
import { inject, observer } from 'mobx-react';
import { filterArrayByMultipleKeys } from '../../helpers/Data';


@inject('store') @observer
class SanctionList extends Component {
    
    componentDidMount = () => {
        const { getAllAction } = this.props;

        if (getAllAction) getAllAction();
    }

    splitPlayersAndTeamsSanctions = () => {
        const { listData } = this.props;
        const result = { hasTeams: false, playerSanctions: listData };
        
        if (listData) {
            result.playerSanctions = listData.filter(row => row && row.type !== 2);
            result.teamSanctions = listData.filter(row => row && row.type === 2);
            result.hasTeams = result.teamSanctions.length > 0;
        }

        return result;
    }
    
    getPlayerSanctionFields = (fd) => {
        // Filter to show only player fields
        return filterArrayByMultipleKeys(fd, 'fieldName', [ 'player.name', 'team.name', 'startDate', 'status' ]);
    }

    getTeamSanctionFields = (fd) => {
        // Filter to show only team fields
        return filterArrayByMultipleKeys(fd, 'fieldName', [ 'team.name', 'title', 'startDate', 'status' ]);
    }

    
    render() {
        const p = this.props;
        const data = this.splitPlayersAndTeamsSanctions();

        if (data.hasTeams) {
            return (
                <div className='SanctionList'>
                    {p.canAdd ? (
                    <div className='ActionBar'>
                        <button className='Button' onClick={() => this.props.addPlayerSanctionHandler(this.props.addButtonHandler)}><Loc>Add new sanction</Loc></button>
                        <button className='Button' onClick={() => this.props.addTeamSanctionHandler(this.props.addButtonHandler)}><Loc>Add new team sanction</Loc></button>
                    </div>
                    ) : null }
                    <h3><Loc>Sanctions.Players</Loc></h3>
                    <List {...p} listData={data.playerSanctions} canAdd={false} triggerGetAllAction={false} showActionBar={false} fieldDefinition={this.getPlayerSanctionFields(p.fieldDefinition)} />
                    <h3><Loc>Sanctions.Teams</Loc></h3>
                    <List {...p} listData={data.teamSanctions} canAdd={false} triggerGetAllAction={false} showActionBar={false} fieldDefinition={this.getTeamSanctionFields(p.fieldDefinition)} />
                </div>
            )
        }
        else {
            return (
                <div className='SanctionList'>
                    {p.canAdd ? (
                        <div className='ActionBar'>
                            <button className='Button' onClick={() => this.props.addPlayerSanctionHandler(this.props.addButtonHandler)}><Loc>Add new sanction</Loc></button>
                            <button className='Button' onClick={() => this.props.addTeamSanctionHandler(this.props.addButtonHandler)}><Loc>Add new team sanction</Loc></button>
                        </div>
                    ) : null }
                    <List {...p} listData={data.playerSanctions} canAdd={false} triggerGetAllAction={false} fieldDefinition={this.getPlayerSanctionFields(p.fieldDefinition)} />
                </div>
            )    
        }

    }
}

export default SanctionList;