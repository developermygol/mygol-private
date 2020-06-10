import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import List from './List';
import Details from './Details';
import Edit from './Edit';
import { redirect } from './Utils';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';


/*
    Field definition: 
    
    - listRenderHandler
    - editRenderType
    - selectOptions
    - hideInList: bool
    - hideInAdd: bool
    - hideInEdit: bool
*/


const defaultProps = {
    title: null,
    hint: null, 
    addMessage: 'Create title not set',
    editMessage: 'Edit title not set',
    deleteDialogTitle: null,
    deleteDialogMessage: null,

    loadingStatus: false,
    canEdit: true, 
    canAdd: true, 
    canDelete: true,
    canList: true,
    listBackButton: true,
    listAdditionalButtons: null,

    listComponent: List,
    editComponent: Edit,
    addComponent: Edit,
    detailsComponent: Details,

    listItemTemplate: null, 

    afterAddRedirect: null, 
    afterEditRedirect: null, 

    listData: null,
    addData: null,

    routePath: null,
    listRoutePath: null,
    routeUrl: null,
    routeIdParamName: 'id',

    getAllAction: null,
    addAction: null,
    editAction: null,
    deleteAction: null,
    getByIdAction: null,

    beforeEdit: null,

    idFieldName: null,
    fieldDefinition: null,    

    itemCreatedOkMsg: 'Item created ok',
    itemUpdatedOkMsg: 'Item updated ok',
    itemDeletedOkMsg: 'Item deleted ok', 

    passProps: null, 
    addButtonClass: 'Active'
}

@observer
class CrudForm extends Component {

    editedItem = null;

    @observable loading = false;

    getEditedItem = () => {
        return this.editedItem;
    }

    getListProps = () => {
        const p = this.props;
        return {
            title: p.title,
            hint: p.hint,
            addMessage: p.addMessage,
            fieldDefinition: p.fieldDefinition,
            listData: p.listData,
            loadingStatus: this.props.loadingStatus,
            addButtonHandler: this.addButtonHandler,
            editButtonHandler: this.editButtonHandler,
            deleteHandler: this.deleteHandler,
            idFieldName: p.idFieldName,
            canAdd: p.canAdd,
            canEdit: p.canEdit, 
            canDelete: p.canDelete,
            listBackButton: p.listBackButton,
            additionalButtons: p.listAdditionalButtons,
            deleteDialogTitle: p.deleteDialogTitle,
            deleteDialogMessage: p.deleteDialogMessage,
            getAllAction: p.getAllAction,
            itemTemplate: p.listItemTemplate,
            addButtonClass: p.addButtonClass
        }
    }

    getAddProps = () => {
        const p = this.props;
        return {
            title: p.title,
            fieldDefinition: p.fieldDefinition,
            addMessage: p.addMessage,
            data: p.addData,
            saveButtonHandler: this.addFormSaveHandler,
            loading: this.loading
        }
    }

    getEditProps = () => {
        const p = this.props;
        return {
            title: p.title,
            fieldDefinition: p.fieldDefinition,
            editMessage: p.editMessage,
            saveButtonHandler: this.editFormSaveHandler, 
            data: this.editedItem,  // Or take it from some context that can be set when redirecting. 
            getByIdAction: p.getByIdAction,
            routeIdParamName: p.routeIdParamName,
            loading: this.loading
        }        
    }

    getDetailsProps = () => {
        const p = this.props;
        return {
            fieldDefinition: p.fieldDefinition,
            data: this.editedItem
        }        
    }
    
    addButtonHandler = () => {
        const p = this.props;
        const baseUrl = p.routeUrl || p.match.url;
        const destUrl = baseUrl + '/new';
        redirect(this, destUrl);
    }

    @action addFormSaveHandler = (data) => {
        const p = this.props;
        if (!p.addAction) return;

        this.loading = true;
        p.addAction(data, null, p.itemCreatedOkMsg)     // Detect here if it is a promise and call 'then'
            .then(
                res => {
                    this.loading = false;
                    if (res !== undefined && res !== null) {
                        const to = p.afterAddRedirect || p.match.url;
                        redirect(this, to);
                    }
                },
                err => {
                    this.loading = false;
                }
            );
    }


    editButtonHandler = (data) => {
        // Redirect to edit route and set the data to edit
        const p = this.props;
        const baseUrl = p.routeUrl || p.match.url;
        const destUrl = baseUrl + '/edit/';
        
        if (p.beforeEdit) data = p.beforeEdit(data);

        this.editedItem = data;
        redirect(this, destUrl + data.id);
    }

    editFormSaveHandler = (data) => {
        const p = this.props;
        // dispatch the put action. That action should also update the item in the list and prevent reload
        if (!p.editAction) return;

        this.loading = true;
        p.editAction(data, null, this.props.itemUpdatedOkMsg)      // Detect here if it is a promise and call 'then'
            .then(
                res => {
                    this.loading = false;
                    if (res !== undefined && res !== null) {
                        const to = p.afterEditRedirect || p.match.url;
                        redirect(this, to);
                    }
                }
            );
    }

    deleteHandler = (data) => {
        // Delete action. At this point, it has been confirmed and only thing left is to delete.
        if (!this.props.deleteAction) return;
        this.props.deleteAction(data, null, this.props.itemDeletedOkMsg);
    }


    render() {
        const path = this.props.routePath || this.props.match.path;
        const listPath = this.props.listRoutePath || path;

        const ListComponent = this.props.listComponent;
        const listProps = this.getListProps();

        const EditComponent = this.props.editComponent;
        const addProps = this.getAddProps();
        const editProps = this.getEditProps();

        const DetailsComponent = this.props.detailsComponent;
        const detailsProps = this.getDetailsProps();

        const passProps = this.props.passProps;

        const idParamName = this.props.routeIdParamName;

        return (
            <React.Fragment>
                <Switch>
                    <Route path={listPath} exact render={ (props) => <ListComponent {...listProps} {...passProps} /> }  />
                    <Route path={path + '/new'} render={ (props) => <EditComponent {...addProps} {...passProps} isEditing={false} /> } />
                    <Route path={path + '/edit/:' + idParamName} render={(props) => <EditComponent {...editProps} {...passProps} isEditing={true} /> } />
                    <Route path={path + '/:' + idParamName} render={ (props) => <DetailsComponent {...detailsProps} {...passProps} /> } />
                </Switch>
            </React.Fragment>
        )
    }
}



CrudForm.defaultProps = defaultProps;

export default withRouter(CrudForm);