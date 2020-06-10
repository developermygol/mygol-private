import React, { Component, Fragment } from 'react';
import XCircle from 'react-feather/dist/icons/x-circle';
import Edit3 from 'react-feather/dist/icons/edit-3';
import IconButton from '../../../../formFields/IconButton';
import Loc, { Localize, LocalizeI } from '../../../common/Locale/Loc';


export const PenaltyView = ( { penalty } ) => {
    if (!penalty) return Localize('Sanctions.Penalty.None');

    const type1 = parseInt(penalty.type1, 10);
    const type2 = parseInt(penalty.type2, 10);

    const type1Sanction = (type1 > 0) ? <CardView type={type1} caption={Localize('CardType' + type1)} /> : null;
    const type2Sanction = (type2 > 0) ? LocalizeI('Sanctions.Penalty.Matches', type2) : null;

    if (type1Sanction && type2Sanction) return <Fragment>{type1Sanction} <Loc>And</Loc> {type2Sanction}</Fragment>;

    return <Fragment>{type1Sanction} {type2Sanction}</Fragment>;
}

export const CardView = ( { type, caption, color } ) => {
    return (
        <Fragment>
            <span className={'CardView CC CardType' + type} style={ color && { backgroundColor: color } }></span>
            {caption ? 
                <span className='CardView Caption'>{caption}</span>
                : null
            }
        </Fragment>
    )
}

export const CardComboView = ( { type1, type2 } ) => {
    return (
        <div className='CardCombo'>
            <CardView type={type1} />
            {   // eslint-disable-next-line eqeqeq
                type2 != 0 ? 
                    <Fragment> + <CardView type={type2} /></Fragment> 
                    : null
            }
        </div>
    )
}

class AutoCardCombo extends Component {
 
    render() {
        const p = this.props;
        const { card } = p;
        const cbs = p.callbacks;

        if (!card) return null;

        return (
            <tr className='DataTableRow'>
                <td className='DataTableCell'><CardComboView type1={card.card1Type} type2={card.card2Type} /></td>
                <td className='DataTableCell'><PenaltyView penalty={card.penalty} /></td>
                <td className='DataTableCell'>
                    <div className='ListActionButtons'>
                        <IconButton className='Button Third' onClick={() => cbs.editCardConfig(card)}><Edit3 size={20} /></IconButton>
                        <IconButton className='Button Third' onClick={() => cbs.deleteCardConfig(card)}><XCircle size={20} /></IconButton>
                    </div>
                </td>
            </tr>
        )
    }
}


class AutoCardsTable extends Component {
    render() {
        const p = this.props;
        const { cards } = p;
        const cbs = p.callbacks;

        return (
            <div className=''>
                <button className='Button Second' onClick={cbs.addCardConfig}><Loc>Sanctions.Cards.AddCombo</Loc></button>
                <table className='DataTable'>
                    <thead>
                        <tr className='DataTableHeaderRow'>
                            <th className='DataTableHeaderCell DataTableCell Center'><Loc>Sanctions.Cards.Combo</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>Sanctions.Cards.Penalty</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards ? cards.map(card => <AutoCardCombo 
                                                key={card.id}
                                                card={card} 
                                                {...p}
                                            />)
                        : null }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AutoCardsTable;