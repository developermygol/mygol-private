import React, { Component } from "react";
import TeamsGrid from "./Teams/TeamsGrid";
import { inject, observer } from "mobx-react";
import Loc from "../../common/Locale/Loc";
import { Link, withRouter } from "react-router-dom";
import { requestAsync } from "../../helpers/Utils";
import axios from "../../..//axios";
import TournamentStatus from "./TournamentStatus";
import NotificationDialog from "../../common/NotificationDialog";
import { observable } from "../../../../node_modules/mobx";
import SpinnerButton from "../../common/SpinnerButton";

@inject("store")
@observer
class TournamentIndex extends Component {
  @observable showNotifyDialog = false;
  @observable loading = false;

  notifyButtonHandler = () => {
    this.showNotifyDialog = true;
  };

  handleNotificationClose = (data) => {
    this.showNotifyDialog = false;
    if (!data) return;

    const store = this.props.store.notifications;
    store.notifyTournament(
      this.props.match.params.idTournament,
      data.title,
      data.message
    );
  };

  recalculateStats = () => {
    requestAsync(
      this,
      axios.post,
      "OK",
      this.props.match.url + "/recalculatestats",
      null
    );
  };

  clearSanctions = () => {
    requestAsync(
      this,
      axios.post,
      "OK",
      this.props.match.url + "/clearautomaticsanctions",
      null
    );
  };

  recalculateSanctions = () => {
    requestAsync(
      this,
      axios.post,
      "OK",
      this.props.match.url + "/recalculateautomaticsanctions",
      null
    );
  };

  render() {
    const p = this.props;
    const baseUrl = p.match.url;
    const { idTournament } = p.match.params;
    const s = p.store;
    const teams = s.teams.all;
    const stages = s.stages.all;
    const t = s.tournaments.current;

    const st = !teams || teams.length === 0;
    const ss = !stages || stages.length === 0;
    const sl = t && !t.logoImgUrl;

    return (
      <div className="CardContainer">
        <div className="Card Hero Actions">
          <h3>
            <Loc>Tournament.Actions</Loc>
          </h3>
          <div className="Content">
            <TournamentStatus tournament={t} />
            {st ? (
              <Link className="Action Team" to={baseUrl + "/teams"}>
                <Loc>Setup teams</Loc>
              </Link>
            ) : null}
            {ss ? (
              <Link className="Action Calendar" to={baseUrl + "/stages"}>
                <Loc>Stages and groups</Loc>
              </Link>
            ) : null}
            {sl ? (
              <Link
                className="Action Tournament"
                to={"/tournaments/edit/" + idTournament}
              >
                Configurar logo
              </Link>
            ) : null}
          </div>
        </div>

        <div className="Card Hero">
          <h3>
            <Loc>Teams</Loc>
            <Link className="Edit" to={baseUrl + "/teams"}>
              <Loc>See all</Loc>
            </Link>
          </h3>
          <div className="Content">
            <TeamsGrid teams={teams} idTournament={idTournament} />
          </div>
        </div>

        <div className="Card Hero">
          <h3>Acciones</h3>
          <div className="Content">
            <SpinnerButton
              className="Button"
              loading={this.loading}
              onClick={this.recalculateStats}
            >
              <Loc>Tournament.RecalcStats</Loc>
            </SpinnerButton>
            {/* <SpinnerButton className='Button' loading={this.loading} onClick={this.clearSanctions} ><Loc>Tournament.ClearSanctions</Loc></SpinnerButton> */}
            <SpinnerButton
              className="Button"
              loading={this.loading}
              onClick={this.recalculateSanctions}
            >
              <Loc>Tournament.RecalculateSanctions</Loc>
            </SpinnerButton>

            <button className="Button" onClick={this.notifyButtonHandler}>
              <Loc>SendNotification</Loc>
            </button>
          </div>
        </div>
        <NotificationDialog
          info="NotifyTournament"
          warning="NotifyTournament.Warning"
          onClose={this.handleNotificationClose}
          show={this.showNotifyDialog}
        />
      </div>
    );
  }
}

export default withRouter(TournamentIndex);
