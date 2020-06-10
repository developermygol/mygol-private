import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { getUploadsIcon } from '../../../helpers/Utils';
import { observer, inject } from 'mobx-react';
import { observable, observe } from 'mobx';
import { normalize } from '../../../helpers/Data';
import InfoBox from '../../../common/InfoBox';
import Spinner from '../../../common/Spinner/Spinner';


const SortableItem = SortableElement(({value}) =>
    <li className='Sortable'>
        <img className='Logo' src={getUploadsIcon(value.logoImgUrl, value.id)} alt={value.keyName} />
        <span className='Name'>{value.name}</span>
    </li>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul className='SortableColumn Wide'>
            {items.map((team, i) => (
                <SortableItem key={i} index={i} value={team} />
            ))}
        </ul>
        
    );
});

const FixedDetails = ({items}) => {
    
    let half = Math.ceil(items.length / 2);
    //if (items % 2 == 1) half += 1;
    

    return (
        <ol className='SortableColumn Narrow'>
            {items.map((team, i) => (
                <li className={'SortableFixed c' + (i % half + 1)} key={i} >{i + 1}. </li>
            ))}
        </ol>
    )
}

@inject('store') @observer
class SortableTeams extends Component {

    @observable items = null;
    
    teamsDisposer = null;

    filterTeams = (teams) => {
        if (!teams) return null;

        const { group } = this.props;
        let teamGroups = this.props.store.teamGroups.all;
        const normalTeams = normalize(teams);

        teamGroups = teamGroups.filter(tg => tg.idGroup === group.id);

        return teamGroups.map(tg => normalTeams[tg.idTeam]);
    }

    componentDidMount = () => {
        const teams = this.props.store.teams;
        this.teamsDisposer = observe(teams, 'all', ({newValue}) => {
            this.items = this.filterTeams(newValue);
            if (this.items) this.onChange(this.items);
        }, true);
    }

    componentWillUnmount = () => {
        if (this.teamsDisposer) { this.teamsDisposer(); this.teamsDisposer = null; }
    }

    onChange = (data) => {
        this.props.onChange(data);
    }
    
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.items = arrayMove(this.items, oldIndex, newIndex);
        this.onChange(this.items);
    };

    render() {
        const p = this.props;

        if (!this.items || this.items.length === 0) return <InfoBox><Loc>No teams. Need teams</Loc></InfoBox>
        
        // eslint-disable-next-line eqeqeq
        //if (this.items.length != this.props.group.numTeams) return <ErrorBox localizedMessage='Error.GroupTeamsNoMatch' />

        return (
            <Spinner loading={!this.items}>
                <div className='SortableColumns'>
                    {p.isLeague ? <FixedDetails items={this.items} /> : null}
                    <SortableList items={this.items} onSortEnd={this.onSortEnd} />
                </div>
            </Spinner>
        )
    }
}

export default SortableTeams;