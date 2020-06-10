import React, { Component, Fragment } from 'react';
import Loc, { Localize } from '../../common/Locale/Loc';
import { observer, inject } from 'mobx-react';
import { observable, action, toJS } from 'mobx';
import { withRouter } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner';
import PaymentsTable from './PaymentsTable';
import EditPaymentStepDialog from './EditPaymentStepDialog';
import EditDialog from '../Tournaments/Stages/EditDialog';
import MessageBox from '../../common/Dialogs/MessageBox';
import EditPaymentOptionDialog from './EditPaymentOptionDialog';
import EditJsonDialog from './EditJsonDialog';
import { getJsonError, getUniqueInt } from '../../helpers/Utils';
import { toast } from 'react-toastify';
import { updateByIdInArray, removeByIdInArray } from '../../helpers/Data';
import AccessLimit from '../../common/AccessLimit';
import PaymentFees from './PaymentFees';
import EditFeesDialog from './EditFeesDialog';


const DefaultEnrollmentData = {
    organizationFees: {
        fixedFee: 0,
        variableFee: 0
    },
    steps: []
};

@inject('store') @observer
class PaymentConfig extends Component {

    @observable showStepDialog = false;
    @observable showOptionDialog = false;
    @observable showJsonDialog = false;
    @observable showFeesDialog = false;
    @observable dialogProps = null;

    @observable paymentConfigId = -1;
    @observable paymentData = null;

    getParamsFromRoute = () => {
        const p = this.props;
        const pr = p.match.params;
        let { idTeam, idTournament } = pr;
        let idOrganization = -1;

        const idUser = p.player ? p.player.idUser : -1;

        if (!idTeam) idTeam = -1;
        if (!idTournament) idTournament = -1;
        if (idTeam === -1 && idTournament === -1) idOrganization = 1;

        return { id: this.paymentConfigId, idTeam, idTournament, idOrganization, idUser };
    }

    isOrgConfig = () => {
        const p = this.props;
        const pr = p.match.params;
        let { idTeam, idTournament } = pr;

        return (!idTeam && !idTournament);
    }

    getSpecificConfig = () => {
        const pa = this.getParamsFromRoute();
        const store = this.props.store.paymentConfigs;

        if (pa.idUser > -1) return store.getForUser(pa.idUser, pa.idTeam, pa.idTournament);
        if (pa.idOrganization > -1) return store.getForOrganization();
        if (pa.idTournament > -1 && pa.idTeam === -1) return store.getForTournament(pa.idTournament);
        if (pa.idTeam && pa.idTournament) return store.getForTeam(pa.idTeam, pa.idTournament);
    }

    componentDidMount = () => {
        this.getSpecificConfig()
            .then(res => {
                if (res) {
                    this.paymentConfigId = res.id;
                    this.paymentData = res.enrollmentWorkflow ?
                        JSON.parse(res.enrollmentWorkflow) : DefaultEnrollmentData;

                    this.fixWorkflowIntegrity(this.paymentData);
                }
            })
    }


    createHandler = () => {
        const params = this.getParamsFromRoute();
        const payload = { ...params, enrollmentWorkflow: JSON.stringify(DefaultEnrollmentData) };
        const store = this.props.store.paymentConfigs;
        store.actions.create(payload)
            .then(res => {
                if (res) {
                    this.paymentData = JSON.parse(res.enrollmentWorkflow);
                    this.paymentConfigId = res.id;
                }
            })
    }

    saveHandler = (data) => {
        if (!data) return;

        this.renumberSteps(data.steps);

        const params = this.getParamsFromRoute();
        const enrollmentWorkflow = JSON.stringify(data);
        const payload = { enrollmentWorkflow, ...params };
        const store = this.props.store.paymentConfigs;
        store.actions.edit(payload);
    }

    importHandler = () => {
        alert("Importar");
    }


    getNoConfigMessage = () => {
        const params = this.getParamsFromRoute();

        if (params.idUser > -1) return 'Payment.NoConfig.Intro.User';
        if (params.idOrganization > -1) return 'Payment.NoConfig.Intro.Org';
        if (params.idTeam > -1) return "Payment.NoConfig.Intro.Team";
        if (params.idTournament > -1 && params.idTeam === -1) return 'Payment.NoConfig.Intro.Tournament';

        return "Payment.NoConfig.Intro.Unknown";
    }

    
    // __ Integrity ___________________________________________________________


