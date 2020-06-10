import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Loc from './Locale/Loc';

@observer
class ErrorBoundary extends Component {

    @observable error = null;
    @observable info = null;
    @observable showDetails = false;

    componentDidCatch(error, info) {
        this.error = error;
        this.info = info;
    }

    render() {
        if (this.error) return (
            <div className=''>
                <h3><Loc>Error.Client</Loc></h3>
                <p className='BottomSep20'><Loc>Error.Client.Detail</Loc></p>
                <button className='Button BottomSep20' onClick={() => this.showDetails = !this.showDetails}><Loc>Error.Client.ShowDetails</Loc></button>
                <div style={{ display: (this.showDetails ? '' : 'none') }}>
                    <h4>{this.error.name}</h4>
                    <pre>{this.error.message}</pre>
                </div>
            </div>
        );
        
        return this.props.children;
    }
}

export default ErrorBoundary;