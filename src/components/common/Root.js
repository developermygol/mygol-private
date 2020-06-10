import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import TopBar from './TopBar';
import Content from './Content';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class Root extends Component {

    componentDidMount = () => {
        this.props.store.organization.fetch();
    }

    render() {
        return (
            <div className='Root'>
                <NavBar />
                <TopBar />
                <Content />
                {/* <p className='DevWarning'>Env: {process.env.NODE_ENV}, {process.env.REACT_APP_BRANCH} -> {process.env.REACT_APP_COMMIT}</p> */}
                <ToastContainer hideProgressBar={true}/>
            </div>
        );
  }
}



export default Root;