import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";


class RefereesStore {
    @observable all = null;
    @observable loading = false;
    @observable error = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/referees');
    }
}


export default RefereesStore;