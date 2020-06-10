import { staticServer } from '../axios';
import { asyncAction } from 'mobx-utils';
import { observable } from 'mobx';
import { request } from './Store';


export default class TacticsStore {

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable data = null;
    @observable loading = false;
    @observable error = null;

    fetchOnce = asyncAction(function *() {
        if (this.data) return;

        this.data = yield request(this, staticServer.get, null, '/tactics/tactics.es.json');
    })
}
