import React from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { getStaticRoot, getUploadUrl } from '../../../../helpers/Utils';

const SoccerFieldMarker = ({ marker, update, playerInfo }) => {
  const handleUpdatePlayerTacticPosition = monitor => {
    const { player } = monitor;
    if (!player) return;
    const { id: idPlayer, teamData } = player;
    const { idTeam, idTacticPosition: playerCurrentIdTacticPosition } = teamData;
    if (marker.idx + 1 === playerCurrentIdTacticPosition) return;
    // console.log({ idPlayer, idTeam, playerCurrentIdTacticPosition });

    update(idPlayer, idTeam, marker.idx);
  };

  const scale = x => {
    const scale = 1;
    return x * scale;
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'player',
    // canDrop: () => canMoveKnight(x, y),
    drop: handleUpdatePlayerTacticPosition,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      // canDrop: !!monitor.canDrop(),
    }),
  });
  const fill = isOver ? '#ff0000' : '#f28e00';
  const isPlayerActive = playerInfo;
  const circleRadius = 0.7;
  const elementId = uuidv4();

  return (
    <g ref={drop}>
      <circle
        style={{ fill: fill, stroke: '#ffffff', strokeWidth: '0' }}
        cx={scale(marker.x)}
        cy={scale(marker.y)}
        r={circleRadius}
      />
      {isPlayerActive && (
        <React.Fragment>
          <clipPath id={elementId}>
            <circle
              style={{ fill: fill, stroke: '#ffffff', strokeWidth: '0' }}
              cx={scale(marker.x)}
              cy={scale(marker.y)}
              r={circleRadius - 0.05}
            />
          </clipPath>
          <image
            xlinkHref={
              playerInfo.idPhotoImgUrl
                ? getUploadUrl(playerInfo.idPhotoImgUrl)
                : getStaticRoot() + '/player/noIdPhoto.png'
            }
            x={marker.x + -circleRadius}
            y={marker.y + -circleRadius}
            height={circleRadius * 2}
            width={circleRadius * 2}
            clipPath={`url(#${elementId})`}
          />
        </React.Fragment>
      )}
    </g>
  );
};

export default SoccerFieldMarker;
