import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, Link } from 'react-router-dom';
import Loc from '../../common/Locale/Loc';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import Text from '../../common/FormFields/Text';
import SpinnerButton from '../../common/SpinnerButton';
import { action } from 'mobx';


@inject('ui') @observer
class LoginForm extends Component {

    constructor() {
        super();

        //validatorjs.useLang(this.props.ui.lang);  // TODO: set the language. Apparently @inject happens after the constructor. 

        this.form = new MobxReactForm(
            { 
                fields: [
                    { name: 'email', label: 'Email', rules: 'required|email|string|between:5,100', value: '' },
                    { name: 'password', label: 'Password', rules: 'required|string|between:8,100', value: '' }
                ] 
            }, 
            { 
                plugins: { dvr: validatorjs }, 
                hooks: { onSuccess: this.handleLoginSubmit }
            }
        );
    }

    componentDidMount = () => {
        if (this.login) this.login.focus();
    }


    @action handleLoginSubmit = (form) => {
        const {auth} = this.props.ui;
        auth.error = null;

        const data = form.values();
        auth.login(data);
    }

    render() {
        const F = this.form;
        const user = this.props.ui.auth;
        const error = user.error;        
        
        if (user.token) {
            const returnUrl = user.returnUrl || '/';
            return <Redirect to={returnUrl} />;
        }

        return (
            <React.Fragment>
                <div className='Logo' />
                
                <form onSubmit={F.onSubmit}>
                    <Text field={F.$('email')} type='email' inputRef={c => this.login = c} />
                    <Text field={F.$('password')} type='password' />
                    {/* <button className='Button Active' type='submit'><Loc>Sign in</Loc></button> */}
                    <SpinnerButton className='Button Active' loading={user.loading} type='submit'><Loc>Sign in</Loc></SpinnerButton>
                </form>

                {(error) ?  
                    <Link className='LoginForgot' to='/login/forgotpassword'>
                        <p className='LoginError'><Loc>Login error</Loc></p>
                        <Loc>Forgot password</Loc>
                    </Link>
                : null}
            </React.Fragment>
        )
    }
}

export default LoginForm;