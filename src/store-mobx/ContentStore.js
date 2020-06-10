import { observable, action } from "mobx";
import { createCrudActions } from "./CrudActions";
import { sortArrayByTimeStampDesc } from "../components/helpers/Data";
import { getUploadRoot } from "../components/helpers/Utils";

const UploadUrlMagic = "%%%UPLOAD_URL%%%";

export const setupRawContent = (rawContent) => {
    if (!rawContent) return null;
    return rawContent.replace(UploadUrlMagic, getUploadRoot());
}

class ContentsStore {
    @observable all = [];
    @observable loading = false;
    @observable error = null;
    @observable current = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/contents', null, null, null, {
            beforeCreate: (req) => { 
                req.rawContent = req.rawContent.replace(getUploadRoot(), UploadUrlMagic);
                return req; 
            },
            beforeEdit: (req) => { 
                req.rawContent = req.rawContent.replace(getUploadRoot(), UploadUrlMagic);
                return req; 
            },
            afterGet: (req) => { 
                req.rawContent = setupRawContent(req.rawContent);
                return req; 
            },

            afterCreate: (requestData, responseData) => { return responseData; },   // Special controller: returns the full record (no rawContent) so updated timestamp can be displayed.
            afterEdit: (requestData, responseData) => { return responseData; },     // Special controller: returns the full record (no rawContent) so updated timestamp can be displayed.
            postProcessAll: (all) => { return sortArrayByTimeStampDesc(all) }
        });
    }

    @action setCurrent = (article) => {
        this.current = article;
    }
}


export default ContentsStore;