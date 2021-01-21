import React, { Component } from 'react';
import Spinner from '../../common/Spinner/Spinner';
import BackButton from '../../common/BackButton';
import MessageBox from '../../common/Dialogs/MessageBox';
import Loc from '../../common/Locale/Loc';
import DataTable from '../../common/DataTable';
import IconButton from '../../../formFields/IconButton';
import { getFieldLabel } from './Utils';
import { observer } from 'mobx-react';
import { getNestedValue } from './ListRenderHandlers';
import XCircle from 'react-feather/dist/icons/x-circle';
import Edit3 from 'react-feather/dist/icons/edit-3';

const defaultProps = {
  title: null,
  hint: null,

  canAdd: true,
  canEdit: true,
  canDelete: true,
  confirmDelete: true,
  listBackButton: true,

  additionalButtons: null,

  fieldDefinition: null,

  loadingStatus: 'busy',
  loading: false,

  addMessage: null,

  addButtonHandler: null,
  editButtonHandler: null,
  deleteHandler: null,
  listData: null,

  triggerGetAllAction: true,
  showActionBar: true,

  addButtonClass: 'Active',
};

@observer
class List extends Component {
  state = {
    showDeleteConfirmation: false,
    selectedItems: null,
  };

  componentDidMount = () => {
    const p = this.props;
    if (!p.getAllAction || !p.triggerGetAllAction) return;

    p.getAllAction();
  };

  addEditDeleteButtons = columns => {
    const p = this.props;

    if (!p.canEdit && !p.canDelete) return;

    columns.push({
      id: '__actions',
      label: '',
      handler: this.getEditDeleteActionsHandler(),
    });
  };

  getEditDeleteActionsHandler = () => {
    const p = this.props;

    return row => {
      return (
        <div className="ListActionButtons">
          {p.canEdit ? (
            <IconButton onClick={() => p.editButtonHandler(row)} icon="mode_edit">
              <Edit3 size={20} />
            </IconButton>
          ) : null}
          {p.canDelete ? (
            <IconButton
              onClick={() => (p.confirmDelete ? this.handleDelete(row) : p.deleteHandler(row))}
              icon="delete"
            >
              <XCircle size={20} />
            </IconButton>
          ) : null}
        </div>
      );
    };
  };

  getColumns = () => {
    if (!this.props.fieldDefinition) return [];

    const fields = this.props.fieldDefinition.filter(
      f => f.hideInList === undefined || f.hideInList !== true
    );

    const columns = fields.map(f => {
      if (f.visibleInList !== undefined && f.visibleInList === false) return null;

      const fieldLabel = getFieldLabel(f);
      const fieldHandler = f.listRenderHandler || (v => getNestedValue(v, f.fieldName));

      return { id: f.fieldName, label: fieldLabel, handler: fieldHandler };
    });

    this.addEditDeleteButtons(columns);

    return columns;
  };

  handleDelete = row => {
    this.setState({ showDeleteConfirmation: true, selectedItems: row });
  };

  handleDeleteConfirmation = result => {
    // Clear the dialog
    this.setState({ showDeleteConfirmation: false });

    // If yes, delete the selected items. Force reload?
    if (result !== 'Delete') return;

    this.props.deleteHandler(this.state.selectedItems);
  };

  render() {
    const p = this.props;
    const actionButtonsHandler = this.getEditDeleteActionsHandler();

    return (
      <React.Fragment>
        {p.title ? (
          <h2>
            <Loc>{p.title}</Loc>
          </h2>
        ) : null}
        {p.hint ? (
          <p className="ListHint">
            <Loc>{p.hint}</Loc>
          </p>
        ) : null}
        {p.showActionBar ? (
          <div className="ActionBar">
            {p.listBackButton ? <BackButton /> : null}

            {p.canAdd ? (
              <button className={'Button ' + p.addButtonClass} onClick={p.addButtonHandler}>
                <Loc>{p.addMessage}</Loc>
              </button>
            ) : null}

            {p.additionalButtons}
          </div>
        ) : null}
        <Spinner status={p.loadingStatus} loading={p.loading}>
          {p.itemTemplate ? (
            p.listData.map(item => p.itemTemplate(item, actionButtonsHandler))
          ) : (
            <DataTable
              isDataNormalized={true}
              columns={this.getColumns()}
              data={p.listData}
              idFieldName={p.idFieldName}
            />
          )}
        </Spinner>
        <MessageBox
          show={this.state.showDeleteConfirmation}
          onClose={this.handleDeleteConfirmation}
          buttons="DeleteCancel"
        >
          <p className="ModalHead">
            <Loc>{p.deleteDialogTitle || 'Confirm deletion'}</Loc>
          </p>
          <p>
            <Loc>{p.deleteDialogMessage || 'Really delete?'}</Loc> "
            {this.state.selectedItems ? this.state.selectedItems.name : ''}"?
          </p>
        </MessageBox>
      </React.Fragment>
    );
  }
}

List.defaultProps = defaultProps;

export default List;
