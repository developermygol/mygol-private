import { Localize, LocalizeOrDefault, LocalizeI } from "../Locale/Loc";
import dateFormat from 'dateformat';
import { BROWSER_APPLIES_TZOFFSET } from "../../helpers/Utils";

export const getFieldLabel = (f) => f.label || Localize(f.localizedLabel) || '';
export const getFieldHint = (f) => f.hint || Localize(f.localizedHint) || '';

export const redirect = (componentWithRouter, to) => componentWithRouter.props.history.push(to);
export const replaceRoute = (componentWithRouter, to) => componentWithRouter.props.history.replace(to);
export const goBack = (componentWithRouter) => componentWithRouter.props.history.goBack();

export const setOpError = (component, error) => {
    

    component.setState( { 
        ...component.state, 
        status: 'error', 
        errorMessage: getOpErrorText(error)
    });
}

export const getOpErrorText = (error) => {
    let msg = null;
    
    if (error.response) {
        // The request was made and the server returned an error
        const { status } = error.response;

        if (status >= 200 && status <= 400) 
            msg = LocalizeOrDefault(error.response.data)
        else if (status > 400 && status < 500) 
            msg = Localize("Error.404")
        else 
            msg = Localize("Error.Generic");
    } 
    else if (error.request) {
        // Request is made but there is no response
        msg = Localize('Error.NoResponse')
    } 
    else {
        // This is an error setting up the request
        msg = error.message;
    }

    return msg;
}

export const setOpStatus = (component, status) => component.setState({...component.state, status: status, errorMessage: null});


export const getFormattedDate = (date) => {
    if (BROWSER_APPLIES_TZOFFSET)
        return dateFormat(date, Localize('shortDateFormat'), true);
    else
        return dateFormat(date, Localize('shortDateFormat'));
}

export const getFormattedDateTime = (dateTime) => {
    if (BROWSER_APPLIES_TZOFFSET)
        return dateFormat(dateTime, Localize('dateTimeFormat'), true);
    else 
        return dateFormat(dateTime, Localize('dateTimeFormat'));
}

export const getFormattedTime = (time) => {
    if (BROWSER_APPLIES_TZOFFSET)
        return dateFormat(time, Localize('timeFormat'), true);
    else
        return dateFormat(time, Localize('timeFormat'));
}

export const getLongFormattedDate = (date) => {
    return LocalizeI('LongFormattedDate', date.getDate(), Localize('months')[date.getMonth()], date.getFullYear());
}

export const removeTimeFromDate = (date) => {
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    return date;
}