import React, { Component } from 'react';
import IconButton from '../../../formFields/IconButton';
import Edit3 from 'react-feather/dist/icons/edit-3';
import Loc from '../../common/Locale/Loc';
import { getFormattedCurrency } from '../../helpers/Utils';
import { observer } from 'mobx-react';

@observer
class PaymentFees extends Component {
    render() {
        const p = this.props;
        const cbs = p.callbacks;
        let fees = p.data.organizationFees;
        if (!fees) fees = { fixedFee: 0, variableFee: 0 };

        return (
            <table className='TreeTable'>
                <tbody>
                <tr>
                    <td className='Level1'>
                        <span className='StageName'><Loc>Payment.Fee.Fixed</Loc></span>
                        <span className=''> {getFormattedCurrency(fees.fixedFee)}</span>
                    </td>
                    <td className=''>
                        <span className='StageName'><Loc>Payment.Fee.Variable</Loc></span>
                        <span className=''> {fees.variableFee + '%'}</span>
                    </td>
                    
                    <td className=''>
                        <span className='Actions'>
                            <IconButton className='Button Third' onClick={() => cbs.editFees(fees)}><Edit3 size={20} /></IconButton>
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default PaymentFees