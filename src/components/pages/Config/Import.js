import React, { Component } from 'react';
import axios from '../../../axios';
import { requestAsync } from '../../helpers/Utils';


class Import extends Component {
    render() {
        return (
            <div className='CardContainer'>
                <div className='Card'>
                    <h3>Importar jugadores</h3>
                    <div className='Content'>
                        <p className='P'>Descargar plantilla (.CSV)</p>
                        <p className='P'>Subir CSV con jugadores</p>
                        <button disabled className='Button' onClick={() => {
                            requestAsync(null, axios.post, 'OK', '/import/players', { uploadedFile: 'dave/test/uploaded.txt' });
                        }} >Test import API</button>
                    </div>
                </div>

                <div className='Card'>
                    <h3>Importar calendarios</h3>
                    <div className='Content'>
                        <p className='P'>Descargar plantilla (.CSV)</p>
                        <p className='P'>Subir CSV con calendario</p>
                        <button disabled className='Button' onClick={() => {

                        }} >Test import API</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Import;