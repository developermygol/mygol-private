import React, { Component, Fragment } from 'react';
import Loc, { Localize } from '../../common/Locale/Loc';
import DetailField from '../../common/DetailField';
import { getUploadsImg, getAge, getPlayerIdPicture, getPlayerIdPictureWithLink } from '../../helpers/Utils';
import AccessLimit from '../../common/AccessLimit';
import { withRouter } from 'react-router-dom';
import NotificationDialog from '../../common/NotificationDialog';
import { inject, observer } from 'mobx-react';
import { redirect } from '../../common/FormsMobx/Utils';
import SpinnerButton from '../../common/SpinnerButton';
import { observable } from 'mobx';

@inject('store') @observer
class PlayerData extends Component {

    @observable showNotifyDialog = false;

    editButtonHandler = () => {
        const { idTournament, idTeam, idPlayer } = this.props.match.params;
        redirect(this, `/tournaments/${idTournament}/teams/${idTeam}/players/edit/${idPlayer}`);
    }

    notifyButtonHandler = () => {
        this.showNotifyDialog = true;
    }

    resendEmail = () => {
        const { idTournament, idTeam, idPlayer } = this.props.match.params;
        this.props.store.players.resendInvite(idPlayer, idTeam, idTournament, null);
    }

    handleNotificationClose = (data) => {
        this.showNotifyDialog = false;
        if (!data) return;

        const store = this.props.store.notifications;
        store.notifyUser(this.props.player.idUser, data.title, data.message);
    }

    render() {
        const p = this.props;

        const { idTeam } = p.match.params;
        const { player } = p;

        return (
            <Fragment>
                <div className='Card Hero'>
                    <h3><Loc>Player.Details</Loc></h3>
                    <div className='Content'>
                        <div className='ShowSection'>
                            <div className='ShowImageField'>
                                <p className='Label'><Loc>FichaImg</Loc></p>
                                {getPlayerIdPicture(player.idPhotoImgUrl, 'PlayerAvatar Large')}
                            </div>
                            <div className='ShowImageField'>
                                <p className='Label'><Loc>AvatarImg</Loc></p>
                                {player.userData && getUploadsImg(player.userData.avatarImgUrl, player.id, 'user', 'PlayerAvatar Large')}
                            </div>

                            <AccessLimit allowOrgAdmin>
                                <div className='ShowImageField'>
                                    <p className='Label'><Loc>IdCard1</Loc></p>
                                    {getPlayerIdPictureWithLink(player.idCard1ImgUrl, 'IdCard')}
                                </div>
                                <div className='ShowImageField'>
                                    <p className='Label'><Loc>IdCard2</Loc></p>
                                    {getPlayerIdPictureWithLink(player.idCard2ImgUrl, 'IdCard')}
                                </div>
                            </AccessLimit>

                        </div>


                        <div className='ShowSection'>
                            <p className='FormField Separator'><Loc>Personal data</Loc></p>
                            <ul>
                                <AccessLimit allowOrgAdmin>
                                    <DetailField label='IdCard' value={player.idCardNumber} />
                                    <DetailField label='Address1' value={player.address1} />
                                    <DetailField label='Address2' value={player.address2} />
                                    <DetailField label='City' value={player.city} />
                                    <DetailField label='State' value={player.state} />
                                    <DetailField label='CP' value={player.cp} />
                                    <DetailField label='Country' value={player.country} />
                                </AccessLimit>
                                <DetailField label='Email' value={player.userData && player.userData.email} />
                                <DetailField label='Mobile' value={player.userData && player.userData.mobile} />
                            </ul>
                        </div>

                        <div className='ShowSection'>
                            <p className='FormField Separator'><Loc>Public profile data</Loc></p>
                            <DetailField label='Age' value={getAge(player.birthDate)} />
                            <DetailField label='Height' value={player.height} />
                            <DetailField label='Weight' value={player.weight} />

                            <DetailField label='FacebookKey' value={player.facebookKey} />
                            <DetailField label='InstagramKey' value={player.instagramKey} />
                            <DetailField label='TwitterKey' value={player.twitterKey} />
                            <DetailField label='Motto' value={player.motto} />
                            {/* <DetailField label='SignatureImgUrl' value={player.signatureImgUrl} />
                            <DetailField label='LargeImgUrl' value={player.largeImgUrl} /> */}
                        </div>
                        {player.teamData ?
                            <div className='ShowSection'>
                                <p className='FormField Separator'><Loc>Team data</Loc></p>
                                <DetailField label='ApparelNumber' value={player.teamData.apparelNumber} />
                                <DetailField label='FieldPosition' value={Localize('FieldPosition' + (player.teamData.fieldPosition || 0))} />
                                <DetailField label='FieldSide' value={Localize('FieldSide' + (player.teamData.fieldSide || 0))} />
                            </div>
                            : null
                        }
                        <div className='ShowActions'>
                            <p className='FormField Separator'> </p>

                            {idTeam ?
                                // <Link className='Button' to={'edit/' + idPlayer} ><Loc>Edit</Loc></Link>   // Replace with this when functionality is enabled
                                <div>
                                    <button className='Button' onClick={this.editButtonHandler}><Loc>Edit</Loc></button>
                                    <AccessLimit allowOrgAdmin><button className='Button' onClick={this.notifyButtonHandler}><Loc>SendNotification</Loc></button></AccessLimit>
                                    <AccessLimit allowOrgAdmin allowTeamAdmin><SpinnerButton className='Button' onClick={this.resendEmail} loading={this.props.store.players.loading}><Loc>ResendInvite</Loc></SpinnerButton></AccessLimit>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>

                <NotificationDialog info='NotifyUser' onClose={this.handleNotificationClose} show={this.showNotifyDialog} />
            </Fragment>
        )
    }
}

export default withRouter(PlayerData);