    fixWorkflowIntegrity = (data) => {
        if (!data) return;

        if (data.steps) {
            this.renumberSteps(data.steps);
            this.ensureStepOptionsIsArray(data.steps);
        }

    }

    renumberSteps = (steps) => {
        if (!steps) return;

        for (let i = 0; i < steps.length; ++i) steps[i].id = i + 10;
    }

    ensureStepOptionsIsArray = (steps) => {
        if (!steps) return;

        for (let i = 0; i < steps.length; ++i) {
            const s = steps[i];
            if (s.options === "") s.options = [];
        }
    }


    // __ Button handlers _____________________________________________________


    @action addStepHandler = () => {
        this.showStepDialog = true;
        this.dialogProps = {
            action: this.stepAddedHandler,
            isEditing: false,
            data: {
                title: '', description: ''        // Default values
            }
        };
    }

    @action editStepHandler = (step) => {
        this.showStepDialog = true;
        this.dialogProps = {
            action: this.stepEditedHandler,
            data: step,
            isEditing: true
        }
    }

    deleteStepHandler = (step) => {
        const msg = <p><Loc>Really delete?</Loc> {step.title}?</p>;
        this.showConfirmation(msg, step, this.stepDeletedHandler);
    }

    @action addOptionHandler = (step) => {
        this.showOptionDialog = true;
        this.dialogProps = {
            action: this.optionAddedHandler,
            data: {
                title: '',
                description: '',
                price: 0.00,
            },
            isEditing: false,
            step
        }
    }

    @action editOptionHandler = (option, step) => {
        this.showOptionDialog = true;
        this.dialogProps = {
            action: this.optionEditedHandler,
            data: option,
            isEditing: true,
            step
        }
    }

    deleteOptionHandler = (option, step) => {
        const msg = <p><Loc>Really delete?</Loc> {option.title}?</p>;
        this.showConfirmation(msg, { option, step }, this.optionDeletedHandler);
    }

    @action showJsonHandler = () => {
        this.showJsonDialog = true;
        this.dialogProps = {
            action: this.jsonEditedHandler,
            data: { enrollmentWorkflow: JSON.stringify(toJS(this.paymentData), null, 2) },
            fieldName: 'enrollmentWorkflow',
            localizedLabel: 'Payment.Workflow'
        };
    }

    deleteConfigHandler = () => {
        const msg = <p><Loc>{this.isOrgConfig() ? 'Payment.DeleteConfig.Confirm.Org' : 'Payment.DeleteConfig.Confirm'}</Loc></p>;
        this.showConfirmation(msg, 'deleteConfig', this.configDeletedHandler);
    }

    @action editFeesHandler = () => {
        this.showFeesDialog = true;
        this.dialogProps = {
            action: this.feesEditedHandler, 
            data: this.paymentData.organizationFees,
            isEditing: true
        };
    }


    // __ Event handlers ______________________________________________________


    @action stepAddedHandler = (step) => {
        this.showStepDialog = false;
        if (!step) return;

        const { steps } = this.paymentData;

        // Ids start at 10
        step.id = steps.length + 10;
        step.options = [];

        steps.push(step);

        this.renumberSteps(steps);
    }

    @action stepEditedHandler = (step) => {
        this.showStepDialog = false;
        if (!step) return;

        updateByIdInArray(this.paymentData.steps, step.id, step);
    }

    @action stepDeletedHandler = (step) => {
        removeByIdInArray(this.paymentData.steps, step.id);

        this.renumberSteps(this.paymentData.steps);
    }


    @action optionAddedHandler = (option, step) => {
        this.showOptionDialog = false;
        if (!option) return;

        // Unique ID
        option.id = getUniqueInt();
        option.price = parseFloat(option.price);

        if (step.options === "") step.options = [];
        step.options.push(option);
    }

    @action optionEditedHandler = (option, step) => {
        this.showOptionDialog = false;
        if (!option) return;

        option.price = parseFloat(option.price);
        updateByIdInArray(step.options, option.id, option);
    }

    @action optionDeletedHandler = ({option, step}) => {
        removeByIdInArray(step.options, option.id);
    }


    @action jsonEditedHandler = (data) => {
        if (!data) {
            // Cancel
            this.showJsonDialog = false;
            return;
        }

        // Validate json. If valid, close dialog, otherwise, show toast and keep dialog open
        const jsonErr = getJsonError(data.enrollmentWorkflow);
        if (jsonErr) {
            toast.error(Localize('Payment.Json.NotValid') + ': ' + jsonErr);
            return;
        }

        this.showJsonDialog = false;
        this.paymentData = JSON.parse(data.enrollmentWorkflow);
    }

