import React, { Component } from 'react';

const defaultProps = {
    data: [ { c: 'Item1' }, { c: 'Item2'} ],
    renderer: i => <li>{i.c}</li>
}

class Grid extends Component {
    render() {
        const p = this.props;
        const { data, renderer } = p;
        if (!data || data.length === 0 || !renderer) return null;

        return (
            <div className={p.className + ' Grid'}>
                {data.map(
                    item => (
                        <div key={item.id} className='GridItem'>
                            {renderer(item)}
                        </div>
                    )
                )}
            </div>
        )
    }
}

Grid.defaultProps = defaultProps;

export default Grid;