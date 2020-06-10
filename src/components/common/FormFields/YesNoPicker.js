import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import Loc from '../Locale/Loc';

@observer
class YesNoPicker extends Component {
    
    @observable value = this.adaptValue(this.props.value);
    
    adaptValue = (v) => {
        if (v === 'true') return true;
        if (v === 'false') return false;

        return v;
    }

    @action onClick = (v, e) => {
        e.preventDefault();
        this.value = v;
        const p = this.props;
        if (p.onChange) p.onChange(v);
    }
    
    render() {
        return (
            <div className='YesNoPicker'>
                <button className={'No ' + (!this.value ? 'Active' : '' ) } onClick={e => this.onClick(false, e)}><Loc>No</Loc></button>
                <button className={'Yes ' + (this.value ? 'Active' : '' ) } onClick={e => this.onClick(true, e)}><Loc>Yes</Loc></button>
            </div>
        )
    }
}

export default YesNoPicker;