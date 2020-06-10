import React, { Component } from 'react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { inject, observer } from 'mobx-react';
import { observable } from '../../../../node_modules/mobx';
import NotificationDialog from '../../common/NotificationDialog';
import Loc from '../../common/Locale/Loc';

@inject('store') @observer
class NotificationTemplates extends Component {
    @observable showNotifyDialog = false;

    notifyButtonHandler = () => {
        this.showNotifyDialog = true;
    }

    handleNotificationClose = (data) => {
        this.showNotifyDialog = false;
        if (!data) return;

        const store = this.props.store.notifications;
        store.notifyOrganization(data.title, data.message);
    }

    render() {
        const store = this.props.store.notificationTemplates;

        return (
            <div>
                
                <CrudForm
                    title='Config.NotificationTemplates'
                    hint='Config.NotificationTemplates.Hint'
                    editMessage='Config.NotificationTemplates.EditTemplate'

                    listBackButton={false}
                    canAdd={false}
                    canDelete={false}

                    getAllAction={store.actions.getAll}
                    getByIdAction={store.actions.get}
                    editAction={store.actions.edit}

                    listData={store.all ? store.all.slice() : null}

                    fieldDefinition={[
                        { fieldName: 'key', localizedLabel: 'NT.Key', editRenderType: 'readonlytext' },
                        { fieldName: 'title', localizedLabel: 'NT.Title', hint: 'NT.Title.Hint', editRenderType: 'text', rules: 'string', hideInList: true },
                        { fieldName: 'contentTemplate', localizedLabel: 'NT.Template', hint: 'NT.Template.Hint', editRenderType: 'textarea', rules: 'required', hideInList: true },
                        { fieldName: 'lang', localizedLabel: 'NT.Lang', editRenderType: 'readonlytext' },
                    ]}
                />
                <div className='Card Hero'>
                    <h3>Acciones</h3>
                    <div className='Content'>
                        <button className='Button' onClick={this.notifyButtonHandler}><Loc>SendNotification</Loc></button>
                    </div>
                </div>
                <NotificationDialog info='NotifyOrganization' warning='NotifyOrganization.Warning' onClose={this.handleNotificationClose} show={this.showNotifyDialog} />
            </div>
        )
    }
}

export default NotificationTemplates;