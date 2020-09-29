import { observable } from 'mobx';
import { asyncAction } from 'mobx-utils';
import { Localize } from '../components/common/Locale/Loc';
import { toast } from 'react-toastify';
import { getOpErrorText } from '../components/common/FormsMobx/Utils';

import TournamentStore from './TournamentsStore';
import TeamsStore from './TeamsStore';
import PlayersStore from './PlayersStore';
import OrganizationStore from './OrganizationStore';
import TacticsStore from './TacticsStore';
import FacilitiesStore from './FacilitiesStore';
import RefereesStore from './RefereesStore';
import ContentsStore from './ContentStore';
import MatchesStore from './MatchesStore';
import UsersStore from './UsersStore';
import StagesStore from './StagesStore';
import SeasonsStore from './SeasonsStore';
import StageGroupsStore from './StageGroupsStore';
import TeamGroupsStore from './TeamGroupsStore';
import NotificationTemplatesStore from './NotificationTemplatesStore';
import SponsorsStore from './SponsorsStore';
import PaymentConfigsStore from './PaymentConfigsStore';
import NotificationStore from './NotificationStore';
import SearchStore from './SearchStore';
import PlayDayStore from './PlayDayStore';
import SanctionsStore from './SanctionsStore';
import AutoSanctionsConfigStore from './AutoSanctionsConfigStore';

export const request = asyncAction(function* (state, operation, okMessage, ...args) {
  try {
    state.loading = true;
    const res = yield operation(...args);
    state.loading = false;
    if (okMessage) toast.success(Localize(okMessage));
    return res.data;
  } catch (err) {
    state.error = err;
    state.loading = false;
    toast.error(getOpErrorText(err));
    return null;
  }
});

class EntitiesStore {
  // Global stores
  @observable organization = new OrganizationStore(this);
  @observable tournaments = new TournamentStore(this);
  @observable tactics = new TacticsStore(this);
  @observable facilities = new FacilitiesStore(this);
  @observable referees = new RefereesStore(this);
  @observable contents = new ContentsStore(this);
  @observable users = new UsersStore(this);
  @observable notificationTemplates = new NotificationTemplatesStore(this);
  @observable notifications = new NotificationStore(this);
  @observable sponsors = new SponsorsStore(this);
  @observable paymentConfigs = new PaymentConfigsStore(this);
  @observable search = new SearchStore(this);
  @observable playdays = new PlayDayStore(this);
  @observable sanctions = new SanctionsStore(this);
  @observable autosanctions = new AutoSanctionsConfigStore(this);

  // Tournament stores
  @observable teams = new TeamsStore(this);
  @observable stages = new StagesStore(this);
  @observable seasons = new SeasonsStore(this);
  @observable groups = new StageGroupsStore(this);
  @observable teamGroups = new TeamGroupsStore(this);
  @observable players = new PlayersStore(this);
  @observable matches = new MatchesStore(this);
}

export default new EntitiesStore();
