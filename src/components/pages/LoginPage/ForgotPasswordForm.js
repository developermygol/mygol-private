import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Loc, { Localize } from '../../common/Locale/Loc';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import Text from '../../common/FormFields/Text';
import { observable, action } from 'mobx';
import { getOpErrorText, redirect } from '../../common/FormsMobx/Utils';
import SpinnerButton from '../../common/SpinnerButton';
import SuccessDialog from './SuccessDialog';

@inject('ui') @observer
class ForgotPasswordForm extends Component {

    @observable loading = false;
    @observable error = null;
    @observable showSuccessDialog = false;

    constructor() {
        super();

        //validatorjs.useLang(this.props.ui.lang);  // TODO: set the language. Apparently @inject happens after the constructor. 

        this.form = new MobxReactForm(
            {
                fields: [
                    { name: 'email', label: Localize('Email'), rules: 'required|string', value: '' },
                ]
            },
            {
                plugins: { dvr: validatorjs },
                hooks: { onSuccess: this.handleSubmit }
            }
        );
    }

    componentDidMount = () => {
        if (this.firstField) this.firstField.focus();
    }

    @action handleSubmit = (form) => {
        this.error = null;
        const data = form.values();

        const store = this.props.ui.auth;

        store.resetPassword(data.email)
            .then(
                res => {
                    if (res) 
                        this.showSuccessDialog = true;
                    else
                        this.error = getOpErrorText(store.error);
                    
                }, 
                err => {
                    this.error = getOpErrorText(err);
                }
            )
    }

    successDialogCloseHandler = (button) => {
        redirect(this, '/login');
    }

    render() {
        const F = this.form;
        const { auth } = this.props.ui;

        return (
            <React.Fragment>
                <div className='Logo'></div>
                <h1><Loc>Reset password</Loc></h1>
                <p><Loc>Reset.Password.Hint</Loc></p>
                <form onSubmit={F.onSubmit}>
                    <Text field={F.$('email')} type='text' inputRef={c => this.firstField = c}/>
                    <SpinnerButton className='Button Active' loading={auth.loading} type='submit'>
                        <Loc>Reset password</Loc>
                    </SpinnerButton>
                </form>

                {(this.error) ? <p className='LoginError'>{this.error}</p> : null}
                
                {this.showSuccessDialog ? <SuccessDialog onClose={this.successDialogCloseHandler} lMsg='Reset.Password.Success' /> : null }
            </React.Fragment>
        )
    }
}

export default withRouter(ForgotPasswordForm);