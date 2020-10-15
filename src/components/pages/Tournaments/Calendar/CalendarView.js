import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CrudForm from '../../../common/FormsMobx/CrudForm';
import MatchDetails from '../Matches/MatchDetails';
import { withRouter } from 'react-router-dom';
import {
  getSelectOptionsFromFixedValues,
  getSelectOptionsFromTable,
} from '../../../common/FormsMobx/EditRenderHandlers';
import { getISOStringWithoutSecsAndMillisecs } from '../../../helpers/Utils';
import { goBack } from '../../../common/FormsMobx/Utils';
import { normalize } from '../../../helpers/Data';
import DayView from './DayView';
import { observable, action } from 'mobx';
import Loc, { Localize } from '../../../common/Locale/Loc';
import MessageBox from '../../../common/Dialogs/MessageBox';
import DayEditDialog from './DayEditDialog';
import EditDialog from '../Stages/EditDialog';
import { toast } from 'react-toastify';

export const getIdNameSelectOptions = array => {
  const result = array.map(item => ({ label: item.name, value: item.id }));
  result.unshift({ label: '', value: -1 });
  return result;
};

@inject('store')
@observer
class CalendarView extends Component {
  // TODO: have to load the list of playing fields and have the selectOptions for field there.

  @observable selectedStage = -1;
  @observable showDeleteCalendarConfirmation = false;
  @observable showDeletePlayDayConfirmation = false;
  @observable showAddDayDialog = false;

  getTeamsSelectOptions = teams => {
    return getSelectOptionsFromTable(teams, 'name', true, [{ value: -1, label: Localize('RESTS') }]);
  };

  getPlayDaysSelectOptions = days => {
    return getIdNameSelectOptions(days.filter(d => d.idStage === this.selectedStage));
  };

  getStageSelectOptions = stages => {
    return getIdNameSelectOptions(stages);
  };

  getGroupSelectOptions = groups => {
    return getIdNameSelectOptions(groups.filter(g => g.idStage === this.selectedStage));
  };

  stageChanged = idStage => {
    this.selectedStage = parseInt(idStage, 10);
  };

  adaptMatchFormToStore = data => {
    data.id = parseInt(data.id, 10);
    data.idDay = parseInt(data.idDay, 10);

    return data;
  };

  createSaveHandler = data => {
    data = this.adaptMatchFormToStore(data);

    return this.props.store.matches.createMatch(data).then(res => {
      if (res) goBack(this);
    });
  };

  editSaveHandler = data => {
    data = this.adaptMatchFormToStore(data);

    return this.props.store.matches.editMatch(data).then(res => {
      if (res) goBack(this);
    });
  };

  deleteCalendarHandler = () => {
    this.showDeleteCalendarConfirmation = true;
  };

  @action calendarDeletedHandler = button => {
    this.showDeleteCalendarConfirmation = false;
    if (button !== 'Delete') return;

    const p = this.props;
    const { idGroup } = p.match.params;
    if (!idGroup) return;

    p.store.groups.deleteCalendar(idGroup);
    // .then(res => {
    //     if (!res) return;
    // })
  };

  addDayHandler = () => {
    this.showAddDayDialog = true;
  };

  dayAddedHandler = day => {
    if (!day) {
      this.showAddDayDialog = false;
      return;
    }

    const p = this.props;
    const store = p.store.matches;

    if (day) {
      day.idTournament = p.match.params.idTournament;
      store.addDay(day).then(res => {
        if (!res) return;

        this.showAddDayDialog = false;
      });
    }
  };

  deleteDayHandler = (day, e) => {
    e.stopPropagation(); // To prevent collapsing the day container (click on the title bar toggles visiblity of the matches)

    if (day.matches && day.matches.length > 0) {
      toast.error(Localize('Error.PlayDayHasMatches'));
      return;
    }

    this.deleteDayDialogTarget = day;
    this.showDeletePlayDayConfirmation = true;
  };

  dayDeletedHandler = button => {
    this.showDeletePlayDayConfirmation = false;
    if (button !== 'Delete') return;

    const store = this.props.store.matches;
    store.deleteDay(this.deleteDayDialogTarget);
  };

  itemTemplateHandler = (day, actionButtonsHandler, lookups) => {
    return (
      <DayView
        key={day.id}
        value={day}
        actionButtonsHandler={actionButtonsHandler}
        canEdit={true}
        canDelete={true}
        readOnly={false}
        normalTeams={lookups.normalTeams}
        normalGroups={lookups.normalGroups}
        stage={lookups.normalStages[day.idStage]}
        onDayDelete={this.deleteDayHandler}
      />
    );
  };

  getAdditionalButtons = () => {
    const p = this.props;

    if (p.match.params.idGroup)
      return (
        <button className="Button" onClick={this.deleteCalendarHandler}>
          <Loc>Delete calendar</Loc>
        </button>
      );

    return (
      <button className="Button" onClick={this.addDayHandler}>
        <Loc>Add playday</Loc>
      </button>
    );
  };

