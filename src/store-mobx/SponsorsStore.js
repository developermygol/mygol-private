import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";

class SponsorsStore {
    @observable all = null;
    @observable loading = false;
    @observable error = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/sponsors');
    }

    getAllForOrganization = (idOrg) => {
        return () => this.actions.getAll('/sponsors/fororganization/' + idOrg);
    }

    getAllForTeam = (idTeam) => {
        return () => this.actions.getAll('/sponsors/forteam/' + idTeam);
    }

    getAllForTournament = (idTournament) => {
        return () => this.actions.getAll('/sponsors/fortournament/' + idTournament);
    }
}


export default SponsorsStore;