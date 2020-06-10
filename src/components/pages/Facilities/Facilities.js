import React, { Component } from 'react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { observer, inject } from 'mobx-react';


// DAVE: Use this as the reference CRUD impl

@inject('store')
@observer
class Facilities extends Component {
    render() {
        const target = this.props.store.facilities;

        return (
            <CrudForm 
                    title='Fields'
                    addMessage='Create new field'
                    editMessage='Edit field'
                    
                    getAllAction={target.actions.getAll}
                    editAction={(data) => target.actions.edit(data)}
                    addAction={(data) => target.actions.create(data)}
                    deleteAction={(data) => target.actions.remove(data)}
                    getByIdAction={(id) => target.actions.get(id)}

                    listData={target.all ? target.all.slice() : null}
                    loadingStatus={target.loading}    

                    addData={{
                        name: '',
                        address: '', 
                        location: '',
                        description: '',
                        imgUrl: '', 
                    }}

                    fieldDefinition={[
                        { fieldName: 'imgUrl', localizedLabel: 'Field.Image', hideInList: true, editRenderType: 'upload', passProps: { idField: 'id', uploadType: 510 } },
                        { fieldName: 'name', localizedLabel: 'Name', editRenderType: 'text', rules: 'required' },
                        { fieldName: 'description', localizedLabel: 'Description', editRenderType: 'text', rules: null },
                        { fieldName: 'address', localizedLabel: 'Address', editRenderType: 'text', rules: null },
                        { fieldName: 'location', localizedLabel: 'Location', hint: 'Location.Hint', hideInList: true, editRenderType: 'text' }
                    ]}
                />
        )
    }
}

export default Facilities;