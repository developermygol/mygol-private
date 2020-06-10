import { observable } from "mobx";
import { requestAsync } from "../components/helpers/Utils";
import axios from '../axios';
import { asyncAction } from "mobx-utils";

class SearchStore {
    @observable all = null;
    @observable loading = false;
    @observable error = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    search = asyncAction( function *(query) {
        this.all = null;

        const res = yield requestAsync(this, axios.get, null, '/search?query=' + encodeURI(query));
        if (!res) return null;

        this.all = res;
    })
}


export default SearchStore;