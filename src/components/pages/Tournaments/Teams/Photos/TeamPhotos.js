import React, { Component } from 'react';
import Loc from '../../../../common/Locale/Loc';
import Edit from '../../../../common/FormsMobx/Edit';
import { inject, observer } from 'mobx-react';


@inject('store') @observer
class TeamPhotos extends Component {

    


    componentDidMount = () => {
    
    }


    saveHandler = (data) => {
        const store = this.props.store.teams;
        store.current.teamImgUrl = data.teamImgUrl;
        store.current.teamImgUrl2 = data.teamImgUrl2;
        store.current.teamImgUrl3 = data.teamImgUrl3;

        store.actions.edit(store.current);
    }


    render() {
        const p = this.props;
        const team = p.store.teams.current;
        if(!team) return null;

        return (
            <div>
                <h2><Loc>Photos</Loc></h2>
                <div className=''>
                <Edit
                    fieldDefinition={[
                        { fieldName: 'teamImgUrl', localizedLabel: 'Team.ImgUrl1', editRenderType: 'upload', passProps: { uploadType: 111, idField: 'id', className: 'Large' } },
                        { fieldName: 'teamImgUrl2', localizedLabel: 'Team.ImgUrl2', editRenderType: 'upload', passProps: { uploadType: 112, idField: 'id', className: 'Large' } },
                        { fieldName: 'teamImgUrl3', localizedLabel: 'Team.ImgUrl3', editRenderType: 'upload', passProps: { uploadType: 113, idField: 'id', className: 'Large' } },
                    ]}
                    backButton={false}
                    saveButtonHandler={this.saveHandler}
                    data={team}
                    isEditing={true}
                />
                </div>
            </div>
        )
    }
}

export default TeamPhotos;