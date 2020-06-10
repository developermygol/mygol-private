import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Types } from './DraggableTeam';
import { LocalizeI } from '../../../common/Locale/Loc';



const teamDropSpec = {
    drop(props, monitor, component) {
        
        const item = monitor.getItem();
        
        const cb = props.callbacks.teamDropped;
        if (cb) cb(item.team, item.origin, props.group, props.sequenceOrder);
    },

    // hover(props, monitor, component) {

    // },

    canDrop(props, monitor) {

        const { team } = monitor.getItem();
        return (monitor.getItemType() === Types.TEAM) && props.callbacks.teamCanDrop(team, props.group);
    }
}

const teamDropCollector = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(), 
        canDrop: monitor.canDrop(), 
        //isOverCurrent: monitor.isOver({shallow: true}),
        //itemType: monitor.getItemType()
    }
}

@DropTarget(Types.TEAM, teamDropSpec, teamDropCollector)
class TeamDropContainer extends Component {
    render() {
        const { isOver, connectDropTarget, sequenceOrder } = this.props;

        return connectDropTarget(
            <span className={'DropTarget' + (isOver ? ' Hover' : '')}>{LocalizeI('Drag team here', sequenceOrder + 1)}</span>
        )
    }
}

export default TeamDropContainer;