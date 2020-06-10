import React from 'react';
import FlagsViewComponent from './FlagsViewComponent';

export default (props) => {
    return <FlagsViewComponent value={props.value} onChange={props.onChange} bitCaptions={[
            'PS_InvitationSent',        // 1
            '',                         // 2
            'PS_RegistrationCompleted', // 4
            'PS_IdCardUploaded',        // 8
            '',                         // 16
            '',                         // 32
            '',                         // 64
            'PS_Paid',                  // 128
            'PS_ApprovedForPlay'        // 256
        ]}
    />
}