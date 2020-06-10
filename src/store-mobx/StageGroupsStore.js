import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";
import { asyncAction } from "mobx-utils";
import { request } from './Store';
import axios from '../axios';
import { findByIdInArray } from "../components/helpers/Data";
import { hasCalendarFlagMask } from "../components/pages/Tournaments/Stages/Calendar/GroupCalendar";

export default class StageGroupsStore {
    
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/groups');
    }

    deleteCalendar = asyncAction(function *(idGroup) {
        const result = yield request(this, axios.post, "Calendar deleted", '/groups/deletecalendar/' + idGroup);
        if (!result) return null;

        const group = findByIdInArray(this.all, idGroup);
        if (group) group.flags &= ~hasCalendarFlagMask;

        this.rootStore.matches.all = null;

        return true;
    })
}