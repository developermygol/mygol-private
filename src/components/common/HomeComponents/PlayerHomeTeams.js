import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner';
import InfoBox from '../InfoBox';
import Loc, { Localize } from '../Locale/Loc';
import { getTeamLogo } from '../../helpers/Utils';
import { Link, withRouter } from 'react-router-dom';
import { redirect } from '../FormsMobx/Utils';
import { inject, observer } from 'mobx-react';
import { findByIdInArray } from '../../helpers/Data';


@inject('store') @observer
class PlayerHomeTeams extends Component {
    editTeam = (idTournament, idTeam) => {
        redirect(this, '/tournaments/' + idTournament + '/teams/' + idTeam);
    }

    editPlayer = (idTournament, idTeam, idPlayer) => {
        const to = '/tournaments/' + idTournament + '/teams/' + idTeam + '/players/edit/' + idPlayer;
        redirect(this, to);
    }
    
    
    render() {
        const p = this.props;
        const pl = p.player;
        const seasons = p.store.organization.seasons.all;

        return (
            <Spinner loading={!pl}>
                {pl && pl.teams && pl.teams.length > 0 ?
                    <div>
                        {pl.teams.map((team, i) => {
                            if (!team) return null;

                            const td = team.teamData;
                            const tnmt = team.tournament;
                            const idTournament = tnmt && tnmt.id;
                            const season = tnmt ? findByIdInArray(seasons, tnmt.idSeason) : null;
                            //const svg = team.apparelConfig ? JSON.parse(team.apparelConfig) : null;

                            return (
                                <div key={team.id + '-' + i} className='PlayerTeam'>
                                    {getTeamLogo(td && idTournament, team.id, team.logoImgUrl)}

                                    <div className='Details'>
                                        <p className='TeamName'>{td && td.isTeamAdmin === 'true' ? <Link to={'/tournaments/' + (idTournament) + '/teams/' + team.id}>{team.name}</Link> : team.name } </p>
                                        { tnmt ? <p className='TournamentName'>{tnmt.name} {season ? '(' + season.name + ')' : null}</p> : null }
                                        {td && td.status > 0 ? 
                                            <div className='Enroll'>
                                                <div className='Actions'>
                                                    {td.isTeamAdmin === 'true' || td.isTeamAdmin === true ? 
                                                        <button className='Button Active' onClick={() => this.editTeam(idTournament, team.id)}><Loc>Edit my team</Loc></button>
                                                        :
                                                        <button className='Button Active' onClick={() => this.editPlayer(idTournament, team.id, pl.id)}><Loc>Edit my profile</Loc></button>
                                                    }
                                                </div>
                                                <div className='Number'><Loc>ApparelNumber</Loc>: {td.apparelNumber}</div>
                                                <div className='Position'><Loc>FieldPosition</Loc>: {Localize('FieldPosition' + td.fieldPosition)}</div>
                                                <div className='Side'><Loc>FieldSide</Loc>: {Localize('FieldSide' + td.fieldSide)}</div>
                                            </div>
                                            :
                                            <div className='NoEnroll'>
                                                <p><strong>No has completado tu inscripción.</strong></p>
                                                <p>Debes hacerlo desde la aplicación para móviles. Busca "MyGol" en tu AppStore o Play Store</p>
                                            </div>
                                        }
                                    </div>

                                    {/* <div className='Apparel'>
                                        {svg ? <ApparelSvg {...JSON.parse(team.apparelConfig || '')} /> : null }
                                    </div> */}

                                    {/* <div className='TeamPhoto' style={{ backgroundImage: "url('"+ getUploadsIcon(team.teamImgUrl, null, null) + "')" }}>
                                            
                                    </div> */}

                                </div>
                            )
                        })}
                    </div>
                    :
                    <InfoBox><Loc>Player.NoTeams</Loc></InfoBox>
                }
            </Spinner>
        )
    }
}

export default withRouter(PlayerHomeTeams);