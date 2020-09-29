import { observable } from 'mobx';
import { createCrudActions } from './CrudActions';

export default class SeasonsStore {
  @observable loading = false;
  @observable error = null;
  @observable all = null;

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.actions = createCrudActions(this, '/seasons');
  }

  // setActive = asyncAction(function *(stage) {

  // })
}
