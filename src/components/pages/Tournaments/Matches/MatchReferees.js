import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';
import { getUploadsImg } from '../../../helpers/Utils';
import IconButton from '../../../../formFields/IconButton';
import XCircle from 'react-feather/dist/icons/x-circle';
import { observer } from 'mobx-react';
import AccessLimit from '../../../common/AccessLimit';

@observer
export default class MatchReferees extends Component {
    
    renderReferees = (referees) => {
        return referees.map(r => (
            <li key={r.idUser} className='Refer'>
                {getUploadsImg(r.referee.avatarImgUrl, r.idUser, 'user', 'PlayerAvatar Mini')}
                <p className='Name'>{r.referee.name}</p>
                {/* <Loc>{r.role}</Loc> */}
                <AccessLimit allowOrgAdmin> <IconButton onClick={() => this.props.removeRefereeHandler(r)} ><XCircle size={20} /></IconButton> </AccessLimit>
            </li>

        ))
    }
    
    render() {
        const p = this.props;
        const refers = p.referees;

        return (
            <div className='MatchRefers'>
                <h4><Loc>Referees</Loc></h4>
                {refers && refers.length > 0 ? 
                    <div className='Horizontal'>
                        {this.renderReferees(refers)}
                    </div>
                    : 
                    <p className='InfoBox'><Loc>Match.NoReferees</Loc></p>
                }
                <AccessLimit allowOrgAdmin> <button className='Button' onClick={this.props.addRefereeHandler}><Loc>Match.AssignReferee</Loc></button> </AccessLimit>
            </div>
        )
    }
}