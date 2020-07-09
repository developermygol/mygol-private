import { Localize } from '../Locale/Loc';

// __ Select options __________________________________________________________

export const getSelectOptionsFromFixedValues = (
  localizationBase,
  startIndex,
  endIndex,
  topAdditionalValues = null,
  classNameBase = null,
  excludeIndex = null
) => {
  let result = [];

  for (let i = startIndex; i <= endIndex; ++i)
    result.push({
      value: i,
      label: Localize(localizationBase + i),
      className: classNameBase && classNameBase + i,
    });

  if (excludeIndex) result = result.filter(el => !excludeIndex.includes(el.value));

  if (topAdditionalValues) result = [...topAdditionalValues, ...result];

  return result;
};

export const getSelectOptionsFromTable = (
  dataTable,
  labelField,
  wantsEmptyRow = false,
  topAdditionalValues = null
) => {
  if (!dataTable) return [];
  let result = dataTable.map(row => ({ value: row.id, label: row[labelField] }));

  if (topAdditionalValues) result = [...topAdditionalValues, ...result];

  if (wantsEmptyRow) result = [{ value: null, label: '' }, ...result];

  return result;
};
