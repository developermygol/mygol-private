import React, { Component } from 'react';
import Loc from '../Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
class MasterContent extends Component {
    
    @observable data = null;
    
    componentDidMount = () => {

    }

    render() {
        if (!this.data) return null;

        return (
            <div className='Card Hero'>
                    <h3><Loc>Announcements</Loc></h3>
                    <div className=''>
                        
                    </div>
                </div>
        )
    }
}

export default MasterContent;