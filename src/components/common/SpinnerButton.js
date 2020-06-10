import React, { Component } from 'react';
import Spinner from './Spinner/Spinner';

class SpinnerButton extends Component {
    render() {
        const p = this.props;

        return (
            <Spinner loading={p.loading} mini>
                <button className={p.className} onClick={p.onClick} type={p.type}>{p.children}</button>
            </Spinner>
        )
    }
}

export default SpinnerButton;