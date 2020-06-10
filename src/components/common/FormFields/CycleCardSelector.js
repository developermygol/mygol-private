import React, { Component } from 'react';
import Loc, { Localize } from '../Locale/Loc';
import { CardView } from '../../pages/Sanctions/Automatic/AutoCardsTable';

const InputWithLabel = ( { numCards, onChange, caption, selectedValue } ) => {
    const getCards = numCards => {
        const result = [];
        for (let i = 0; i < numCards; ++i) result.push(<CardView type={1} key={i} />);
        return result;
    }

    return (
        <label className='CardRadioLabel'>
            <input type='radio' className='Radio' value={numCards} onChange={e => onChange(numCards)} checked={numCards === selectedValue} />
            {getCards(numCards)}
            {Localize(caption)}
        </label>
    )
}


class CycleCardSelector extends Component {
    onChange = (v) => {
        this.props.field.onChange(v);
        this.setState({});
    }

    render() {
        const p = this.props;
        const { field, hint } = p;
        const val = parseInt(field.value, 10);

        return (
            <div className='FormField'>
                <label className='Label forText' htmlFor={field.id}>{field.label}</label>
                <small className='Hint'><Loc>{hint}</Loc></small>
                <div className='Horizontal'>
                    <InputWithLabel numCards={0} onChange={this.onChange} caption={'Sanctions.Cycle.YellowCards.None'} selectedValue={val} />
                    <InputWithLabel numCards={1} onChange={this.onChange} caption={'Sanctions.Cycle.YellowCards.One'} selectedValue={val} />
                    <InputWithLabel numCards={2} onChange={this.onChange} caption={'Sanctions.Cycle.YellowCards.Two'} selectedValue={val} />
                </div>
                <small className='ValidationError'>{field.error}</small>
            </div>
        )
    }
}

export default CycleCardSelector;