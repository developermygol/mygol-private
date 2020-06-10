import React, { Component } from 'react';
import TacticViewer from './TacticViewer';
import Loc from '../../../../common/Locale/Loc';
import InfoBox from '../../../../common/InfoBox';


export default class TacticSelector extends Component {

    render() {
        const { data } = this.props;
        if (!data) return null;

        if (data.length === 0) return <InfoBox><Loc>Tactic.NoForNumPlayers</Loc></InfoBox>

        return (
            <div className='TacticSelector'>
                {data.map((t, i) => {
                    return (
                        <div key={i} className={'TacticThumbnail' + (t.id === this.props.value ? ' Active' : '')}>
                            <TacticViewer positions={t.positions} onClick={() => this.props.onChange(t)} />
                            <p className='TacticName'>{t.name}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}