  render() {
    const p = this.props;
    const store = p.store.matches;
    const tournament = this.props.store.tournaments.current;
    if (!tournament) return null;

    const teams = tournament.teams;
    if (!teams) return null;

    const teamsSelectOptions = this.getTeamsSelectOptions(teams);

    const stages = p.store.stages.all;
    if (!stages) return null;

    const groups = p.store.groups.all;
    if (!groups) return null;

    const lookups = {
      normalStages: normalize(stages),
      normalTeams: normalize(teams),
      normalGroups: normalize(groups),
    };

    return (
      <div>
        <CrudForm
          listBackButton={false}
          addMessage="Add new match"
          editMessage="Edit match"
          listAdditionalButtons={this.getAdditionalButtons()}
          listItemTemplate={(i, abh) => this.itemTemplateHandler(i, abh, lookups)}
          detailsComponent={MatchDetails}
          listData={p.value}
          editAction={this.editSaveHandler}
          addAction={this.createSaveHandler}
          getByIdAction={store.actions.get}
          deleteAction={store.deleteMatch}
          canDelete={true}
          routeIdParamName="idMatch"
          addData={{
            comments: '',
            status: 1,
            duration: 30,
            startTime: getISOStringWithoutSecsAndMillisecs(new Date()),
            idField: -1,
            idHomeTeam: -2,
            idVisitorTeam: -2,
            idTournament: p.match.params.idTournament,
          }}
          fieldDefinition={[
            {
              fieldName: 'startTime',
              localizedLabel: 'Match.StartTime',
              hint: 'Match.StartTime.Hint',
              editRenderType: 'datetimepicker',
              rules: 'required|string',
            },
            {
              fieldName: 'duration',
              localizedLabel: 'Match.Duration',
              hint: 'Duration.Hint',
              editRenderType: 'text',
              rules: 'integer',
            },
            {
              fieldName: 'status',
              localizedLabel: 'Match.Status',
              hint: '',
              editRenderType: 'select',
              selectOptions: getSelectOptionsFromFixedValues('MatchStatus', 1, 5),
              hideInAdd: true,
            },
            {
              fieldName: 'idStage',
              localizedLabel: 'Match.Stage',
              hint: '',
              editRenderType: 'select',
              selectOptions: this.getStageSelectOptions(stages),
              hideInEdit: true,
              rules: 'integer|required',
              onChange: this.stageChanged,
            },
            {
              fieldName: 'idGroup',
              localizedLabel: 'Match.Group',
              hint: '',
              editRenderType: 'select',
              selectOptions: this.getGroupSelectOptions(groups),
              hideInEdit: true,
              rules: 'integer|required',
            },
            {
              fieldName: 'idDay',
              localizedLabel: 'Match.PlayDay',
              hint: '',
              editRenderType: 'select',
              selectOptions: this.getPlayDaysSelectOptions(p.value),
              rules: 'integer|required',
              hideInEdit: true,
            },
            {
              fieldName: 'idField',
              localizedLabel: 'Match.Field',
              hint: '',
              editRenderType: 'facilitySelector',
              rules: '',
            },
            {
              fieldName: 'idHomeTeam',
              localizedLabel: 'Match.HomeTeam',
              hint: '',
              editRenderType: 'select',
              selectOptions: teamsSelectOptions,
            },
            {
              fieldName: 'idVisitorTeam',
              localizedLabel: 'Match.VisitorTeam',
              hint: '',
              editRenderType: 'select',
              selectOptions: teamsSelectOptions,
            },
            {
              fieldName: 'homeTeamDescription',
              localizedLabel: 'Match.HomeTeamDescription',
              hint: 'Match.HomeTeamDescription.Hint',
              editRenderType: 'text',
            },
            {
              fieldName: 'visitorTeamDescription',
              localizedLabel: 'Match.VisitorTeamDescription',
              hint: 'Match.VisitorTeamDescription.Hint',
              editRenderType: 'text',
            },
            {
              fieldName: 'videoUrl',
              localizedLabel: 'Match.VideoUrl',
              hint: 'Match.VideoUrl.Hint',
              editRenderType: 'text',
              rules: '',
            },
            {
              fieldName: 'comments',
              localizedLabel: 'Match.Comments',
              hint: 'Match.Comments.Hint',
              editRenderType: 'textarea',
              rules: '',
              hideInAdd: true,
            },
          ]}
        />
        <MessageBox
          show={this.showDeleteCalendarConfirmation}
          onClose={this.calendarDeletedHandler}
          buttons="DeleteCancel"
        >
          <p className="ModalHead">
            <Loc>{'Confirm deletion'}</Loc>
          </p>
          <p>
            <Loc>Confirm delete calendar</Loc>
          </p>
        </MessageBox>
        <MessageBox
          show={this.showDeletePlayDayConfirmation}
          onClose={this.dayDeletedHandler}
          buttons="DeleteCancel"
        >
          <p className="ModalHead">
            <Loc>{'Confirm deletion'}</Loc>
          </p>
          <p>
            <Loc>PlayDay.ConfirmDelete</Loc>
          </p>
        </MessageBox>
        <EditDialog show={this.showAddDayDialog}>
          <DayEditDialog data={{ name: '', idStage: 0 }} action={this.dayAddedHandler} />
        </EditDialog>
      </div>
    );
  }
}

export default withRouter(CalendarView);
