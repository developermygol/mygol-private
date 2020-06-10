import React, { Component } from 'react';
import { CompactPicker } from 'react-color';


export default class ColorPicker extends Component {

    render() {
        return (
            <div className='FormField'>
                <label className='Label forText'>
                    {this.props.label}
                </label>
                <CompactPicker className='ColorEditor' color={this.props.value} onChangeComplete={(color) => this.props.onChange(color)} />
            </div>
        )
    }
}
