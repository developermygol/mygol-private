import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { findByIdInArray } from '../../../../helpers/Data';
import Loc from '../../../../common/Locale/Loc';
import CalendarSetup from '../../Calendar/CalendarSetup';
import CalendarView from '../../Calendar/CalendarView';
import { requestAsync } from '../../../../helpers/Utils';
import ErrorBox from '../../../../common/ErrorBox';
import { observable, observe } from 'mobx';
import axios from '../../../../../axios';
import Spinner from '../../../../common/Spinner/Spinner';


export const hasCalendarFlagMask = 1;





@inject('store') @observer
class Calendar extends Component {

    @observable error = null;
    @observable loading = true;
    @observable loaded = false;

    componentDidMount() {
        const p = this.props;
        const { idGroup } = p.match.params;

        this.td = observe(p.store.tournaments, "current", ({newValue}) => {
            if (newValue) { 
                requestAsync(this, axios.get, null, "/matches/forgroup/" + idGroup)
                .then(
                    res => {
                        this.props.store.matches.all = res;
                        this.loaded = true;
                    }, 
                    err => {
                        this.loaded = true;
                    }
                );                    
            }
        }, true);
    }

    componentWillUnmount = () => {
        if (this.td) this.td();
    }

    render() {
        const p = this.props;
        const { idGroup } = p.match.params;
        const groups = p.store.groups.all;
        if (!groups) return <ErrorBox message='No groups' />;

        const group = findByIdInArray(groups, idGroup);
        if (!group) return <ErrorBox message='No group' />;

        const hasCalendar = group.flags & hasCalendarFlagMask;

        const stages = p.store.stages.all;
        if (!stages) return <ErrorBox message='No stages' />;

        const stage = findByIdInArray(stages, group.idStage);
        if (!stage) return <ErrorBox message='No stage' />;

        const calendar = p.store.matches.all;

        return (
            <Spinner loading={this.loading} >
                <h3><Loc>Group.Calendar</Loc> {group.name}</h3>
                {hasCalendar ?
                    (calendar ? <CalendarView value={calendar} group={group} /> : <ErrorBox localizedMessage='Error.EmptyCalendarNotExpected' />)
                    : 
                    // <CalendarSetupTabWithRouter group={group} stage={stage} />
                    <CalendarSetup group={group} stage={stage} />
                }
            </Spinner>
        )
    }
}


// const CalendarSetupTabWithRouter = withRouter(class CalendarSetupTabControl extends Component {
//     render() {
//         const p = this.props;
//         const baseUrl = p.match.url;
//         const basePath = p.match.path;
//         const { group, stage } = p;

//         return (
//             <div>
//                 <ul className='TabBar'>
//                     <li className='TabItem'><NavLink to={baseUrl} exact><Loc>Calendar.Setup.Wizard</Loc></NavLink></li>
//                     <li className='TabItem'><NavLink to={baseUrl + '/new'}><Loc>Calendar.Setup.New</Loc></NavLink></li>
//                 </ul>

//                 <div className='TabContent'>
//                     <Switch>
//                         <Route path={basePath + '/new'} render={() => <CalendarSetupBasic group={group} stage={stage} />} />
//                         <Route path={basePath } exact render={() => <CalendarSetup group={group} stage={stage} />} />
//                     </Switch>
//                 </div>
//             </div>
//         )
//     }
// })


export default withRouter(Calendar);