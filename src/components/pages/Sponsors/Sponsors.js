import React, { Component } from 'react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { inject, observer } from '../../../../node_modules/mobx-react';
import { withRouter } from 'react-router-dom';
import { getSelectOptionsFromFixedValues } from '../../common/FormsMobx/EditRenderHandlers';

// Call this later from orgSponsors, teamSponsors, tournamentSponsors

@inject('store') @observer
class Sponsors extends Component {

    setPropData = (data) => {
        const p = this.props;
        
        if (p.idTeam) data.idTeam = p.idTeam;
        if (p.idTournament) data.idTournament = p.idTournament;
        if (p.idOrganization) data.idOrganization = p.idOrganization;
    }

    editAction = (data) => {
        this.setPropData(data);
        return this.props.store.sponsors.actions.edit(data);
    }

    createAction = (data) => {
        this.setPropData(data);
        return this.props.store.sponsors.actions.create(data);
    }

    getListAction = () => {
        const p = this.props;
        const target = p.store.sponsors;
        if (p.idTeam) return target.getAllForTeam(p.idTeam);
        if (p.idTournament) return target.getAllForTournament(p.idTournament);
        if (p.idOrganization) return target.getAllForOrganization(p.idOrganization);

    }

    render() {
        const p = this.props;
        const target = p.store.sponsors;

        return (
            <CrudForm
                listBackButton={false}
                title='Sponsors'
                addMessage='Create new sponsor'
                editMessage='Edit sponsor'

                getAllAction={this.getListAction()}
                editAction={this.editAction}
                addAction={this.createAction}
                deleteAction={(data) => target.actions.remove(data)}
                getByIdAction={(id) => target.actions.get(id)}

                listData={target.all ? target.all.slice() : null}
                loadingStatus={target.loading}

                addData={{
                    name: '',
                    imgUrl: '',
                    altText: '',
                    rawCode: '',
                    url: '',
                    position: 1
                }}

                fieldDefinition={[
                    { fieldName: 'imgUrl', localizedLabel: 'Sponsor.Image', hint: 'Sponsor.Image.Hint', hideInAdd: true, hideInList: true, editRenderType: 'upload', passProps: { idField: 'id', uploadType: 501 } },
                    { fieldName: 'name', localizedLabel: 'Name', hint: 'Sponsor.Name.Hint',  editRenderType: 'text', rules: 'required|min:3' },
                    { fieldName: 'altText', localizedLabel: 'Description', hint: 'Sponsor.Description.Hint', editRenderType: 'text', rules: null },
                    { fieldName: 'url', localizedLabel: 'Sponsor.Url', hint: 'Sponsor.Url.Hint', hideInList: true, editRenderType: 'text', rules: null },
                    { fieldName: 'rawCode', localizedLabel: 'Sponsor.RawCode', hideInList: true, hint: 'Sponsor.RawCode.Hint', editRenderType: 'text', rules: null },
                    { fieldName: 'position', localizedLabel: 'Sponsor.Position', hideInList: true, hint: 'Sponsor.Position.Hint', editRenderType: 'select', selectOptions: getSelectOptionsFromFixedValues('SponsorPosition', 1, 4), rules: null },
                    { fieldName: 'sequenceOrder', localizedLabel: 'Sponsor.Sequence', hideInList: true, hint: 'Sponsor.Sequence.Hint', editRenderType: 'text', rules: null },
                ]}
            />
        )
    }
}

export default withRouter(Sponsors);