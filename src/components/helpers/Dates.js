import { Localize } from "../common/Locale/Loc";



// The indices of the week days. 
// If first is monday, firstDay = 1, then Monday (index 1) is first item, Sunday (index 0) is last.
const dayIndices = [
    [0, 1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6, 0]
]

export const getWeekDayIndices = () => {
    const firstDay = Localize('first weekday') || 0;
    return dayIndices[firstDay];
}

export const getTimeFromDate = (date) => {
    return date.toLocaleTimeString();
}

export const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() 
        && date1.getMonth() === date2.getMonth() 
        && date1.getDate() === date2.getDate();
}
