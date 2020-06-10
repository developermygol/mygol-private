import React, { Component, Fragment } from 'react';
import Axios from '../../../../axios';
import SelectionDialog from '../../../common/Dialogs/SelectionDialog';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { getUploadsImg, requestAsync } from '../../../helpers/Utils';


@observer
class SelectReferee extends Component {

    @observable all = null;
    @observable error = null;
    @observable loading = false;

    componentDidMount() {
        // Load referees
        const startTime = this.props.from;
        const duration = this.props.duration;
        const url = '/referees/fortimeslot?from=' + startTime + '&duration=' + duration;
        
        requestAsync(this, Axios.get, null, encodeURI(url))
            .then(res => { this.all = res },
                
                  err => { this.error = err; this.data = null });
    }


    render() {
        const { props } = this;        

        return (
            <SelectionDialog 
                title='Select referee'
                text='Select.AvailableReferees'
                show={props.show}
                loading={this.loading}
                error={this.error}
                closeHandler={this.props.closeHandler}
                data={this.all}
                itemRender={(r) => (
                    <Fragment>
                        {getUploadsImg(r.avatarImgUrl, r.id, 'user', 'PlayerAvatar Mini')} 
                        <span className='Name'>{r.name}</span>
                    </Fragment>
                )}
            />
        )
    }
}





export default SelectReferee;