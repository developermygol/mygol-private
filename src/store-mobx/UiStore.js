import { observable, action } from "mobx";
import AuthStore from "./AuthStore";


class UiStore {
    @observable lang = "es";
    @observable auth = new AuthStore();


    @action setLang(lang) {
        this.lang = lang;
    }
}

export default new UiStore();
