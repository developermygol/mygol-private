import React, { Component } from 'react';
import { getUploadsImg } from '../../../helpers/Utils';
import { DragSource } from 'react-dnd';



export const Types = {
    TEAM: 'team'
}


const teamDragSpec = {
    beginDrag(props, monitor, component) {
        const item = { team: props.team, origin: props.dragSource };
        return item;
    },

    // endDrag(props, monitor, component) {
    //     if (!monitor.didDrop()) return;

    //     const item = monitor.getItem();
    //     const dropResult = monitor.getDropResult();
        
    //     // TODO: remove the team from the list??
    // }
}

const teamDragCollector = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(), 
        isDragging: monitor.isDragging()
    };
}


@DragSource(Types.TEAM, teamDragSpec,  teamDragCollector)
class DraggableTeam extends Component {
    render() {
        const { team } = this.props;
        const { connectDragSource, readOnly } = this.props;

        if (readOnly) {
            return <span className='Draggable'>
                        {team ? getUploadsImg(team.logoImgUrl, team.id, 'team', 'Logo') : null } {team ? team.name : 'No team data'}
                    </span>
        } else {
            return connectDragSource(
                <span className='Draggable'>
                    {team ? getUploadsImg(team.logoImgUrl, team.id, 'team', 'Logo') : null } {team ? team.name : 'No team data'}
                </span>
            );    
        }
    }
}

export default DraggableTeam;