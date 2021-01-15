import axios from '../axios';
import { asyncAction } from 'mobx-utils';
import { request } from './Store';
import { removeByIdInArray, updateByIdInArray, sortArrayById } from '../components/helpers/Data';

const defaultOptions = {
  beforeEdit: null,
  beforeCreate: null,

  afterGet: null,
  afterGetAll: responseData => {
    return responseData;
  },
  afterCreate: (requestData, responseData) => {
    requestData.id = responseData;
    return requestData;
  }, // Response is the new Id, set it and return the updated original.
  afterEdit: (requestData, responseData) => {
    return requestData;
  }, // Response is true if edited, so we update the table with edited data from the user
  postProcessAll: all => {
    return sortArrayById(all);
  }, // By default, we sort by Id after loading
};

export const createCrudActions = (
  target,
  listUrl,
  addUrl = null,
  editUrl = null,
  removeUrl = null,
  options = defaultOptions
) => {
  addUrl = addUrl || listUrl;
  editUrl = editUrl || listUrl;
  removeUrl = removeUrl || listUrl;

  options = { ...defaultOptions, ...options }; // Merge existing with passed arguments.

  return {
    getAll: asyncAction(function* (url = null) {
      target.all = null;

      let result = yield request(target, axios.get, null, url || listUrl);

      if (options.afterGetAll) result = options.afterGetAll(result);

      target.all = result; // result is converted to observableArray here

      if (options.postProcessAll) {
        target.all = options.postProcessAll(target.all);
      }

      return result;
    }),

    get: asyncAction(function* (id, url = null) {
      const detailUrl = listUrl + '/' + id;

      let result = yield request(target, axios.get, null, url || detailUrl);

      if (options.afterGet) result = options.afterGet(result);

      if (target.all) {
        updateByIdInArray(target.all, id, result);
      } else {
        target.all = [result];
      }

      target.current = result;

      return result;
    }),

    create: asyncAction(function* (data, url = null, okMessage = null, addLocally = true) {
      if (options.beforeCreate) data = options.beforeCreate(data);

      let result = yield request(target, axios.post, okMessage || 'Item created ok', url || addUrl, data);
      if (!result) return;

      if (options.afterCreate) result = options.afterCreate(data, result);

      if (addLocally) {
        if (target.all) target.all.push(result);
        else target.all = [result];
      }

      target.current = result;

      if (options.postProcessAll) target.all = options.postProcessAll(target.all);

      return result;
    }),

    edit: asyncAction(function* (data, url = null, okMessage = null, updateLocally = true) {
      if (options.beforeEdit) data = options.beforeEdit(data);

      let result = yield request(target, axios.put, okMessage || 'Item updated ok', url || editUrl, data);

      if (!result) return;
      if (options.afterEdit) result = options.afterEdit(data, result, target);

      if (updateLocally) {
        if (target.all) updateByIdInArray(target.all, data.id, result);
        else target.all = [result];
      }

      target.current = result;

      if (options.postProcessAll) target.all = options.postProcessAll(target.all);

      return result;
    }),

    remove: asyncAction(function* (data, url = null, okMessage = null, updateLocally = true) {
      const result = yield request(
        target,
        axios.post,
        okMessage || 'Item deleted ok',
        url || removeUrl + '/delete',
        data
      );
      if (!result) return;

      if (target.all && updateLocally) {
        removeByIdInArray(target.all, data.id);
        if (options.postProcessAll) target.all = options.postProcessAll(target.all);
      }

      return result;
    }),
  };
};
