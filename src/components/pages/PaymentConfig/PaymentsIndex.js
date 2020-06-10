import React, { Component } from 'react';
import PaymentConfig from '../PaymentConfig/PaymentConfig';
import Loc from '../../common/Locale/Loc';

class PaymentsIndex extends Component {
    render() {
        return (
            <div>
                <h2><Loc>Payments</Loc></h2>
                <PaymentConfig />
            </div>
        )
    }
}

export default PaymentsIndex;