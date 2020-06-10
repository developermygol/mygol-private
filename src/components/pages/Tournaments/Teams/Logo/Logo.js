import React, { Component, Fragment } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import LogoDisplay from './LogoDisplay';
import LogoEditor from './LogoEditor';


export default withRouter(class Logo extends Component {
    render() {
        const { path } = this.props.match;

        return (
            <Fragment>
                <Switch>
                    <Route path={path} exact component={LogoDisplay} />
                    <Route path={path + '/editor'} exact component={LogoEditor} />
                </Switch>
        </Fragment>
        )
    }
})