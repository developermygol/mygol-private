import React, { Component } from 'react';
import Loc from '../../common/Locale/Loc';
import axios from '../../../axios';


export const downloadFile = (targetUrl, fileName) => {
    axios.get(targetUrl, {responseType: 'blob'})
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        });
}


class OrgReports extends Component {
    render() {
        return (
            <div className='CardContainer'>
                <div className='Card Hero'>
                    <h3><Loc>Reports.Players</Loc></h3>
                    <div className='Content'>
                        <button className='Button' onClick={() => {
                            downloadFile('/reports/insurance', 'insurance.csv');
                        }} ><Loc>Report.Insurance</Loc></button>
                        <button className='Button' onClick={() => {
                            downloadFile('/reports/allplayers', 'allplayers.csv');
                        }} ><Loc>Report.AllPlayers</Loc></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrgReports;