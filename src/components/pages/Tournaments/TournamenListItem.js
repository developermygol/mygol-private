import React from 'react';
import { Link } from 'react-router-dom';
import Edit3 from 'react-feather/dist/icons/edit-3';
import XCircle from 'react-feather/dist/icons/x-circle';

import { getUploadsIcon } from '../../helpers/Utils';
import { Localize } from '../../common/Locale/Loc';
import IconButton from '../../../formFields/IconButton';

const TournamenListItem = ({ tournament, tournamentModes, seasons, provided, snapshot, edit, remove }) => {
  const {
    id,
    // idSeason,
    idTournamentMode,
    logoImgUrl,
    name,
    status,
    // type,
    visible,
    // sequenceorder,
  } = tournament;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',
    outline: 'none',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getLogo = (id, logoImgUrl) => (
    <img alt="" src={getUploadsIcon(logoImgUrl, id, 'tournament')} className="Logo" />
  );

  const getLink = (id, name) => <Link to={'/tournaments/' + id}>{name}</Link>;

  const getStatus = status => Localize(`TournamentStatus${status}`);

  const getModality = modeId => {
    const modality = tournamentModes.find(mode => mode.id === modeId);
    if (!modality) return '';
    return modality.name;
  };

  const getVisbility = visibility => {
    if (visibility) return Localize('Yes');
    return Localize('No');
  };

  //   const getSeason = seasonId => {
  //     const season = seasons.find(season => season.id == seasonId);
  //     if (!season) return '';
  //     return season.name;
  //   };

  return (
    <tr
      ref={provided.innerRef}
      {...provided.draggableProps}
      className="DataTableRow"
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <td className="DataTableCell Handle" {...provided.dragHandleProps}>
        :::
      </td>
      <td className="DataTableCell">{getLogo(id, logoImgUrl)}</td>
      <td className="DataTableCell">{getLink(id, name)}</td>
      <td className="DataTableCell">{getStatus(status)}</td>
      <td className="DataTableCell">{getModality(idTournamentMode)}</td>
      {/* <td className="DataTableCell">{getSeason(idSeason)}</td> */}
      <td className="DataTableCell">{getVisbility(visible)}</td>
      <td className="DataTableCell">
        <IconButton className="Button Third" onClick={() => edit(tournament)}>
          <Edit3 size={20} />
        </IconButton>
        <IconButton className="Button Third" onClick={() => remove(tournament)}>
          <XCircle size={20} />
        </IconButton>
      </td>
    </tr>
  );
};

export default TournamenListItem;
