import { findByIdInArray } from '../../helpers/Data';
import { Localize } from '../Locale/Loc';
import { getFormattedDate, getFormattedDateTime } from './Utils';

// __ Render handlers _________________________________________________________

// This is the basic value getter: returns a value from inside nested objects. No array support.
export const getNestedValue = (target, propName) => {
  if (typeof target === 'undefined') return false;

  const i = propName.indexOf('.');
  if (i > -1) {
    return getNestedValue(target[propName.substring(0, i)], propName.substr(i + 1));
  }

  if (!target) return null;

  return target[propName];
};

export function setNestedValue(target, propName, value) {
  var i = propName.indexOf('.');

  if (i > -1) {
    const targetProp = propName.substring(0, i);
    const nextProp = propName.substr(i + 1);

    if (typeof target[targetProp] === 'undefined') target[targetProp] = {};

    setNestedValue(target[targetProp], nextProp, value);
    return;
  }

  target[propName] = value;
}

export const textLookup = (localizationBase, dataField) => {
  return selectedRow => {
    const value = getNestedValue(selectedRow, dataField);
    return Localize(localizationBase + value);
  };
};

export const arrayLookup = (dataTable, dataField, labelField) => {
  return selectedRow => {
    const value = getNestedValue(selectedRow, dataField);
    return dataTable[value][labelField];
  };
};

export const lookupById = (dataTable, idField, labelField) => {
  return selectedRow => {
    if (!dataTable) return;
    const id = selectedRow[idField];
    const lookupRow = findByIdInArray(dataTable, id);
    if (!lookupRow) return null;

    return lookupRow[labelField];
  };
};

export const booleanRenderHandler = dataField => {
  return selectedRow => {
    const value = selectedRow[dataField];
    return value === 'true' ? Localize('Yes') : Localize('No');
  };
};

export const formattedDate = dateField => {
  return selectedRow => {
    return getFormattedDate(selectedRow[dateField]);
  };
};

export const formattedDateTime = dateField => {
  return selectedRow => {
    return getFormattedDateTime(selectedRow[dateField]);
  };
};
