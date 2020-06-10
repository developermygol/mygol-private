import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loc from '../Locale/Loc';


export default class MessageBox extends Component {

    getButtons = () => {
        switch (this.props.buttons) {
            case 'YesNo':
                return [
                    { key: 0, label: 'Yes', value: 'Yes', className: 'Active' },
                    { key: 1, label: 'No', value: 'No' }
                ];
            case 'OkCancel':
                return [
                    { key: 0, label: 'Accept', value: 'Ok', className: 'Active' },
                    { key: 1, label: 'Cancel', value: 'Cancel' }
                ];
            case 'DeleteCancel':
                return [
                    { key: 0, label: 'Delete', value: 'Delete', className: 'Active' },
                    { key: 1, label: 'Cancel', value: 'Cancel', className: '' }
                ];
            default:
                return [
                    { key: 0, label: 'Accept', value: 'Ok', className: 'Active' }
                ];
        }
    }


    buttonClickHandler = (event) => {
        let v = event.target.value;
        if (!v) v = "Cancel";

        this.props.onClose(v);
    }


    render() {
        if (!this.props.show) return null;

        return (
            <div  className="BackDrop" onClick={this.buttonClickHandler}>
                <div className="ModalWindow" onClick={(e) => e.stopPropagation()}>
                    {this.props.children}

                    <div className="ModalFooter">
                        {this.getButtons().map(b => <button key={b.key} onClick={this.buttonClickHandler} value={b.value} className={'Button ' + b.className}><Loc>{b.label}</Loc></button>)}
                    </div>
                </div>
            </div>
        );
    }
}

MessageBox.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    buttons: PropTypes.oneOf(['Ok', 'YesNo', 'OkCancel', 'DeleteCancel', 'Ok']),
    children: PropTypes.node
};