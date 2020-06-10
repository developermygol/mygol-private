import axios from '../axios'
import { asyncAction } from 'mobx-utils';
import { observable, action } from 'mobx';
import { request } from './Store';
import { Levels } from '../components/common/AccessLimit';
import { parseJson, getInt } from '../components/helpers/Utils';


const serialize = (data) => {
    if (!data) return '';

    return JSON.stringify(data);
}

const deserialize = (json) => {
    if (!json || json === '') return null;

    return parseJson(json);
}



const initAxios = () => {
    const authToken = localStorage.getItem('auth.token'); 
    if (!authToken) return;

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
}

const clearAxios = () => {
    axios.defaults.headers.common['Authorization'] = null;
}

const saveAuthData = (authData) => {
    localStorage['auth.idUser'] = authData.id;
    localStorage['auth.token'] = authData.token;
    localStorage['auth.name'] = authData.name;
    localStorage['auth.email'] = authData.email;
    localStorage['auth.level'] = authData.level;
    localStorage['auth.avatarImgUrl'] = authData.avatarImgUrl;
    localStorage['auth.adminTeamIds'] = serialize(authData.adminTeamIds);

    initAxios();
}

const clearAuthData  = () => {
    localStorage.removeItem('auth.idUser');
    localStorage.removeItem('auth.token');
    localStorage.removeItem('auth.name');
    localStorage.removeItem('auth.email');
    localStorage.removeItem('auth.level');
    localStorage.removeItem('auth.avatarImgUrl');
    localStorage.removeItem('auth.adminTeamIds');

    clearAxios();
}

class AuthStore {
    @observable idUser = localStorage['auth.idUser'];
    @observable token = localStorage['auth.token'];
    @observable email = localStorage['auth.email'];
    @observable name = localStorage['auth.name'];
    @observable level = this.getLevelFromStorage();
    @observable avatarImgUrl = localStorage['auth.avatarImgUrl'];
    @observable adminTeamIds = deserialize(localStorage['auth.adminTeamIds']);
    @observable idPlayer = -1;
    @observable returnUrl = null;
    @observable error = null;
    @observable loading = false;

    getLevelFromStorage = () => {
        let result = localStorage['auth.level'];
        if (result) result = getInt(result);

        // Fix old userLevel = 3 for team admins. Now they are players, level 1
        if (result === 3) {
            result = 1;
            localStorage['auth.level'] = 1;
        }

        return result;
    }

    login = asyncAction(function *(formLoginDetails) {
        try {
            const res = yield request(this, axios.post, null, '/users/login', formLoginDetails);
            const authData = res;
            saveAuthData(authData);

            this.idUser = authData.id;
            this.token = authData.token;
            this.email = authData.email;
            this.name = authData.name;
            this.level = authData.level;
            this.avatarImgUrl = authData.avatarImgUrl;
            this.adminTeamIds = authData.adminTeamIds;
            this.returnUrl = null;
            this.error = null;
        } catch (err) {
            this.error = err;
        }
    })

    activate = asyncAction(function *(activationData, activationTokenParams) {
        this.logout();
        const data = { userData: activationData };
        const res = yield request(this, axios.post, null, '/users/activate' + activationTokenParams, data);

        return res;
    })

    resetPassword = asyncAction(function *(email) {
        this.logout();
        const res = yield request(this, axios.get, null, '/users/resetpassword?e=' + encodeURI(email));

        return res;
    })

    @action logout() {
        this.idUser = null;
        this.token = null;
        this.email = null;
        this.name = null;
        this.level = null;
        this.avatarImgUrl = null;
        this.returnUrl = null;
        this.error = null;

        clearAuthData();
    }

    @action init() {
        initAxios();
    }

    @action redirect(target) {
        this.returnUrl = target;
    }


    isOrgAdmin = () => {
        // eslint-disable-next-line eqeqeq
        return this.level == Levels.OrgAdmin;
    }
}

export default AuthStore;