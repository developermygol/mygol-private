import React, { Component } from 'react';
import Loc from '../../common/Locale/Loc';
import { parseJson, getFormattedCurrency } from '../../helpers/Utils';

class PlayerPaymentOptions extends Component {
    render() {
        const p = this.props;
        if (!p.data || !p.data.enrollmentData) return null;

        const optsJson = p.data.enrollmentData;
        const opts = parseJson(optsJson);
        if (!opts) return null;
        
        return (
            <div className='Card Hero'>
                <h3><Loc>Player Inscription Status</Loc></h3>
                <div className='Content'>
                    <table className='DataTable'>
                        <thead>

                        </thead>
                        <tbody>
                            {opts.map(opt => {
                                if (!opt.selectedOption) return null;

                                return (
                                    <tr key={opt.id} className='DataTableRow'>
                                        <td className='DataTableCell'>{opt.title}</td>
                                        <td className='DataTableCell'>{opt.selectedOption.title}</td>
                                        <td className='DataTableCell'>{opt.selectedOption.description}</td>
                                        <td className='DataTableCell'>{getFormattedCurrency(opt.selectedOption.price)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

export default PlayerPaymentOptions;