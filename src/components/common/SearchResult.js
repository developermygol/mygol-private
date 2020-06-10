import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Loc from './Locale/Loc';
import { getPlayerIdPicture } from '../helpers/Utils';




const PlayerSearchResult = ({ item, onClick, selected }) => {
    return (
        <tr>
            <td>{getPlayerIdPicture(item.idPhotoImgUrl, 'PlayerAvatar Mini')}</td>
            <td className={selected ? 'Selected' : ''}>
                <span onClick={() => { if (onClick) onClick(item) } }>{item.name + ' ' + item.surname}</span>
            </td>
        </tr>
    )
}


const defaultProps = {
    itemTemplate: PlayerSearchResult, 
    onItemSelected: null, 
    data: null
}

@observer
class SearchResult extends Component {

    @observable selectedItem = null;

    clickHandler = (data) => {
        this.selectedItem = data;
        this.props.onItemSelected(data);
    }

    render() {
        const p = this.props;
        if (!p.data) return null;
        if (p.data.length === 0) return <p className='EmptySearch'><Loc>Search.NoResults</Loc></p>
        
        const s = this.selectedItem;        

        return (
            <div className='SearchResults'>
                <table>
                    <tbody>
                        {p.data.map(item => {
                            return <this.props.itemTemplate key={item.id} item={item} onClick={this.clickHandler} selected={(s && s.id === item.id)} />
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}



SearchResult.defaultProps = defaultProps;

export default SearchResult;