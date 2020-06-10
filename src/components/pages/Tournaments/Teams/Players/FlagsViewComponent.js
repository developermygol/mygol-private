import React, { Component } from 'react';
import { Localize, LocalizeOrDefault } from '../../../../common/Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';


function getFlag(value, index) {
    const mask = 1 << index;
    return (value & mask) !== 0;
}

const defaultProps = {
    value: 0,
    bitCaptions: [],
    trueClass: 'FlagTrue',
    falseClass: 'FlagFalse', 
    onChange: null,
}

@observer
export default class FlagsViewComponent extends Component {

    @observable value = this.props.value;

    toggleValue = (index) => {
        if (!this.props.onChange) return;
        
        let mask = 1 << index;
        let val = this.value;
        const maskedVal = val & mask;

        if (maskedVal > 0) 
            val = val & ~mask;      // Invert the mask to apply an and operation and set the bit to 0
        else
            val |= mask;            // Set the index to 1

        const res = this.props.onChange(val);
        if (res === 'NoUpdate') return;

        this.value = val;
    }

    getFlags = () => {
        const p = this.props;
        const result = [];
        const numFlags = p.bitCaptions.length;

        const yesText = Localize('Yes');
        const noText = Localize('No');
        const editable = (p.onChange !== null);

        for (let i = 0; i < numFlags; ++i) {
            const flag = getFlag(this.value, i);
            const flagClass = flag ? p.trueClass : p.falseClass;
            const flagText = flag ? yesText : noText;
            const caption = p.bitCaptions[i];
            if (!caption) continue;

            result.push(
                <li key={i} className='Flag'>
                    <span className={'FlagCaption ' + flagClass + (editable ? ' Editable' : '')} style={editable ? {cursor: 'pointer'} : null} onClick={editable ? _ => this.toggleValue(i): null}>{LocalizeOrDefault(caption)}</span> 
                    <span className={'FlagValue ' + flagClass} >{flagText}</span>
                </li>
            );
        }

        return result;
    }    

    render() {
        return (
            <ul className='Flags'>
                {this.getFlags()}
            </ul>
        )
    }
}

FlagsViewComponent.defaultProps = defaultProps;