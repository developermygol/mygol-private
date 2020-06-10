import axios from '../axios'
import { asyncAction } from 'mobx-utils';
import { observable, computed } from 'mobx';
import { request } from './Store';
import { createCrudActions } from './CrudActions';
import { findByIdInArray, sortArrayById, booleanToString } from '../components/helpers/Data';
import { toast } from 'react-toastify';
import { getOpErrorText } from '../components/common/FormsMobx/Utils';


export default class TournamentStore {
    @observable current = null;
    @observable all = null;
    @observable loading = false;
    @observable error = null;
    @observable calendar = null;

    rootStore = null;

    @computed get teamSize() {
        if (!this.current) return null;
        
        const org = this.rootStore.organization.current;
        if (!org) return null;

        const modes = org.modes;
        const t = findByIdInArray(modes, this.current.idTournamentMode);

        return t ? t.numPlayers : null;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/tournaments', null, null, null, {
            afterGet: this.adaptTournament,
            afterGetAll: tournaments => { return sortArrayById(tournaments && tournaments.map(this.adaptTournament)); }

        });
    }

    adaptTournament = (tournament) => {
         // Needed for mobx react forms. See Issue #3
         tournament.visible = booleanToString(tournament.visible);
         return tournament;
    }

    setCurrent = asyncAction( function *(id) {
        try {
            this.current = null; // Prevent anyone using previous tournament data until new is loaded.
            const result = yield this.getSingle(id);
            this.current = result;
            
            // set tournament related stores to new
            const rs = this.rootStore;
            
            rs.teams.all = result.teams;            
            rs.teams.setCurrentWhenLoaded();
            rs.stages.all = result.stages;
            rs.groups.all = result.groups;
            rs.teamGroups.all= result.teamGroups;

            // Clear the rest
            rs.players.all = null;
            rs.matches.all = null;
        
        } catch (err) {

        }
    })

    getSingle = asyncAction( function *(id) {
        return yield request(this, axios.get, null, '/tournaments/' + id);
    })

    getCalendar = asyncAction( function *(id) {
        try 
        {
            this.loading = true;
            const result = yield axios.get('/matches/fortournament/' + id);
            this.loading = false;
            return result;
        } catch (err) {
            toast.error(getOpErrorText(err));
            this.loading = false;
            return null;
        }
    })
}
