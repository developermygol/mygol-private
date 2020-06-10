import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginActivationForm from './LoginActivationForm';
import ForgotPasswordForm from './ForgotPasswordForm';


class Login extends Component {

    render() {

        return (
            <div className='Login'>
                <div className='LoginWindow'>
                    <Switch>
                        <Route path='/login/forgotpassword' render={() => <ForgotPasswordForm/>} />
                        <Route path='/login/activate' component={LoginActivationForm} />
                        <Route path='/login' component={LoginForm} />
                    </Switch>
                    
                </div>
            </div>
        )

    }
}


export default Login;