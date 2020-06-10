import React, { Component } from 'react';
import Edit from '../../common/FormsMobx/Edit';
import { inject, observer } from 'mobx-react';
import { getLangOptions } from '../../common/Locale/Translations';
import { setLang } from '../../common/Locale/Loc';
import { observable } from 'mobx';


@inject('store') @observer
class OrgData extends Component {

    @observable data = null;

    componentDidMount = () => {
        const org = this.props.store.organization;
         org.getSecret().then(res => this.data = res);
    }

    getCurrencyOptions = () => {
        return [ 
            { value: '', label: ''},
            { value: 'eur', label: 'Euro (€)'},
            { value: 'usd', label: 'US Dollar ($)'}
        ];
    }

    saveHandler = (data) => {
        const org = this.props.store.organization;
        org.editSecret(data).then(res => {
            if (res) org.current = data;
        })

        if (data.defaultLang) setLang(data.defaultLang);
    }

    render() {
        const { data } = this;
        if (!data) return null;

        return (
            <div>
                <Edit 
                    fieldDefinition={[
                        { fieldName: 'logoImgUrl', localizedLabel: 'Org.Logo', hint: 'Org.Logo.Hint', editRenderType: 'upload', passProps: { uploadType: 502, idField: 'id' } },
                        { fieldName: 'name', localizedLabel: 'Org.Name', hint: 'Org.Name.Hint', editRenderType: 'text', rules: 'required|string|between:3,50' },
                        { fieldName: 'motto', localizedLabel: 'Org.Motto', hint: 'Org.Motto.Hint', editRenderType: 'text', rules: 'string|between:0,80' },
                        { fieldName: 'address1', localizedLabel: 'Org.Address1', editRenderType: 'text', rules: 'string|between:0,100' },
                        { fieldName: 'address2', localizedLabel: 'Org.Address2', editRenderType: 'text', rules: 'string|between:0,100' },
                        { fieldName: 'address3', localizedLabel: 'Org.Address3', editRenderType: 'text', rules: 'string|between:0,100' },

                        { fieldName: 's1', localizedLabel: 'Org.Social', hideInList: true, hideInAdd: true, editRenderType: 'separator'},
                        //{ fieldName: 'social1', localizedLabel: 'Org.Social1', hint: 'Org.Social.Hint', editRenderType: 'text', rules: null },
                        { fieldName: 'social1link', localizedLabel: 'Org.SocialLink1', hint: 'Org.SocialLink1.Hint', editRenderType: 'text', rules: null },
                        //{ fieldName: 'social2', localizedLabel: 'Org.Social1', hint: 'Org.Social.Hint', editRenderType: 'text', rules: null },
                        { fieldName: 'social2link', localizedLabel: 'Org.SocialLink2', hint: 'Org.SocialLink2.Hint', editRenderType: 'text', rules: null },
                        //{ fieldName: 'social3', localizedLabel: 'Org.Social', hint: 'Org.Social.Hint', editRenderType: 'text', rules: null },
                        { fieldName: 'social3link', localizedLabel: 'Org.SocialLink3', hint: 'Org.SocialLink3.Hint', editRenderType: 'text', rules: null },
                        //{ fieldName: 'social4', localizedLabel: 'Org.Social', hint: 'Org.Social.Hint', editRenderType: 'text', rules: null },
                        { fieldName: 'social4link', localizedLabel: 'Org.SocialLink4', hint: 'Org.SocialLink4.Hint', editRenderType: 'text', rules: null },
                        { fieldName: 'social5link', localizedLabel: 'Org.SocialLink5', hint: 'Org.SocialLink5.Hint', editRenderType: 'text', rules: null },

                        { fieldName: 'defaultLang', localizedLabel: 'Org.Lang', hint: 'Org.Lang.Hint', editRenderType: 'select', selectOptions: getLangOptions() },

                        { fieldName: 's3', localizedLabel: 'Org.PaymentData', hideInList: true, hideInAdd: true, editRenderType: 'separator'},
                        { fieldName: 'paymentKeyPublic', localizedLabel: 'Org.PaymentKeyPublic', hint: 'Org.PaymentKeyPublic.Hint', editRenderType: 'text' },
                        { fieldName: 'paymentKey', localizedLabel: 'Org.PaymentKey', hint: 'Org.PaymentKey.Hint', editRenderType: 'text' },
                        { fieldName: 'paymentCurrency', localizedLabel: 'Org.PaymentCurr', hint: 'Org.PaymentCurr.Hint', editRenderType: 'select', selectOptions: this.getCurrencyOptions() },
                        { fieldName: 'paymentDescription', localizedLabel: 'Org.PaymentDesc', hint: 'Org.PaymentDesc.Hint', editRenderType: 'text' },
                    ]}
                    editMessage='Org.Edit'
                    backButton={false}
                    saveButtonHandler={this.saveHandler}
                    data={data}
                    isEditing={true}
                />
            </div>
        )
    }
}

export default OrgData;