import React, { Component } from "react";
import Loc from "../Locale/Loc";
import { Link, withRouter } from "react-router-dom";
import MyNotifications from "../../pages/Home/MyNotifications";
import { inject, observer } from "mobx-react";
import { getStaticRoot } from "../../helpers/Utils";
import MasterContent from "./MasterContent";

@inject("store")
@observer
class OrgAdminHome extends Component {
  render() {
    const p = this.props;
    const orgStore = p.store.organization;
    const org = orgStore.current;
    const { seasons } = orgStore;

    const hasOrgData = org && org.logoImgUrl;
    const hasSeasons = seasons && seasons.all && seasons.all.length > 0;

    return (
      <div className="CardContainer">
        <img
          className="CardImg"
          src={getStaticRoot() + "/org/content/welcome-orgadmin.jpg"}
          alt="Welcome"
        />

        <div className="Card Hero Actions">
          <h3>
            <Loc>Getting started</Loc>
          </h3>
          <div className="Content">
            {!hasOrgData ? (
              <Link className="Action Organization" to="/config/org">
                <Loc>Config organization</Loc>
              </Link>
            ) : null}
            {!hasSeasons ? (
              <Link className="Action Seasons" to="/config/seasons">
                <Loc>Config seasons</Loc>
              </Link>
            ) : null}
            <Link className="Action Tournament" to="/tournaments">
              <Loc>Create tournaments</Loc>
            </Link>
            <Link className="Action Field" to="/facilities">
              <Loc>Setup facilities</Loc>
            </Link>
            <Link className="Action Contents" to="/content">
              <Loc>Add news</Loc>
            </Link>
          </div>
        </div>

        <div className="Card Hero">
          <h3>
            <Loc>Pending notifications</Loc>
            <Link className="Edit" to={"/notifications"}>
              <Loc>See all notifications</Loc>
            </Link>
          </h3>
          <div className="Content">
            <MyNotifications unreadOnly={true} />
          </div>
        </div>

        <MasterContent />
      </div>
    );
  }
}

export default withRouter(OrgAdminHome);
