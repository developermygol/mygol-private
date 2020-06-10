import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";
import { asyncAction } from "mobx-utils";


class FacilitiesStore {
    @observable all = null;
    @observable loading = false;
    @observable error = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/fields');
    }

    loadOrGet = asyncAction(function *() {
        if (this.all) return this.all;

        return yield this.actions.getAll();
    })
}


export default FacilitiesStore;