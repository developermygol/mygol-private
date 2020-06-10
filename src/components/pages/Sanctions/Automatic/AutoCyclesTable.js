import React, { Component, Fragment } from 'react';
import XCircle from 'react-feather/dist/icons/x-circle';
import Edit3 from 'react-feather/dist/icons/edit-3';
import IconButton from '../../../../formFields/IconButton';
import Loc, { LocalizeI } from '../../../common/Locale/Loc';
import { PenaltyView, CardView } from './AutoCardsTable';



const CycleCards = ( { numYellowCards } ) => {    
    var cards = [];
    const cardsToDraw = (numYellowCards < 8) ? numYellowCards : 8;
    for (let i = 0; i < cardsToDraw; ++i) cards.push(<CardView key={i} type={1} />);
    
    return (
        <Fragment>
            {cards} {LocalizeI('Sanctions.Cycles.NumYellowCards.ListRender', numYellowCards) }
        </Fragment>
    )
}


const AutoCycle = ( { cycle, callbacks } ) => {
    if (!cycle) return null;

    return (
        <tr className='DataTableRow'>
            <td className='DataTableCell'>{cycle.name}</td>
            <td className='DataTableCell'><CycleCards numYellowCards={cycle.numYellowCards} /></td>
            <td className='DataTableCell'><PenaltyView penalty={cycle.penalty} /></td>
            <td className='DataTableCell'>
                <div className='ListActionButtons'>
                    <IconButton className='Button Third' onClick={() => callbacks.editCycleConfig(cycle)}><Edit3 size={20} /></IconButton>
                    <IconButton className='Button Third' onClick={() => callbacks.deleteCycleConfig(cycle)}><XCircle size={20} /></IconButton>
                </div>
            </td>
        </tr>
    )
}


class AutoCyclesTable extends Component {
    render() {
        const p = this.props;
        const { cycles } = p;
        const cbs = p.callbacks;

        return (
            <div className=''>
                <button className='Button Second' onClick={cbs.addCycleConfig}><Loc>Sanctions.Cycles.Add</Loc></button>
                <table className='DataTable'>
                    <thead>
                        <tr className='DataTableHeaderRow'>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>Sanctions.Cycles.Name</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>Sanctions.Cycles.NumYellowCards</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>Sanctions.Cards.Penalty</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles ? cycles.map(cycle => <AutoCycle 
                                                key={cycle.id}
                                                cycle={cycle} 
                                                {...p}
                                            />)
                        : null }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AutoCyclesTable;