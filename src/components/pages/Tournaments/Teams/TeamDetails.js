import React, { Component } from 'react';
import Apparel from './Apparel/Apparel';
import TeamCalendar from './Calendar/TeamCalendar';
import Loc from '../../../common/Locale/Loc';
import TeamPlayers from './Players/TeamPlayers';
import TeamSponsors from './Sponsors/TeamSponsors';

import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import asyncComponent from '../../../common/AsyncComponent';
import { Link } from 'react-router-dom';
import PlayerGrid from '../../Players/PlayerGrid';
import { getUploadsImg } from '../../../helpers/Utils';
import TacticWidget from './Tactics/TacticWidget';
import ApparelWidget from './Apparel/ApparelWidget';
import AccessLimit from '../../../common/AccessLimit';
import { observable } from '../../../../../node_modules/mobx';
import NotificationDialog from '../../../common/NotificationDialog';
import TeamPhotos from './Photos/TeamPhotos';
import MessageBox from '../../../common/Dialogs/MessageBox';
import { redirect } from '../../../common/FormsMobx/Utils';
import PaymentsIndex from '../../PaymentConfig/PaymentsIndex';
import TeamSanctions from './TeamSanctions';
//import TacticEditor from './Tactics/TacticEditor';

// Lazy load Logo component tree.
const asyncLogo = asyncComponent(() => import('./Logo/Logo'));
const asyncTactic = asyncComponent(() => import('./Tactics/TopLevelTactic'));

@inject('store') @observer
class TeamDetails extends Component {

    componentDidMount = () => {
        const { teams } = this.props.store;

        // Sets the current team from URL.
        const idTeam = this.props.match.params.idTeam;
        teams.setCurrent(idTeam);
    }

    componentWillUnmount = () => {
        const { teams } = this.props.store;
        teams.setCurrent(null);
    }


