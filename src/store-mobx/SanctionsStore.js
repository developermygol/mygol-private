import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";
import axios from '../axios';
import { updateByIdInArray, removeByIdInArray } from "../components/helpers/Data";
import { requestAsync } from "../components/helpers/Utils";

export default class SanctionsStore {

    @observable current = null;
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/sanctions', null, null, null, {
            postProcessAll: null,
            afterCreate: (req, res) => {
                return res;
            }, 
            afterEdit: (req, res) => {
                return res;
            }
        });
    }

    getAllForTournament = (idTournament) => {
        return this.actions.getAll('/sanctions/fortournament/' + idTournament);
    }

    getAllForTeam = (idTeam, idTournament) => {
        return this.actions.getAll('/sanctions/forteam/' + idTeam + '/' + idTournament);
    }

    getAllForMatch = (idMatch) => {
        return this.actions.getAll('/sanctions/formatch/' + idMatch);
    }

    getAllForPlayer = (idPlayer) => {
        return this.actions.getAll('/sanctions/forplayer/' + idPlayer);
    }


    addAllegation = (allegation) => {
        if (!this.current) return;

        allegation.idSanction = this.current.id;
        return requestAsync(this, axios.post, 'Sanctions.Allegation.CreatedOk', '/sanctionallegations', allegation)
            .then(res => {
                if (this.current.allegations) {
                    this.current.allegations.push(res);
                }
                else {
                    this.current.allegations = observable([ res ]);
                }
        
                return res;                        
            });
    }

    editAllegation = (allegation) => {
        return requestAsync(this, axios.put, 'Sanctions.Allegation.UpdatedOk', '/sanctionallegations', allegation)
            .then(res => {
                if (this.current && this.current.allegations) {
                    updateByIdInArray(this.current.allegations, allegation.id, res);
                }

                return res;
            });
    }

    removeAllegation = (allegation) => {
        return requestAsync(this, axios.post, 'Sanctions.Allegation.RemovedOk', '/sanctionallegations/delete', allegation)
            .then(res => {
                if (!res) return;

                if (this.current && this.current.allegations) {
                    removeByIdInArray(this.current.allegations, allegation.id);
                }
            })
    }
}