import React, { Component } from 'react';
import SortableTeams from '../Teams/SortableTeams';
import Loc from '../../../common/Locale/Loc';


export default class SortableTeamsField extends Component {
    
    onChange = (data) => {
        const idsOnly = data.map(t => t.id);
        this.props.field.onChange(idsOnly);
    }
    
    render() {
        const p = this.props;

        return (
            <div className='FormField'>
                <label className='Label forText'>{this.props.field.label}</label>
                <small className='Hint'><Loc>Drag and drop teams to reorder</Loc></small>
                <small className='Hint'><Loc>{p.isLeague ? 'SortableTeams.League.Hint' : 'SortableTeams.Knockout.Hint'}</Loc></small>
                <SortableTeams isLeague={p.isLeague} value={null} onChange={this.onChange} group={this.props.group} />
            </div>            
        )        
    }
}