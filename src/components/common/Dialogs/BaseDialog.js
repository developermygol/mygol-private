import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class BaseDialog extends Component {

    render() {
        const { show, onClose } = this.props;
        if (!show) return null;

        return (
            <div className="BackDrop" onClick={() => (onClose ? onClose('Cancel') : null)}>
                <div className="ModalWindow" onClick={(e) => e.stopPropagation()}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

BaseDialog.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.node
};