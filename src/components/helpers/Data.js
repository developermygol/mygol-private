export const findInNormalizedTable = (data, searchField, searchValue) => {
    for (var id in data) {
        const row = data[id];
        const fieldValue = row[searchField];
        if (fieldValue === searchValue) 
            return row;
    }

    return null;    
}

export const normalize = (dataArray) => {
    let result = {};

    dataArray.forEach(element => {
        const id = element.id;
        result[id] = element;
    });

    return result;
}


export const getIndexForId = (array, id) => {
    if (!array) return null;
    
    id = parseInt(id, 10);
    
    for (let i = 0; i < array.length; ++i) {
        const row = array[i];
        if (row && row.id === id) return i;
    }
    
    return null;
}

export const findByIdInArray = (array, id) => {
    const i = getIndexForId(array, id);
    if (i !== null) return array[i];
}

export const findBy = (array, keyField, key) => {
    for (let i = 0; i < array.length; ++i) {
        const obj = array[i];
        if (obj && obj[keyField] === key) return obj;
    }

    return null;
}

export const updateByIdInArray = (array, id, newRow) => {
    const i = getIndexForId(array, id);
    if (i !== null) array[i] = newRow;
}

export const removeByIdInArray = (array, id) => {
    const i = getIndexForId(array, id);
    if (i !== null) array.splice(i, 1);
}

// If it is a normal array, it will be sorted in place and return value will be undefined.
// If it is a mobx observableArray, sort returns a new sorted array. 
export const sortArrayById = (array) => {
    if (!array) return null;
    return array.sort((a, b) => a.id - b.id);
}

export const sortArrayByName = (array) => {
    if (!array) return null;
    return array.sort((a, b) => ('' + a.name).localeCompare(b.name));
}


export const sortArrayByTimeStamp = (array) => {
    if (!array) return null;
    return array.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
}


export const sortArrayByTimeStampDesc = (array) => {
    if (!array) return null;
    return array.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
}


export const stringToBoolean = (str) => {
    return (str === 'true');
}

export const booleanToString = (b) => {
    return b ? 'true' : 'false';
}

export const filterArrayByMultipleKeys = (array, keyField, keyValues) => 
{
    if (!array || array.length === 0) return null;

    return array.filter(
        row => {
            const key = row[keyField];
            return (key && arrayIncludes(keyValues, key));
        }
    );
}

export const extractGroupFromArray = (array, keyField, keyValues) => {
    const result = { objects: [], index: -1 };
    
    if (array && array.length > 0) {
        for (let i = array.length - 1; i >= 0; --i) {
            const obj = array[i];
            if (!obj) continue;

            const key = obj[keyField];
            if (!arrayIncludes(keyValues, key)) continue;

            result.objects.unshift(obj);
            array.splice(i, 1);

            result.index = i;  // We are moving from last to first, so this will be updated till first matched item.
        }
    }

    return result;
}

export const arrayIncludes = (array, value) => {
    for (let i = 0; i < array.length; ++i) {
        if (array[i] === value) return true;
    }

    return false;
}