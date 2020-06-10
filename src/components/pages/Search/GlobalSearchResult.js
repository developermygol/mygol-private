import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import Loc from '../../common/Locale/Loc';
import Spinner from '../../common/Spinner/Spinner';
import { getUploadsImg, getPlayerIdPicture } from '../../helpers/Utils';


class ResultCard extends Component {
    render() {
        const p = this.props;
        const { img, title, to, line1, line2, className } = p;

        return (
            <div className={'Result ' + (className || '')}>
                <div className='Image'>
                    <Link to={to}>{img}</Link>
                </div>
                <div className='Info'>
                    <p className=''><Link to={to}>{title}</Link></p>
                    <p className='Line1'>{line1}</p>
                    <p className='Line2'>{line2}</p>
                </div>
            </div>
        )
    }
}

class ResultGroup extends Component {
    render() {
        const p = this.props;
        const { data } = p;
        if (!data || data.length === 0) return null;

        return (
            <Fragment>
                <h2><Loc>{p.title}</Loc></h2>
                {data.length === 20 ? <small className='Hint'><Loc>Search.MaxResults</Loc></small> : null }
                <div className='ResultSet'>
                    {data.map(row => {
                        return <div key={row.id}>{p.renderer(row)}</div>
                    })}
                </div>
                
            </Fragment>
        )
    }
}


@inject('store') @observer
class GlobalSearchResult extends Component {
    componentDidMount = () => {
        const p = this.props;
        const query = p.match.params.query; 
        if (!query) return;

        const store = p.store.search;
        if (!store.all) store.search(query);
    }

    renderPlayer = (player) => {
        return (
            <ResultCard title={player.name + ' ' + player.surname} to={'/players/' + player.id} className='Player' line1={player.userData && player.userData.email} img={getPlayerIdPicture(player.idPhotoImgUrl)} />
        )
    }

    renderTeam = (t) => {
        const tnmt = t.tournaments && t.tournaments[0];
        return <ResultCard title={t.name} to={'/tournaments/' + (tnmt && tnmt.id) + '/teams/' + t.id} img={getUploadsImg(t.logoImgUrl, t.id, 'team')} line1={tnmt && tnmt.name} />
    }
    renderTournament = (t) => <ResultCard title={t.name} to={'/tournaments/' + t.id} img={getUploadsImg(t.logoImgUrl, t.id, 'tournament')} />
    renderField = (t) => <ResultCard title={t.name} to={'/facilities/edit/' + t.id} img={getUploadsImg(t.imgUrl, t.id, 'field')} />
    renderReferee = (t) => <ResultCard title={t.name} className='Player' to={'/referees/edit/' + t.id} img={getUploadsImg(t.avatarImgUrl, t.id, 'user')} />
    
    render() {
        const p = this.props;
        const store = p.store.search;
        const results = store.all;

        return (
            <Spinner loading={store.loading}>
                { results ? 
                <div className='GlobalSearchResult'>
                    <div className='Query'>
                        <p><Loc>Search.Query</Loc>: {p.match.params.query}</p>
                    </div>
                    <div className='Results'>
                        <ResultGroup data={results.players} title='Players' renderer={this.renderPlayer} />
                        <ResultGroup data={results.teams} title='Teams' renderer={this.renderTeam} />
                        <ResultGroup data={results.tournaments} title='Tournaments' renderer={this.renderTournament} />
                        <ResultGroup data={results.fields} title='Fields' renderer={this.renderField} />
                        <ResultGroup data={results.referees} title='Referees' renderer={this.renderReferee} />
                    </div>
                </div>
                : null }
            </Spinner>
        )
    }
}

export default withRouter(GlobalSearchResult);