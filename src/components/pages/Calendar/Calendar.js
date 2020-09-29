import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Slider from '../../shared/Slider/Slider';
import CalendarDayPiker from './CalendarDayPicker';
import CalendarFilter from './CalendarFilter';
import CalendarMatches from './CalendarMatches';
import Loc from '../../common/Locale/Loc';

import './Calendar.css';

@inject('store', 'ui')
@observer
class Calendar extends Component {
  state = {
    numberOfMonths: 1,
    filterByDay: true,
    startDate: null,
    endDate: null,
    isLoading: false,
    currentTournaments: null,
    currentTeams: null,
    selectedSeason: null,
    selectedTournament: null,
    selectedTeam: null,
    selectedStatus: null,
    selectedField: null,
    selectedReferee: null,
    filteredTeams: null,
    fileredMatches: null,
  };

  componentDidMount = async () => {
    const store = this.props.store;
    // Getters
    store.seasons.all = await store.seasons.actions.getAll();
    store.tournaments.all = await store.tournaments.actions.getAll();
    store.teams.all = await store.teams.actions.getAll();
    store.facilities.all = await store.facilities.actions.getAll();
    store.referees.all = await store.referees.actions.getAll();
    // store.matches.getPlayDays
    // 🚧🚧🚧

    this.setState({
      currentTournaments: store.tournaments.all,
      currentTeams: store.teams.all,
    });
  };

  handleMonthRangeTogggle = () =>
    this.state.numberOfMonths === 1
      ? this.setState({ numberOfMonths: 2 })
      : this.setState({ numberOfMonths: 1 });

  handleFilterBydayToggle = () => this.setState(state => ({ filterByDay: !state.filterByDay }));

  handleSelectedDays = ({ from, to }) => this.setState({ startDate: from, endDate: to });

  handleSelectChange = async (data, name) => {
    const store = this.props.store;
    const defaultSelection = data.value === 0;
    const finalSelectedValue = defaultSelection ? null : data.value;

    switch (name) {
      case 'seasons':
        this.setState({ isLoading: true });
        let filteredTournaments = store.tournaments.all;
        let filteredTeams = this.state.currentTeams;

        if (!defaultSelection) {
          filteredTournaments = store.tournaments.all.filter(t => (t.idSeason = data.value));
          const filteredTournamentsIds = filteredTournaments.map(t => t.id);
          filteredTeams = await store.teams.getTeamsFilteredByTournaments({
            tournamnetsIds: filteredTournamentsIds,
          });
        }

        return this.setState({
          selectedSeason: finalSelectedValue,
          currentTournaments: filteredTournaments,
          currentTeams: filteredTeams,
          isLoading: false,
        });

      case 'tournaments':
        this.setState({ isLoading: true });
        let filteredTeamsByTournament = this.state.filteredTeams;

        if (!defaultSelection)
          filteredTeamsByTournament = await store.teams.getTeamsFilteredByTournament(data.value);
        else filteredTeamsByTournament = store.teams.all;

        return this.setState({
          selectedTournament: finalSelectedValue,
          currentTeams: filteredTeamsByTournament,
          isLoading: false,
        });

      case 'teams':
        return this.setState({ selectedTeam: finalSelectedValue });

      case 'status':
        return this.setState({ selectedStatus: finalSelectedValue });

      case 'fields':
        return this.setState({ selectedField: finalSelectedValue });

      case 'referees':
        return this.setState({ selectedReferee: finalSelectedValue });

      default:
        return;
    }
  };

  handleOptionsReformat = (data, defaultValue) => {
    if (!data) return;

    const options = data.map(el => ({ value: el.id, label: el.name }));
    if (defaultValue) return [defaultValue, ...options];
    return options;
  };

  handleOnSubmit = async () => {
    const store = this.props.store;
    const {
      selectedSeason,
      selectedTournament,
      selectedTeam,
      selectedStatus,
      selectedField,
      selectedReferee,
      filterByDay,
      startDate,
      endDate,
    } = this.state;
    const response = await store.matches.getFilteredMatches({
      idSeason: selectedSeason,
      idTournament: selectedTournament,
      idTeam: selectedTeam,
      status: selectedStatus,
      idField: selectedField,
      idReferee: selectedReferee,
      useDates: filterByDay,
      startDate,
      endDate,
    });
    this.setState({ fileredMatches: response });
  };

  render() {
    const isSimpleMonth = this.state.numberOfMonths === 1;
    const store = this.props.store;

    const seasonsDefault = { value: 0, label: <Loc>GlobalCalendar.AllSeasons</Loc> };
    const tournamentsDefault = { value: 0, label: <Loc>GlobalCalendar.AllTournaments</Loc> };
    const teamsDefault = { value: 0, label: <Loc>GlobalCalendar.All</Loc> };
    const fieldsDefault = { value: 0, label: <Loc>GlobalCalendar.All</Loc> };
    const refereesDefault = { value: 0, label: <Loc>GlobalCalendar.All</Loc> };

    return (
      <div className="CalndarScreen">
        <h2>
          <Loc>GlobalCalendar</Loc>
        </h2>
        <p className="ListHint">
          <Loc>GlobalCalendar.Hint</Loc>
        </p>
        <div className="Row">
          <div className="Left">
            <Slider
              onChange={this.handleFilterBydayToggle}
              checked={this.state.filterByDay}
              label={<Loc>GlobalCalendar.Day</Loc>}
            />
            <div className="GlobalCalendarWrapper">
              <CalendarDayPiker
                numberOfMonths={this.state.numberOfMonths}
                onChange={this.handleSelectedDays}
                locale={this.props.ui.lang}
              />
              <button className="Button Second" onClick={this.handleMonthRangeTogggle}>
                <Loc>{isSimpleMonth ? 'GlobalCalendar.DayMode1' : 'GlobalCalendar.DayMode2'}</Loc>
              </button>
            </div>
          </div>
          <div className="Rigth">
            <CalendarFilter
              name="seasons"
              label={<Loc>GlobalCalendar.Season</Loc>}
              defaultValue={seasonsDefault}
              options={this.handleOptionsReformat(store.seasons.all, seasonsDefault)}
              onChange={this.handleSelectChange}
              isLoading={this.state.isLoading}
            />
            <CalendarFilter
              name="tournaments"
              label={<Loc>GlobalCalendar.Tournament</Loc>}
              defaultValue={tournamentsDefault}
              options={this.handleOptionsReformat(this.state.currentTournaments, tournamentsDefault)}
              onChange={this.handleSelectChange}
              isLoading={this.state.isLoading}
            />
            <CalendarFilter
              name="teams"
              label={<Loc>TeamName</Loc>}
              defaultValue={teamsDefault}
              options={this.handleOptionsReformat(this.state.currentTeams, teamsDefault)}
              onChange={this.handleSelectChange}
              isLoading={this.state.isLoading}
            />
            <CalendarFilter
              name="status"
              label={<Loc>Stage.Status</Loc>}
              defaultValue={matchStatus[0]}
              options={matchStatus}
              onChange={this.handleSelectChange}
              isLoading={this.state.isLoading}
            />
            <CalendarFilter
              name="fields"
              label={<Loc>Field</Loc>}
              defaultValue={fieldsDefault}
              options={this.handleOptionsReformat(store.facilities.all, fieldsDefault)}
              onChange={this.handleSelectChange}
              isLoading={this.state.isLoading}
            />
            <CalendarFilter
              name="referees"
              label={<Loc>GlobalCalendar.Referee</Loc>}
              defaultValue={refereesDefault}
              options={this.handleOptionsReformat(store.referees.all, refereesDefault)}
              onChange={this.handleSelectChange}
              isLoading={this.state.isLoading}
            />
            <button className="Button Right SpinnerButtonIdle" onClick={this.handleOnSubmit}>
              <Loc>GlobalCalendar.Filter</Loc>
            </button>
          </div>
        </div>
        <CalendarMatches matches={this.state.fileredMatches} />
      </div>
    );
  }
}

export default Calendar;

const matchStatus = [
  { value: 0, label: <Loc>GlobalCalendar.All</Loc> },
  { value: 1, label: <Loc>MatchStatus1</Loc> },
  { value: 2, label: <Loc>MatchStatus2</Loc> },
  { value: 3, label: <Loc>MatchStatus3</Loc> },
  { value: 4, label: <Loc>MatchStatus4</Loc> },
  { value: 5, label: <Loc>MatchStatus5</Loc> },
  { value: 6, label: <Loc>MatchStatus6</Loc> },
  { value: 8, label: <Loc>MatchStatus8</Loc> },
  { value: 10, label: <Loc>MatchStatus10</Loc> },
];
