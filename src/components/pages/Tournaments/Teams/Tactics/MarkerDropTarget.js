import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { Types } from "./DraggablePlayerGridItem";
import SoccerFieldMarker from "./SoccerFieldMarker";

const playerDropSpec = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const cb = props.callbacks.playerDropped;
    if (cb) cb(item.player, item.origin, props.marker, props.sequenceOrder);
  },

  canDrop(props, monitor) {
    const { player } = monitor.getItem();
    return (
      monitor.getItemType() === Types.PLAYER &&
      props.callbacks.playerCanDrop(player, props.marker)
    );
  },
};

const playerDropCollector = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    //isOverCurrent: monitor.isOver({shallow: true}),
    //itemType: monitor.getItemType()
  };
};

@DropTarget(Types.PLAYER, playerDropSpec, playerDropCollector)
class MarkerDropTarget extends Component {
  render() {
    const { /* isOver, */ connectDropTarget, marker } = this.props;

    return connectDropTarget(
      <g>
        <SoccerFieldMarker marker={marker} />
      </g>
    );
    // <span className={'DropTarget' + (isOver ? ' Hover' : '')}>{LocalizeI('Drop player here')}</span>
  }
}

export default MarkerDropTarget;
