import React, { Component, Fragment } from 'react';
import Loc, { Localize } from '../../../common/Locale/Loc';
import { observer, inject } from 'mobx-react';
import AutoCardsTable from './AutoCardsTable';
import { observable, action, toJS } from 'mobx';
import { withRouter } from 'react-router-dom';
import MessageBox from '../../../common/Dialogs/MessageBox';
import EditDialog from '../../Tournaments/Stages/EditDialog';
import EditCardConfigDialog from './EditCardConfigDialog';
import { getUniqueInt, getJsonError } from '../../../helpers/Utils';
import { removeByIdInArray, updateByIdInArray } from '../../../helpers/Data';
import { toast } from 'react-toastify';
import EditJsonDialog from '../../PaymentConfig/EditJsonDialog';
import EditCycleConfigDialog from './EditCycleConfigDialog';
import AutoCyclesTable from './AutoCyclesTable';


class CycleConfig extends Component {
    render() {
        return (
            <div className='Card Hero'>
                <h3><Loc>Sanctions.AutoCycleConfig</Loc></h3>
                <div className='Content'>
                    <p className='Hint'><Loc>Sanctions.AutoCycleConfig.Hint</Loc></p>
                    <AutoCyclesTable callbacks={this.props.callbacks} cycles={this.props.cycles} />
                </div>
            </div>
        )
    }
}


class CardCombinationsConfig extends Component {
    render() {
        return (
            <div className='Card Hero'>
                <h3><Loc>Sanctions.AutoCardConfig</Loc></h3>
                <div className='Content'>
                    <p className='Hint'><Loc>Sanctions.AutoCardConfig.Hint</Loc></p>
                    <AutoCardsTable callbacks={this.props.callbacks} cards={this.props.cards} />
                </div>
            </div>
        )
    }
}


@inject('store') @observer
class AutoSanctionsConfig extends Component {

    @observable showCardConfigDialog = false;
    @observable showCycleConfigDialog = false;
    @observable showJsonDialog = false;

    componentDidMount = () => {
        const p = this.props;
        const store = this.props.store.autosanctions;
        const { idTournament } = p.match.params;

        store.getForTournament(idTournament);
    }


    // __ Event handlers ______________________________________________________


    @action jsonEditedHandler = (data) => {
        this.showJsonDialog = false;
        if (!data) return;

        // Validate json. If valid, close dialog, otherwise, show toast and keep dialog open
        const jsonErr = getJsonError(data.parsed);
        if (jsonErr) {
            toast.error(Localize('Payment.Json.NotValid') + ': ' + jsonErr);
            return;
        }

        this.props.store.autosanctions.parsed = JSON.parse(data.parsed);
    }

    @action cardConfigAddedHandler = (cardConfig) => {
        this.showCardConfigDialog = false;
        if (!cardConfig) return;

        cardConfig.id = getUniqueInt();
        const parsed = this.props.store.autosanctions.parsed;
        parsed.cards.push(cardConfig);
    }

    @action cardConfigEditedHandler = (cardConfig) => {
        if (cardConfig) {
            const parsed = this.props.store.autosanctions.parsed;
            updateByIdInArray(parsed.cards, cardConfig.id, cardConfig);
        }

        this.showCardConfigDialog = false;  // Closing the dialog here forces re-render of the table and shows changes. 
    }

    @action cardConfigDeletedHandler = (cardConfig) => {
        if (cardConfig) {
            const parsed = this.props.store.autosanctions.parsed;
            removeByIdInArray(parsed.cards, cardConfig.id);
        }

        this.showCardConfigDialog = false;
    }



    @action cycleConfigAddedHandler = (cycleConfig) => {
        this.showCycleConfigDialog = false;
        if (!cycleConfig) return;

        cycleConfig.id = getUniqueInt();
        const parsed = this.props.store.autosanctions.parsed;
        parsed.cycles.push(cycleConfig);
    }

    @action cycleConfigEditedHandler = (cycleConfig) => {
        if (cycleConfig) {
            const parsed = this.props.store.autosanctions.parsed;
            updateByIdInArray(parsed.cycles, cycleConfig.id, cycleConfig);
        }

        this.showCycleConfigDialog = false;  // Closing the dialog here forces re-render of the table and shows changes. 
    }

    @action cycleConfigDeletedHandler = (cycleConfig) => {
        if (cycleConfig) {
            const parsed = this.props.store.autosanctions.parsed;
            removeByIdInArray(parsed.cycles, cycleConfig.id);
        }

        this.showCycleConfigDialog = false;
    }


    @action saveHandler = () => {
        this.props.store.autosanctions.insertOrUpdate();
    }


