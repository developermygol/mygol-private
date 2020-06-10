import React, { Component } from 'react';
import Select from 'react-select';
import { getSelectTheme } from './FacilitySelector';
import Loc, { Localize } from '../Locale/Loc';
import { CardView } from '../../pages/Sanctions/Automatic/AutoCardsTable';

const options = [
    { label: '--', value: 0 },
    { label: <CardView type={1} caption={Localize('CardType1')} />, value: 1 },
    { label: <CardView type={2} caption={Localize('CardType2')} />, value: 2 },
    { label: <CardView type={3} caption={Localize('CardType3')} />, value: 3 },
    { label: <CardView type={4} caption={Localize('CardType4')} />, value: 4 },
    { label: <CardView type={5} caption={Localize('CardType5')} />, value: 5 },
];

class ColoredCardSelector extends Component {

    adaptValue = (options, value) => {
        // eslint-disable-next-line eqeqeq
        const result = options.filter(opt => opt.value == value);
        return result && result[0];
    }

    onChange = (data) => {
        this.props.field.onChange(data.value);
        this.setState({});
    }

    render() {
        const p = this.props;
        const { field, hint } = p;

        return (
            <div className='FormField'>
                <label className='Label forText' htmlFor={field.id}>{field.label}</label>
                <small className='Hint'><Loc>{hint}</Loc></small>
                <Select value={this.adaptValue(options, field.value)} onChange={this.onChange} options={options} theme={getSelectTheme} />
                <small className='ValidationError'>{field.error}</small>
            </div>
        )
    }
}

export default ColoredCardSelector;