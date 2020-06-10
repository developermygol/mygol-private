import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import Loc from './Locale/Loc';
import { Link } from 'react-router-dom';

@inject("store")
@observer
class BreadCrumb extends Component {
    
    render() {
        const t = this.props.store.tournaments.current;
        if (!t) return null;
        
        const team = this.props.store.teams.current;

        return (
            <div className='BreadCrumb'>
                <div className='Tournament'>
                    <p><Link to='/tournaments'><Loc>Tournaments</Loc></Link></p>
                    <h3>{t.name}</h3>
                </div>
                
                {team ? 
                    <Fragment>
                        <div className='BreadCrumbSeparator' >&gt;</div>
                        <div className='Team'>

                            <p><Link to={'/tournaments/' + t.id + '/teams'}><Loc>Teams</Loc></Link></p>
                            <h3>{team.name}</h3>
                        </div>
                    </Fragment>
                : null}
            </div>
        )
    }
}


export default BreadCrumb;