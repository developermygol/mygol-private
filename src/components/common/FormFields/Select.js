import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react';
import Loc, { Localize } from '../Locale/Loc';

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    })).isRequired
}

const defaultProps = {

}

@observer
class SelectComponent extends Component {

    handleChange = (event, value) => {
        const v = event.target.value;
        const p = this.props;
        p.field.onChange(v);
        if (p.onChange) p.onChange(v);

        this.triggerOnSelected(v);
    };

    triggerOnSelected = (value) => {
        const opts = this.props.options;
        for (let i = 0; i < opts.length; ++i) {
            const opt = opts[i];
            // eslint-disable-next-line eqeqeq
            if (opt && opt.onSelected && opt.value == value) {
                opt.onSelected(value);
                return;
            }
        }
    }

    render() {
        const p = this.props;

        return (
            <div className='FormField'>
                {p.field.label ? <label className='Label'>{p.field.label}</label> : null}
                <small className='Hint'><Loc>{p.hint}</Loc></small>
                <select
                    className='Select'
                    onChange={this.handleChange}
                    value={p.field.value}>
                    {p.options.map(v => (
                        <option
                            key={v.value}
                            value={v.value}
                            className={v.className} >
                            {p.passProps.localize ? Localize(v.label) : v.label}
                        </option>
                    ))}
                </select>
                <small className='ValidationError'>{p.field.error}</small>
            </div>
        )
    }
}

SelectComponent.propTypes = propTypes
SelectComponent.defaultProps = defaultProps

export default SelectComponent;