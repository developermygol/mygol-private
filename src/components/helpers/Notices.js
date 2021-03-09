import moment from 'moment';

export const playerNotAcceptedNotices = (playerMatchNotices, startTime) =>
  playerMatchNotices.filter(playerMatchNotice => {
    const { accepted, notice } = playerMatchNotice;
    const { hoursInAdvance, enabled } = notice;

    if (!enabled) return false;

    const matchTime = moment(startTime);
    const now = moment();
    const matchMaxDuration = 2; // 🔎 match max estimate duration in hours. 💥 NOT a nice solution

    const matchTimeHoursFromNow = matchTime.diff(now, 'hours');

    // 🔎 Setting 24 hours as default.
    const hours = hoursInAdvance === -1 ? 24 : hoursInAdvance;

    const timeIsInRange = matchTimeHoursFromNow > matchMaxDuration * -1 && matchTimeHoursFromNow < hours;

    if (timeIsInRange && !accepted) return true;
    return false;
  });
