import React from 'react';

export default p => (
    p.status === 'busy' || p.loading ?
        <div className={'Spinner' + (p.mini ? ' Mini' : '')}></div>
        : p.children
)