    render() {
        const baseUrl = this.props.match.url;
        const basePath = '/tournaments/:idTournament/teams/:idTeam';

        return (
            <React.Fragment>
                <AccessLimit allowOrgAdmin allowTeamAdmin>
                    <ul className='TabBar'>
                        <li className='TabItem'><NavLink to={baseUrl} exact><Loc>Home</Loc></NavLink></li>
                        <li className='TabItem'><NavLink to={baseUrl + '/apparel'}><Loc>Apparel</Loc></NavLink></li>
                        <li className='TabItem'><NavLink to={baseUrl + '/logo'}><Loc>Logo</Loc></NavLink></li>
                        <li className='TabItem'><NavLink to={baseUrl + '/tactics/select'}><Loc>Tactics</Loc></NavLink></li>
                        <li className='TabItem'><NavLink to={baseUrl + '/photos'}><Loc>Photos</Loc></NavLink></li>
                        <li className='TabItem'><NavLink to={baseUrl + '/players'}><Loc>Players</Loc></NavLink></li>
                        {/* <li className='TabItem'><NavLink to={baseUrl + '/matches'}><Loc>Matches</Loc></NavLink></li> */}
                        <li className='TabItem'><NavLink to={baseUrl + '/sanctions'}><Loc>Sanctions</Loc></NavLink></li>
                        <li className='TabItem'><NavLink to={baseUrl + '/sponsors'}><Loc>Sponsors</Loc></NavLink></li>
                        <AccessLimit allowOrgAdmin><li className='TabItem'><NavLink to={baseUrl + '/payments'}><Loc>Payments</Loc></NavLink></li></AccessLimit>
                    </ul>
                </AccessLimit>

                <div className='TabContent'>
                    <Switch>
                        <Route path={basePath + '/apparel'} component={Apparel} />
                        <Route path={basePath + '/logo'} component={asyncLogo} />
                        {/* <Route path={basePath + '/tactics/editor'} component={TacticEditor} /> */}
                        <Route path={basePath + '/tactics'} component={asyncTactic} />
                        <Route path={basePath + '/calendar'} component={TeamCalendar} />
                        <Route path={basePath + '/photos'} component={TeamPhotos} />
                        <Route path={basePath + '/players'} component={TeamPlayers} />
                        <Route path={basePath + '/sponsors'} component={TeamSponsors} />
                        <Route path={basePath + '/sanctions'} component={TeamSanctions} />
                        <Route path={basePath + '/payments'} component={PaymentsIndex} />
                        <Route path={basePath} exact component={TeamIndex} />
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}

@inject('store') @observer
class TeamIndex extends Component {

    @observable showNotifyDialog = false;
    @observable showObliterateConfirmation = false;

    notifyButtonHandler = () => {
        this.showNotifyDialog = true;
    }

    handleNotificationClose = (data) => {
        this.showNotifyDialog = false;
        if (!data) return;

        const store = this.props.store.notifications;
        store.notifyTeam(this.props.match.params.idTeam, data.title, data.message);
    }


    obliterateTeamHandler = () => {
        this.showObliterateConfirmation = true;
    }

    teamObliteratedHandler = (button) => {
        this.showObliterateConfirmation = false;
        if (button !== 'Delete') return;

        const p = this.props;

        p.store.teams.obliterate(p.store.teams.current)
            .then(res => {
                if (!res) return;

                redirect(this, '..');
            })
    }


    render() {
        const team = this.props.store.teams.current;
        if (!team) return null;

        const url = this.props.match.url;

        return (
            <div className='CardContainer'>
                
                <div className='Card W33'>
                    <h3><Link to={url + '/logo'}><Loc>Logo</Loc></Link> <Link className='Edit' to={url + '/logo'}><Loc>Edit</Loc></Link></h3>
                    <div className='Content Center'>
                        { team.logoImgUrl ? 
                            getUploadsImg(team.logoImgUrl, team.id, 'team', 'Logo') 
                            : 
                            <div className='NoData'>
                                <Loc>Team.NoLogo.AddOne</Loc>
                            </div>
                        }
                    </div>
                </div>

                {/* <div className='Card W33'>
                    <h3><Link to={url + '/photo'}><Loc>TeamPhoto</Loc></Link> <Link className='Edit' to={url + '/photo'}><Loc>Edit</Loc></Link></h3>
                    <div className='Content'>

                    </div>
                </div> */}

                <div className='Card W33'>
                    <h3><Link to={url + '/apparel'}><Loc>Apparel</Loc></Link> <Link className='Edit' to={url + '/apparel'}><Loc>Edit</Loc></Link></h3>
                    <div className='Content'>
                        {team.apparelConfig ? 
                            <ApparelWidget data={team.apparelConfig} />
                            : 
                            <div className='NoData'>
                                <Loc>Team.NoApparel.AddOne</Loc>
                            </div>
                        }
                    </div>
                </div>

                <div className='Card W33'>
                    <h3><Link to={url + '/tactics/select'}><Loc>Tactic</Loc></Link> <Link className='Edit' to={url + '/tactics/select'}><Loc>Edit</Loc></Link></h3>
                    <div className='Content'>
                        {team.idTactic ? 
                            <TacticWidget idTactic={team.idTactic} />
                            : 
                            <div className='NoData'>
                                <Loc>Team.NoTactic.AddOne</Loc>
                            </div>
                        }
                    </div>
                </div>

                

                <div className='Card Hero'>
                    <h3><Link to={url + '/players'}><Loc>Players</Loc></Link> <Link className='Edit' to={url + '/players'}><Loc>See all</Loc></Link></h3>
                    <div className='Content'>
                        <PlayerGrid 
                            players={team.players}
                        />
                    </div>
                </div>

                <AccessLimit allowOrgAdmin >
                    <div className='Card Hero'>
                        <h3><Loc>Actions</Loc></h3>
                        <div className='Content'>
                            <button className='Button' onClick={this.notifyButtonHandler}><Loc>SendNotification</Loc></button>
                            <button className='Button Dangerous' onClick={this.obliterateTeamHandler}><Loc>Team.Obliterate</Loc></button>
                        </div>
                    </div>
                </AccessLimit>
                    
                <NotificationDialog info='NotifyTeam' onClose={this.handleNotificationClose} show={this.showNotifyDialog} />

                <MessageBox show={this.showObliterateConfirmation} onClose={this.teamObliteratedHandler} buttons='DeleteCancel' >
                    <p className='ModalHead'><Loc>Team.Obliterate.Confirm.Title</Loc></p>
                    <p><Loc>Team.Obliterate.Confirm</Loc></p>
                </MessageBox>

                
            </div>
        )
    }
}


export default withRouter(TeamDetails);