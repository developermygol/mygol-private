import React, { Component } from 'react';
import NotificationDetails from './NotificationDetails';
import MessageBox from '../../common/Dialogs/MessageBox';

class NotificationDetailsDialog extends Component {
  render() {
    return (
      <MessageBox buttons="OkCancel" show={this.props.show} onClose={this.props.onClose}>
        <NotificationDetails notification={this.props.data} />
      </MessageBox>
    );
  }
}

export default NotificationDetailsDialog;
