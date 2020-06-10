import React, { Component } from 'react';
import MessageBox from './Dialogs/MessageBox';
import { observer, inject } from '../../../node_modules/mobx-react';
import { observable } from '../../../node_modules/mobx';
import { Localize } from './Locale/Loc';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import Text from './FormFields/Text';
import TextArea from './FormFields/TextArea';


const defaultProps = {
    info: '', 
    onClose: null, 
    show: false
}


@inject('ui') @observer
class NotificationDialog extends Component {

    @observable data = {
        title: '',
        message: ''
    }

    form = new MobxReactForm(
        {
            fields: [
                { name: 'title', label: Localize('Notification.Title'), rules: 'required|string' },
                { name: 'message', label: Localize('Notification.Message'), rules: 'required|string' },
            ]
        },
        {
            plugins: { dvr: validatorjs },
            hooks: {

            }
        }
    );

    constructor(props) {
        super(props);
        validatorjs.useLang(this.props.ui.lang);
    }

    handleClose = (button) => {
        const values = this.form.values();
        const { onClose } = this.props;

        if (onClose) {
            onClose( (button === 'Ok') ? values : null );
        }
    }

    render() {
        const p = this.props;

        return (
            <MessageBox buttons='OkCancel' onClose={this.handleClose} show={p.show}>
                {p.info ? <p className='NotificationInfo'>{Localize(p.info)}</p> : null }
                {p.warning ? <p className='NotificationWarning'>{Localize(p.warning)}</p> : null }
                <form>
                    <Text field={this.form.$('title')} />
                    <TextArea field={this.form.$('message')} />
                </form>
            </MessageBox>
        )
    }
}

NotificationDialog.defaultProps = defaultProps;

export default NotificationDialog;