import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";
import { asyncAction } from "../../node_modules/mobx-utils";
import axios from '../axios';
import { requestAsync } from "../components/helpers/Utils";


export default class PaymentConfigsStore {
    
    @observable current = null;
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/paymentconfigs');
    }

    getForUser = (idUser, idTeam, idTournament) => {
        return this.getSpecific('/paymentconfigs/foruser/' + idTeam + '/' + idTournament + '/' + idUser );
    }

    getForTeam = (idTeam, idTournament) => {
        return this.getSpecific('/paymentconfigs/forteam/' + idTeam + '/' + idTournament);
    }

    getForTournament = (idTournament) => {
        return this.getSpecific('/paymentconfigs/fortournament/' + idTournament);
    }

    getForOrganization = () => {
        return this.getSpecific('/paymentconfigs/fororganization');
    }

    // getAny = (idTeam, idTournament) => {
    //     return this.getSpecific('/paymentconfigs/forany/' + idTeam + '/' + idTournament);
    // }

    getSpecific = asyncAction(function *(url) {
        this.current = null;
        try {
            const result = yield requestAsync(this, axios.get, null, url);
            this.current = result;
            return result;
        }
        catch (err) {
            
        }
    })
}