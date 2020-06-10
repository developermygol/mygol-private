import React, { Component } from 'react';
import Edit from '../../common/FormsMobx/Edit';
import { filterArrayByMultipleKeys } from '../../helpers/Data';

class EditSanctionDialogProxy extends Component {

    getPlayerSanctionFields = (fd) => {
        // Filter to show only player fields
        return filterArrayByMultipleKeys(fd, 'fieldName', [ 'idTeam', 'idPlayer', 'player.name', 'team.name', 'startDate', 'status', 'initialContent', 'numMatches' ]);
    }

    getTeamSanctionFields = (fd) => {
        // Filter to show only team fields
        return filterArrayByMultipleKeys(fd, 'fieldName', [ 'type', 'idTeam', 'title', 'startDate', 'initialContent', 'lostMatchPenalty', 'tournamentPointsPenalty' ]);
    }

    render() {
        const p = this.props;
        if (!p.data) return null;

        switch (p.data.type) {
            case 2: return <Edit {...p} fieldDefinition={this.getTeamSanctionFields(p.fieldDefinition)} />;
            default: return <Edit {...p} fieldDefinition={this.getPlayerSanctionFields(p.fieldDefinition)} />;
        }
    }
}

export default EditSanctionDialogProxy;