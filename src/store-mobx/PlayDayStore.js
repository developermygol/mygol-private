import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";
import { asyncAction } from "mobx-utils";
import { request } from './Store';
import axios from '../axios';

export default class PlayDayStore {
    
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/playdays');
    }


    getDaysForGroup = asyncAction( function *(idGroup) {
        const result = yield request(this, axios.get, null, '/playdays/forgroup/' + idGroup);
        if (!result) return null;

        return result;
    })
}