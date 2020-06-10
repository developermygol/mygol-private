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
class LoginActivationForm extends Component {

    @observable loading = false;
    @observable error = null;
    @observable showSuccessDialog = false;

    constructor() {
        super();

        //validatorjs.useLang(this.props.ui.lang);  // TODO: set the language. Apparently @inject happens after the constructor. 

        this.form = new MobxReactForm(
            {
                fields: [
                    { name: 'password', label: Localize('Password'), rules: 'required|string|between:8,100', value: '' },
                    { name: 'repeatPassword', label: Localize('Repeat password'), rules: 'required|string|between:8,100', value: '' }
                ]
            },
            {
                plugins: { dvr: validatorjs },
                hooks: { onSuccess: this.handleLoginSubmit }
            }
        );
    }

    componentDidMount = () => {
        if (this.firstField) this.firstField.focus();
    }

    @action validatePassword(form) {
        if (form.password === form.repeatPassword) return true;

        this.error = Localize('Password.NoMatch');
        return false;
    }

    @action handleLoginSubmit = (form) => {
        this.error = null;
        const data = form.values();
        if (!this.validatePassword(data)) return;

        const store = this.props.ui.auth;

        store.activate(data, this.props.location.search)
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
                <h1><Loc>Activate account</Loc></h1>
                <p><Loc>Account.Confirm</Loc></p>
                <form onSubmit={F.onSubmit}>
                    <Text field={F.$('password')} type='password' inputRef={c => this.firstField = c}/>
                    <Text field={F.$('repeatPassword')} type='password' />
                    <SpinnerButton className='Button Active' loading={auth.loading} type='submit'>
                        <Loc>Activate account</Loc>
                    </SpinnerButton>
                </form>

                {(this.error) ? <p className='LoginError'>{this.error}</p> : null}
                
                {this.showSuccessDialog ? <SuccessDialog onClose={this.successDialogCloseHandler} lMsg='Activation.Success' /> : null }
            </React.Fragment>
        )
    }
}

export default withRouter(LoginActivationForm);