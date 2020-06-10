import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";


export default class NotificationTemplatesStore {
    
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/notificationtemplates');
    }
}