import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import Loc from '../../common/Locale/Loc';
import IconButton from '../../../formFields/IconButton';
import XCircle from 'react-feather/dist/icons/x-circle';
import Edit3 from 'react-feather/dist/icons/edit-3';
import { getFormattedCurrency } from '../../helpers/Utils';


@observer
class PaymentsTable extends Component {
    render() {
        const p = this.props;
        const { data } = p;
        const { steps } = data;
        const cbs = p.callbacks;

        return (
            <Fragment>
                <button className='Button Second' onClick={cbs.addStep}><Loc>Payment.AddStep</Loc></button>
                <table className='DataTable'>
                    <thead>
                        <tr className='DataTableHeaderRow'>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>Title</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>Description</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>Price</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {steps ? steps.map(step => <PaymentStep 
                                                key={step.id + ' ' + step.title}
                                                step={step} 
                                                {...p}
                                            />)
                        : null }
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

@observer
class PaymentStep extends Component {
    render() {
        const p = this.props;
        const { step } = p;
        const { options } = step;

        return (
            <Fragment>
                <StepRow 
                    step={step} 
                    edit={p.edit}
                    {...p}
                />
                { options && options.map(option => <PaymentStepOption
                                                key={option.id} 
                                                option={option}
                                                edit={true}
                                                {...p}
                                            />)}
            </Fragment>
        )
    }
}

@observer
class StepRow extends Component {
    render() {
        const p = this.props;
        const { step } = p;
        const cbs = p.callbacks;

        return (
            <tr className='DataTableRow'>
                <td className='DataTableCell Level1'><span className='StageName'>{step.title}</span></td>
                <td className='DataTableCell'><span className='StageDescription'>{step.description}</span></td>
                <td className='DataTableCell'><span className=''></span></td>
                <td className='DataTableCell'>
                    <div className='ListActionButtons'>
                        <button className='Button Third' onClick={() => cbs.addOption(step)}><Loc>Payment.AddOption</Loc></button>
                        <IconButton className='Button Third' onClick={() => cbs.editStep(step)}><Edit3 size={20} /></IconButton>
                        <IconButton className='Button Third' onClick={() => cbs.deleteStep(step)}><XCircle size={20} /></IconButton>
                    </div>
                </td>
            </tr>
        )
    }
}

@observer
class PaymentStepOption extends Component {
    render() {
        const p = this.props;
        const cbs = p.callbacks;
        const { option } = p;

        return (
            <tr>
                <td className='DataTableCell Level2'><span className='GroupName'>{option.title}</span></td>
                <td className='DataTableCell'><span className=''>{option.description}</span></td>
                <td className='DataTableCell Currency'><span className=''>{getFormattedCurrency(option.price)}</span></td>
                <td className='DataTableCell'>
                    <div className='ListActionButtons'>
                    
                        <IconButton className='Button Third' onClick={() => cbs.editOption(option, p.step)}><Edit3 size={20} /></IconButton>
                        <IconButton className='Button Third' onClick={() => cbs.deleteOption(option, p.step)}><XCircle size={20} /></IconButton>
                    
                    </div>
                </td>
            </tr>
        )
    }
}


export default PaymentsTable