    // __ Button handlers ______________________________________________________

    
    showJsonHandler = () => {
        const store = this.props.store.autosanctions;

        this.showJsonDialog = true;
        this.dialogProps = {
            action: this.jsonEditedHandler,
            data: { parsed: JSON.stringify(toJS(store.parsed), null, 2) },
            fieldName: 'parsed',
            localizedLabel: 'Sanctions.Json'
        };
    }

    @action addCardConfigHandler = () => {
        this.showCardConfigDialog = true;
        this.dialogProps = {
            action: this.cardConfigAddedHandler,
            isEditing: false,
            data: {
                card1Type: 0, 
                card2Type: 0,
                penalty: {
                    type1: 0, 
                    type2: 0, 
                    type3: 0,
                    text: Localize('Sanctions.Penalty.DefaultText'),
                },
                addYellowCards: 0
            }
        };
    }

    @action editCardConfigHandler = (cardConfig) => {
        this.showCardConfigDialog = true;
        this.dialogProps = {
            action: this.cardConfigEditedHandler,
            isEditing: true,
            data: cardConfig
        };
    }

    deleteCardConfigHandler = (cardConfig) => {
        const msg = <p><Loc>Really delete?</Loc></p>;
        this.showConfirmation(msg, cardConfig, this.cardConfigDeletedHandler);
    }



    @action addCycleConfigHandler = () => {
        this.showCycleConfigDialog = true;
        this.dialogProps = {
            action: this.cycleConfigAddedHandler,
            isEditing: false,
            data: {
                name: Localize('Sanctions.Cycles.DefaultNewCycleName'), 
                numYellowCards: 5,
                penalty: {
                    type1: 0, 
                    type2: 0, 
                    type3: 0,
                    text: Localize('Sanctions.Penalty.DefaultText'),
                }
            }
        };
    }

    @action editCycleConfigHandler = (cycleConfig) => {
        this.showCycleConfigDialog = true;
        this.dialogProps = {
            action: this.cycleConfigEditedHandler,
            isEditing: true,
            data: cycleConfig
        };
    }

    deleteCycleConfigHandler = (cycleConfig) => {
        const msg = <p><Loc>Really delete?</Loc></p>;
        this.showConfirmation(msg, cycleConfig, this.cycleConfigDeletedHandler);
    }


    // __ Callbacks ___________________________________________________________


    callbacks = {
        addCardConfig: this.addCardConfigHandler,
        editCardConfig: this.editCardConfigHandler,
        deleteCardConfig: this.deleteCardConfigHandler,

        addCycleConfig: this.addCycleConfigHandler,
        editCycleConfig: this.editCycleConfigHandler,
        deleteCycleConfig: this.deleteCycleConfigHandler
    }


    // __ Confirm dialog ______________________________________________________


    // DAVE: One day, PLEAAAASEEE refactor this into a separate component
    @observable showConfirmDialog = false;
    confirmDialogProps = null;

    @action showConfirmation(msg, data, onAccept) {
        this.confirmDialogProps = { msg, data, onAccept };
        this.showConfirmDialog = true;
    }

    @action confirmDialogCloseHandler = (button) => {
        this.showConfirmDialog = false;
        if (button === 'Yes') this.confirmDialogProps.onAccept(this.confirmDialogProps.data);
    }


    render() {
        const p = this.props;
        const { parsed } = p.store.autosanctions;
        const cards = parsed && parsed.cards;
        const cycles = parsed && parsed.cycles;

        return (
            <Fragment>
                <CardCombinationsConfig callbacks={this.callbacks} cards={cards} />
                <CycleConfig callbacks={this.callbacks} cycles={cycles} />
                
                <div className=''>
                    <button className='Button' onClick={this.showJsonHandler}><Loc>Payment.ShowEditJsonForm</Loc></button>
                    <button className='Button Active' onClick={this.saveHandler}><Loc>Sanctions.SaveConfig</Loc></button>
                </div>

                <EditDialog show={this.showJsonDialog}>
                    <EditJsonDialog {...this.dialogProps} />
                </EditDialog>

                <EditDialog show={this.showCardConfigDialog}>
                    <EditCardConfigDialog {...this.dialogProps} />
                </EditDialog>

                <EditDialog show={this.showCycleConfigDialog}>
                    <EditCycleConfigDialog {...this.dialogProps} />
                </EditDialog>

                <MessageBox buttons='YesNo' show={this.showConfirmDialog} onClose={this.confirmDialogCloseHandler}>
                    {this.confirmDialogProps && this.confirmDialogProps.msg}
                </MessageBox>

            </Fragment>
        )
    }
}

export default withRouter(AutoSanctionsConfig);