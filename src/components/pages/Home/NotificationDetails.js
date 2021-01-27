import React, { Component } from 'react';
import Avatar from '../../common/Avatar';
import { Link } from 'react-router-dom';
import Loc from '../../common/Locale/Loc';

class NotificationDetails extends Component {
  render() {
    const n = this.props.notification;
    if (!n) return null;

    return (
      <div className="NotificationDetails">
        <div className="From">
          <span className="">
            <Loc>From</Loc>:{' '}
          </span>
          <Avatar user={n.creatorData} className="Mini" avatarClassName="Mini" />
        </div>
        <div className="Title">{n.text2}</div>
        <div className="Body" dangerouslySetInnerHTML={{ __html: n.text }}></div>
        <div className="Actions">
          {n.apiActionLabel1 ? <Link to={n.apiActionUrl1}>{n.apiActionLabel1}</Link> : null}
          {n.apiActionLabel2 ? <Link to={n.apiActionUrl2}>{n.apiActionLabel2}</Link> : null}
          {n.apiActionLabel3 ? <Link to={n.apiActionUrl3}>{n.apiActionLabel3}</Link> : null}
        </div>
      </div>
    );
  }
}

NotificationDetails.defaultProps = {
  notification: null,
};

export default NotificationDetails;
