import React, { Component } from 'react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { inject, observer } from 'mobx-react';
import { getUploadsImg } from '../../helpers/Utils';
import { getSelectOptionsFromFixedValues } from '../../common/FormsMobx/EditRenderHandlers';

@inject('store')
@observer
class Users extends Component {
  getUserAvatar = user => {
    return getUploadsImg(user.avatarImgUrl, user.id, 'user', 'PlayerAvatar Mini');
  };

  render() {
    const p = this.props;
    const store = p.store.users;

    return (
      <CrudForm
        title="Config.Users"
        hint="Config.Users.Hint"
        addMessage="Add new user"
        editMessage="Edit user"
        listBackButton={false}
        getAllAction={store.actions.getAll}
        editAction={store.actions.edit}
        addAction={store.actions.create}
        deleteAction={store.actions.remove}
        getByIdAction={store.actions.get}
        addData={{
          avatarImgUrl: '',
          name: '',
          email: '',
          mobile: '',
          level: 4,
          lang: 'es',
          password: '',
        }}
        listData={store.all ? store.all.slice() : null}
        fieldDefinition={[
          {
            fieldName: 'avatarImgUrl',
            localizedLabel: 'AvatarImg',
            listRenderHandler: this.getUserAvatar,
            editRenderType: 'upload',
            hideInAdd: true,
            passProps: { idField: 'id', uploadType: 200 },
          },
          { fieldName: 'name', localizedLabel: 'Name', editRenderType: 'text', rules: 'required' },
          { fieldName: 'email', localizedLabel: 'Email', editRenderType: 'text', rules: 'required' },
          { fieldName: 'mobile', localizedLabel: 'Mobile', editRenderType: 'text', rules: 'required' },
          {
            fieldName: 'level',
            hideInList: true,
            hideInAdd: true,
            hideInEdit: true,
            localizedLabel: 'Level',
            editRenderType: 'select',
            selectOptions: getSelectOptionsFromFixedValues('UserLevel', 4, 4),
          },
          { fieldName: 'lang', localizedLabel: 'Language', editRenderType: 'text' },
          {
            fieldName: 'password',
            localizedLabel: 'Password',
            hint: 'Password.Hint',
            editRenderType: 'text',
            hideInList: true,
          },
        ]}
      />
    );
  }
}

export default Users;
