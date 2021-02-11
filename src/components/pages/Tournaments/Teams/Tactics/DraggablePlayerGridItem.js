import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PlayerGridItem from '../../../Players/PlayerGridItem';

export const Types = {
  PLAYER: 'player',
};

const playerDragSpec = {
  beginDrag(props, monitor, component) {
    // console.log("I'm being drag!");
    const item = { player: props.player, origin: props.dragSource };
    return item;
  },
};

const playerDragCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

@DragSource(Types.PLAYER, playerDragSpec, playerDragCollector)
class DraggablePlayerGridItem extends Component {
  render() {
    const { player } = this.props;
    const { connectDragSource, readOnly, isDreamTeam } = this.props;

    if (readOnly) {
      return <PlayerGridItem player={player} isDreamTeam={isDreamTeam} readonly />;
    } else {
      return connectDragSource(
        <span>
          <PlayerGridItem player={player} isDreamTeam={isDreamTeam} />
        </span>
      );
    }
  }
}

export default DraggablePlayerGridItem;
