import React from 'react';
import PropTypes from 'prop-types';
import Loc from '../Locale/Loc';
import Upload from '../Upload';
import { observer } from 'mobx-react';
import { getUploadUrl } from '../../helpers/Utils';
import { observable } from '../../../../node_modules/mobx';
import { getOpErrorText } from '../FormsMobx/Utils';

const propTypes = {
  passProps: PropTypes.shape({
    uploadType: PropTypes.any.isRequired,
    idObject: PropTypes.any.isRequired,
  }),
  label: PropTypes.string,
};

const defaultProps = {};

@observer
class UploadComponent extends React.Component {
  @observable error = null;

  onSuccess = uploadData => {
    const p = this.props;
    if (!uploadData) p.field.onChange(null);
    else p.field.onChange(uploadData.repositoryPath);

    const callback = p.passProps.onUploadSuccess;
    if (callback) callback(uploadData);
  };

  render() {
    const { field, passProps } = this.props;

    return (
      <div className="FormField">
        {field.label ? <label className="Label">{field.label}</label> : null}
        {this.props.hint ? (
          <small className="Hint">
            <Loc>{this.props.hint}</Loc>
          </small>
        ) : null}
        <div className="UploadContainer">
          <Upload
            className={'Upload ' + passProps.className}
            value={field.value}
            onSuccess={this.onSuccess}
            onError={err => {
              this.error = getOpErrorText(err);
            }}
            idObject={passProps.isEditing ? passProps.idObject : -2} // Send -2 to signal that the id will be filled later
            type={passProps.uploadType}
          >
            {field.value ? (
              <img src={getUploadUrl(field.value)} alt="" />
            ) : (
              <div className="NoImage">
                <h3>
                  <Loc>Upload.Image</Loc>
                </h3>
                <p>&nbsp;</p>
                <p className="Button Active">
                  <Loc>UploadButton</Loc>
                </p>
              </div>
            )}
          </Upload>
          <div className="Remove">
            <p>
              <Loc>Upload.DropImage</Loc>
            </p>
            {/* <p><Loc>Upload.Remove</Loc></p> */}
            <p className="Button" onClick={data => this.onSuccess(null)}>
              <Loc>Upload.RemoveButton</Loc>
            </p>
          </div>
        </div>
        <small className="ValidationError">{this.error}</small>
      </div>
    );
  }
}

UploadComponent.propTypes = propTypes;
UploadComponent.defaultProps = defaultProps;

export default UploadComponent;
