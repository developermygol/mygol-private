import React, { Component } from 'react';
import Loc, { Localize } from '../../../common/Locale/Loc';
import PlayerInviteStep1 from './PlayerInviteStep1';
import PlayerInviteStep2 from './PlayerInviteStep2';
import PlayerInviteStep3 from './PlayerInviteStep3';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import WizardStepsComponent from '../../../common/WizardStepsComponent';

@observer
class PlayerInvite extends Component {

    @observable wizardState = {
        searchResult: null, 
        selectedItem: null, 
        inviteText: Localize('Invite.DefaultInviteText'),
        confirmed: false
    }

    finishHandler = () => {
        this.props.onFinish(toJS(this.wizardState));
    }

    render() {
        return (
            <WizardStepsComponent 
                preventEnterSubmission={true}
                nextButtonText={'Next'}
                backButtonText={'Previous'}
                finalButtonText={'Send invite'}
                nextButtonClassName='Button Active PullRight'
                backButtonClassName='Button PullLeft'
                finalButtonClassName='Button Active PullRight'
                extraButtons={[ <button key={1} onClick={this.props.onCancel} className='Button PullRight'><Loc>Cancel</Loc></button> ]}
                onFinalButtonClick={this.finishHandler}
                
                steps={[
                    { title: 'Invite.SelectPlayer', component: <PlayerInviteStep1 state={this.wizardState} />, validate: () => { if (this.wizardState.selectedItem) return true; else return Localize('Invite.Error.MustSelectPlayer'); }  },
                    { title: 'Invite.InviteText', component: <PlayerInviteStep2 state={this.wizardState}/>, validate: null },
                    { title: 'Invite.Confirmation', component: <PlayerInviteStep3 state={this.wizardState}/>, validate: null }
                ]}
                onStepChange={this.handleStepChange}
            />
        )
    }
}

PlayerInvite.defaultProps = {
    onFinish: () => {},
    onCancel: () => {},
}

export default PlayerInvite;