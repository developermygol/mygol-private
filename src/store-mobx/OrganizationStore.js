import axios from '../axios';
import { asyncAction } from 'mobx-utils';
import { observable } from 'mobx';
import { request } from './Store';
import UiStore from './UiStore';
import { createCrudActions } from './CrudActions';
import { setLang } from '../components/common/Locale/Loc';

export default class OrganizationStore {
  @observable current = null;
  @observable loading = false;
  @observable error = null;
  @observable tournamentModes = { all: null, loading: false, error: null };
  @observable categories = { all: null, loading: false, error: null };
  @observable seasons = { all: null, loading: false, error: null };

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.actions = createCrudActions(this, '/organization');
    this.seasons.actions = createCrudActions(this.seasons, '/seasons');
    this.tournamentModes.actions = createCrudActions(this.tournamentModes, '/tournamentmodes');
    this.categories.actions = createCrudActions(this.categories, '/categories');
  }

  fetch = asyncAction(function* () {
    const res = yield request(this, axios.get, null, '/organization');
    if (!res) {
      // No org is available, can't do anything. Logout.
      UiStore.auth.logout();
      return;
    }

    this.current = res;
    this.tournamentModes.all = res.modes;
    this.seasons.all = res.seasons;
    this.categories.all = res.categories;

    if (res.defaultLang) setLang(res.defaultLang);
  });

  // __ OrgWithSecrets ______________________________________________________

  getSecret = asyncAction(function* () {
    let result = yield request(this, axios.get, null, '/organization/secret');

    return result;
  });

  editSecret = asyncAction(function* (data) {
    let result = yield request(this, axios.put, 'Item updated ok', '/organization/secret', data);

    return result;
  });
}
