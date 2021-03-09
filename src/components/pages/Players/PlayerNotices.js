import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { startLoadingPlayerTeamAcceptedNotices } from '../../../store/actions/notices';
import { startLoadTournamentTeam } from '../../../store/actions/teams';
import { getUploadsIcon } from '../../helpers/Utils';
import { getDateTime } from '../../helpers/Dates';
import Loc from '../../common/Locale/Loc';

const PlayerNotices = ({ player, idTeam, idTournament }) => {
  const dispatch = useDispatch();
  const { activePlayerTeamAcceptedNotices } = useSelector(state => state.notices);
  const { activeOrganization } = useSelector(state => state.organizations);
  const { activeTournament } = useSelector(state => state.tournaments);
  const { activeTeam } = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(startLoadTournamentTeam(idTeam));
    dispatch(startLoadingPlayerTeamAcceptedNotices(player.id, idTeam, idTournament));
  }, []);

  if (!activePlayerTeamAcceptedNotices || !activeTeam) return null;

  return (
    <div className="TabContent">
      <div className="Printer">
        <div className="PrinterTop">
          <div className="Info">
            <div className="Award">
              <img alt="" className="Logo" src="/static/tournament/default3.png" />
            </div>
            <div className="Info">
              <div className="Tournament">
                <p>
                  <Loc>Tournaments</Loc>
                </p>
                <h3>{activeTournament.name}</h3>
              </div>
              <div className="BreadCrumbSeparator">&gt;</div>
              <div className="Team">
                <p>
                  <Loc>Teams</Loc>
                </p>
                <h3>{activeTeam.name}</h3>
              </div>
            </div>
          </div>
          <div className="OrganizationDetails">
            <p className="OrgName">{activeOrganization.name}</p>
            <img
              className="Logo"
              src={getUploadsIcon(activeOrganization.logoImgUrl, activeOrganization.id, 'org')}
              alt="Organization logo"
            />
          </div>
        </div>
        <h2 className="Player">
          {player.name} {player.surname}
        </h2>
      </div>
      <div className="PlayerNotices">
        <div className="ActionBar"></div>
        <table className="DataTable">
          <thead>
            <tr className="DataTableHeaderRow">
              <th className="DataTableHeaderCell DataTableCell">
                <Loc>Notices.AcceptedDate.Label</Loc>
              </th>
              <th className="DataTableHeaderCell DataTableCell">
                <Loc>Notices.Title.Label</Loc>
              </th>
              <th className="DataTableHeaderCell DataTableCell"></th>
            </tr>
          </thead>
          <tbody>
            {activePlayerTeamAcceptedNotices.map(playerNotice => (
              <tr key={uuidV4()} className="DataTableRow">
                <td className="DataTableCell">{getDateTime(playerNotice.acceptedDate)}</td>
                <td className="DataTableCell">{playerNotice.notice.name}</td>
                <td className="DataTableCell"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerNotices;
