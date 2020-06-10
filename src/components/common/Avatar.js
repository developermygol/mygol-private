import React, { Fragment } from 'react';
import { getUploadsImg } from '../helpers/Utils';


export default props => {
    const u = props.user;
    if (!u) return null;

    return (
        <Fragment>
            <span>{getUploadsImg(u.avatarImgUrl, u.id, 'user', 'PlayerAvatar ' + props.avatarClassName)}</span>
            <span className={props.className} onClick={props.onClick}>{u.name}</span>
        </Fragment>
    )    
}