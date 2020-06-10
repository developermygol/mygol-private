import { observable } from "mobx";
import { asyncAction } from "../../node_modules/mobx-utils";
import { requestAsync } from "../components/helpers/Utils";
import axios from '../axios';


export default class NotificationStore {
    
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    notifyUser = asyncAction(function *(idUser, title, message) {
        const result = yield requestAsync(this, axios.post, 'Notification.QueuedOk', '/notifications/notifyuser', { id: idUser, title, message});
        return result;
    })

    notifyTeam = asyncAction(function *(idTeam, title, message) {
        const result = yield requestAsync(this, axios.post, 'Notification.QueuedOk', '/notifications/notifyteam', { id: idTeam, title, message});
        return result;
    })

    notifyTournament = asyncAction(function *(idTournament, title, message) {
        const result = yield requestAsync(this, axios.post, 'Notification.QueuedOk', '/notifications/notifytournament', { id: idTournament, title, message});
        return result;
    })

    notifyOrganization = asyncAction(function *(title, message) {
        const result = yield requestAsync(this, axios.post, 'Notification.QueuedOk', '/notifications/notifyorganization', { title, message});
        return result;
    })

}