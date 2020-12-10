import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import axios from '../../axios';
import Dropzone from 'react-dropzone';

const propTypes = {
  type: PropTypes.number.isRequired,
  idObject: PropTypes.any.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
  acceptTypes: PropTypes.string,
};

@observer
export default class Upload extends Component {
  @observable loading = false;

  onDrop = (accepted, rejected) => {
    if (accepted.length === 0) return;

    const p = this.props;

    const f = new FormData();
    f.append('file', accepted[0]);
    f.append('type', p.type);
    f.append('idobject', p.idObject);
    f.append('createThumbnails', '1');

    this.loading = true;
    axios
      .post('/upload', f, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then(res => {
        p.onSuccess(res.data);
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        if (p.onError) p.onError(err);
      });
  };

  render() {
    return (
      <Dropzone
        maxSize={1048576}
        onDrop={this.onDrop}
        style={{}}
        className={this.props.className}
        activeClassName="UploadDrag"
        acceptClassName="UploadAccept"
        rejectClassName="UploadReject"
        accept={this.props.acceptTypes || 'image/jpeg, image/png'}
        multiple={false}
      >
        {this.props.children}
      </Dropzone>
    );
  }
}

Upload.propTypes = propTypes;
