import React, { Component, Fragment } from 'react';
import PlayerPaymentOptions from './PlayerPaymentOptions';
import AccessLimit from '../../common/AccessLimit';
import PaymentConfig from '../PaymentConfig/PaymentConfig';

class PlayerPayment extends Component {
    render() {
        const p = this.props;
        const { player } = p;

        return (
            <Fragment>
                <AccessLimit allowOrgAdmin>
                    <PlayerPaymentOptions data={player.teamData} />
                    <PaymentConfig player={player} />
                </AccessLimit>
            </Fragment>
        )
    }
}

export default PlayerPayment;