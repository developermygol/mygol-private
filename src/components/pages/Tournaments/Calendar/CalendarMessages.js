import React, { Component } from 'react';

class CalendarMessages extends Component {
    render() {
        const p = this.props;
        if (!p.data) return null;

        return (
            <div className='CalendarMessages'>
                <ul className='Messages'>
                    {p.data.map((msg, i) => {
                        return <li key={i} className={'CalendarMessage' + msg.type}>{msg.message}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default CalendarMessages;