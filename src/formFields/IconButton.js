import React, { Component } from 'react';


export default class IconButton extends Component {
    render() {
        return (
            <span className={'IconButton ' + (this.props.classes || '')} onClick={this.props.onClick}>{this.props.children}</span>
        )
    }
}