import React, { Component } from 'react';
import Loc, { Localize } from '../../common/Locale/Loc';
import { getFormattedDateTime } from '../../common/FormsMobx/Utils';
import { getUploadsImg, getUploadsIcon } from '../../helpers/Utils';


const PlayerPaymentSuccess = 15;
const PlayerPaymentError = 16;

const getContentForData1 = (data1, eventType) => {
    if (!data1) return null;

    switch (eventType) {
        case PlayerPaymentSuccess:
        case PlayerPaymentError:
            return <span className='Data1'><Loc>PaymentId</Loc> <a target='_blank' href={'https://dashboard.stripe.com/payments/' + data1}>{data1}</a></span>

        default:
            return null;
    }
}


class PlayerEvents extends Component {
    render() {
        const { player } = this.props;
        if (!player) return null;

        const { events } = player;


        return (
            <div className='Card Hero'>
                <h3>&nbsp;</h3>
                <div className='Content'>
                    {events ?
                        events.map(ev => {
                            const image = ev.secureUpload ? getUploadsIcon(ev.secureUpload.repositoryPath, 0, null) : null;

                            return (
                                <li key={ev.id} className='PlayerEvent'>
                                    <span className='TimeStamp'>{getFormattedDateTime(ev.timeStamp)}</span>
                                    <span className='Type'>{Localize('PlayerEventType' + ev.type)}</span>
                                    {ev.description ? <span className='Description'>({ev.description})</span> : null}
                                    {image ? <a href={image} target='_blank'>{getUploadsImg(ev.secureUpload.repositoryPath, 0, null, 'UserEventImage')}</a> : null}
                                    {getContentForData1(ev.data1, ev.type)}
                                </li>
                            )
                        })
                        :
                        <Loc>Player.NoEvents</Loc>
                    }
                </div>

            </div>
        )
    }
}

export default PlayerEvents;