    @action configDeletedHandler = (data) => {
        if (!data) return;

        this.paymentData = null;

        const params = this.getParamsFromRoute();
        const store = this.props.store.paymentConfigs;
        store.actions.remove(params)
            .then(res => {
                if (!res) return;

                this.paymentConfigId = -1;
                this.paymentData = null;
            })
    }

    @action feesEditedHandler = (fees) => {
        this.showFeesDialog = false;
        if (!fees) return;

        fees.fixedFee = parseFloat(fees.fixedFee);
        fees.variableFee = parseFloat(fees.variableFee);

        this.paymentData.organizationFees = fees;
    }


    // __ Confirm dialog _______________________________________________________


    @observable showConfirmDialog = false;
    confirmDialogProps = null;

    @action showConfirmation(msg, data, onAccept) {
        this.confirmDialogProps = { msg, data, onAccept };
        this.showConfirmDialog = true;
    }

    @action confirmDialogCloseHandler = (button) => {
        if (button === 'Yes') this.confirmDialogProps.onAccept(this.confirmDialogProps.data);

        this.showConfirmDialog = false;
    }


    // __ Callbacks ___________________________________________________________


    callbacks = {
        addStep: this.addStepHandler,
        editStep: this.editStepHandler,
        deleteStep: this.deleteStepHandler,
        addOption: this.addOptionHandler,
        editOption: this.editOptionHandler,
        deleteOption: this.deleteOptionHandler, 
        editFees: this.editFeesHandler
    }

    render() {
        const p = this.props;
        const store = p.store.paymentConfigs;
        //const paymentConfig = store.current;
        const paymentConfig = this.paymentData;

        return (
            <AccessLimit allowOrgAdmin>
                <Spinner loading={store.loading}>
                    {paymentConfig ?
                        <Fragment>
                            <div className='Card Form'>
                                <h3><Loc>Payment.Workflow.Title</Loc></h3>
                                <div className='Content'>
                                    <p className='Hint'><Loc>{this.getNoConfigMessage()}</Loc></p>
                                    <p className='Hint'><Loc>Payment.Workflow.Intro.Common</Loc></p>
                                    <PaymentsTable data={paymentConfig} callbacks={this.callbacks} />
                                </div>
                            </div>
                            <div className='Card Form'>
                                <h3><Loc>Payment.OrgConfig.Title</Loc></h3>
                                <div className='Content'>
                                    <PaymentFees data={paymentConfig} callbacks={this.callbacks} />
                                </div>
                            </div>
                            <div className=''>
                                {/* These 2 actions should go to a different place */}
                                <button className='Button' onClick={this.deleteConfigHandler}><Loc>Payment.DeleteConfig</Loc></button>
                                <button className='Button' onClick={this.showJsonHandler}><Loc>Payment.ShowEditJsonForm</Loc></button>

                                <button className='Button Active' onClick={() => this.saveHandler(this.paymentData)}><Loc>Payment.SaveConfig</Loc></button>
                            </div>

                        </Fragment>

                        :

                        <div className='Card Form'>
                            <h3><Loc>Payment.NoConfig.Title</Loc></h3>
                            <div className='Content'>
                                <p className='Hint'><Loc>{this.getNoConfigMessage()}</Loc></p>
                                <button className='Button' onClick={this.createHandler}><Loc>Payment.CreateNewConfig</Loc></button>
                                <button className='Button' onClick={this.importHandler}><Loc>Payment.CopyConfig</Loc></button>
                            </div>
                        </div>
                    }


                    <EditDialog show={this.showStepDialog}>
                        <EditPaymentStepDialog {...this.dialogProps} />
                    </EditDialog>

                    <EditDialog show={this.showOptionDialog}>
                        <EditPaymentOptionDialog {...this.dialogProps} />
                    </EditDialog>

                    <EditDialog show={this.showJsonDialog}>
                        <EditJsonDialog {...this.dialogProps} />
                    </EditDialog>

                    <EditDialog show={this.showFeesDialog}>
                        <EditFeesDialog {...this.dialogProps} />
                    </EditDialog>

                    <MessageBox buttons='YesNo' show={this.showConfirmDialog} onClose={this.confirmDialogCloseHandler}>
                        {this.confirmDialogProps && this.confirmDialogProps.msg}
                    </MessageBox>

                </Spinner>
            </AccessLimit>
        )
    }
}

export default withRouter(PaymentConfig);