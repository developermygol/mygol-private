import React from "react";
import { useDrop } from "react-dnd";

const SoccerFieldMarker = ({ marker, update }) => {
  const handleUpdatePlayerTacticPosition = (monitor) => {
    const { player } = monitor;
    if (!player) return;
    const { id: idPlayer, teamData } = player;
    const {
      idTeam,
      idTacticPosition: playerCurrentIdTacticPosition,
    } = teamData;
    if (marker.idx + 1 === playerCurrentIdTacticPosition) return;
    console.log({ idPlayer, idTeam, playerCurrentIdTacticPosition });

    update(idPlayer, idTeam, marker.idx);
  };

  const scale = (x) => {
    const scale = 1;
    return x * scale;
  };

  const [{ isOver }, drop] = useDrop({
    accept: "player",
    // canDrop: () => canMoveKnight(x, y),
    drop: handleUpdatePlayerTacticPosition,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      // canDrop: !!monitor.canDrop(),
    }),
  });
  const fill = isOver ? "#ff0000" : "#f28e00";

  return (
    <circle
      ref={drop}
      style={{ fill: fill, stroke: "#ffffff", strokeWidth: "0" }}
      cx={scale(marker.x)}
      cy={scale(marker.y)}
      r="0.7"
    />
  );
};

export default SoccerFieldMarker;
