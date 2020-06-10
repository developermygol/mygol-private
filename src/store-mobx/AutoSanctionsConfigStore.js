import { observable } from "mobx";
import { asyncAction } from "../../node_modules/mobx-utils";
import axios from '../axios';
import { requestAsync, parseJson } from "../components/helpers/Utils";


export default class AutoSanctionsConfigStore {
    
    @observable current = null;
    @observable loading = false;
    @observable error = null;
    @observable parsed = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    getForTournament = (idTournament) => {
        return this.getSpecific('/autosanctions/fortournament/' + idTournament, idTournament)
    }

    getSpecific = asyncAction(function *(url, idTournament) {
        this.current = null;
        const result = yield requestAsync(this, axios.get, null, url);
        this.current = result;

        if (result) {
            this.parsed = parseJson(result.config);
            this.current.idTournament = idTournament;
        }
        else {
            this.current = { idTournament };
            this.parsed = {
                cards: [],
                cycles: []
            }
        }

        return this.current;
    })

    insertOrUpdate = asyncAction(function *() {
        if (!this.current) return;

        this.current.config = JSON.stringify(this.parsed);
        yield requestAsync(this, axios.post, 'Sanctions.AutoConfigSavedOk', '/autosanctions/insertorupdate', this.current);
    })
}
