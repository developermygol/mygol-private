import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import DataTable from '../../common/DataTable';
import Spinner from '../../common/Spinner/Spinner';
import Loc, { Localize } from '../../common/Locale/Loc';
import { formattedDateTime, textLookup } from '../../common/FormsMobx/ListRenderHandlers';
import { requestAsync } from '../../helpers/Utils';
import axios from '../../../axios';
import NotificationDetailsDialog from './NotificationDetailsDialog';

@observer
class MyNotifications extends Component {

    @observable loading = false;
    @observable error = null;
    @observable data = null;
    @observable showDetailsDialog = false;
    @observable selectedItem = null;

    componentDidMount = () => {
        requestAsync(this, axios.get, null, '/notifications?unreadOnly=' + this.props.unreadOnly)
            .then(res => {
                this.data = res;
            })
    }

    clickHandler = (row) => {
        this.selectedItem = row;
        this.showDetailsDialog = true;
    }

    closeHandler = (button) => {
        this.showDetailsDialog = false;
        
        // if cancel or already read, return
        if (button !== 'Ok' || this.selectedItem.status === 5) return;
        
        requestAsync(this, axios.post, null, '/notifications/markread/' + this.selectedItem.id)
            .then(res => {
                this.selectedItem.status = 5;
                this.selectedItem = null;
            });
    }

    getNotificationClass = (row) => {
        switch (row.status) {
            case 5: return 'Text Read Clickable';
            default: return 'Text Unread Clickable';
        }
    }

    render() {
        if (!this.data || this.data.length === 0) {
            if (this.props.unreadOnly) 
                return <p><Loc>No pending notifications</Loc></p>;
            else
                return <p><Loc>No notifications</Loc></p>;
        }

        return (
            <div className='Notifications'>
                <Spinner loading={this.loading}>
                    <DataTable
                        data={this.data}
                        columns={[
                            { id: 'text2', label: Localize('Notification.Text'), handler: (row) => <span className={this.getNotificationClass(row)} onClick={() => this.clickHandler(row)}>{row.text2}</span> },
                            { id: 'timestamp', label: Localize('Notification.Timestamp'), className: 'TimeStamp', handler: formattedDateTime('timeStamp') },
                            { id: 'status', label: Localize('Notification.Status'), handler: textLookup('NotificationStatus', 'status') }
                        ]}
                    />
                </Spinner>
                <NotificationDetailsDialog 
                    show={this.showDetailsDialog}
                    data={this.selectedItem}
                    onClose={this.closeHandler}
                />
            </div>
        )
    }
}

MyNotifications.defaultProps = {
    unreadOnly: false
}

export default MyNotifications;