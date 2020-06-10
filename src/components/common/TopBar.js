import React, { Component } from 'react';
import Login from './Login';
import { observer, inject } from 'mobx-react';
import { Localize } from './Locale/Loc';
import { getUploadsIcon } from '../helpers/Utils';
import GlobalSearchBox from '../pages/Search/GlobalSearchBox';
import AccessLimit from './AccessLimit';

@inject('store')
@observer
class TopBar extends Component {
    
    render() {
        const org = this.props.store.organization.current || {
            name: Localize('Empty organization')
        };

        return (
            <div className='TopBar'>
                {org ? (
                    <div className='OrgData'>
                        <div className='Logo' style={{backgroundImage: `url('${getUploadsIcon(org.logoImgUrl, org.id, 'org')}')`}} />
                        <div className="OrgName">
                            <h1>{org.name}</h1>
                        </div>
                    </div>
                    ) : null
                }
                <AccessLimit allowOrgAdmin> 
                    <GlobalSearchBox />
                </AccessLimit>
                <Login />
            </div>
        )
    };
}

export default TopBar;