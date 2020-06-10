import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { Localize } from '../../common/Locale/Loc';
import { textLookup, formattedDateTime } from '../../common/FormsMobx/ListRenderHandlers';
import { getSelectOptionsFromFixedValues } from '../../common/FormsMobx/EditRenderHandlers';
import { setupRawContent } from '../../../store-mobx/ContentStore';
import { action } from 'mobx';


@inject('store') @observer
class Content extends Component {

    editPreprocess = (data) => {
        data.rawContent = setupRawContent(data.rawContent);
        return data;
    }

    @action uploadSuccessHandler = (article, uploadData) => {
        if (article && uploadData)
        { 
            article.mainImgUploadId = uploadData.id;
        }
    }

    render() {
        const target = this.props.store.contents;
        const ac = target.actions;

        return (
            <div className=''>
                <div className='Question'>
                    <p>Esta lista es temporal, será reemplazada por la interfaz de gestión de la rejilla de noticias.</p>
                </div>
                <CrudForm 
                    title='Content management'
                    addMessage='Add new article'
                    editMessage=''

                    routeIdParamName='idArticle'                    

                    getAllAction={ac.getAll}
                    editAction={ac.edit}
                    addAction={ac.create}
                    deleteAction={ac.remove}
                    getByIdAction={ac.get}
                    beforeEdit={this.editPreprocess}

                    listData={target.all ? target.all.slice() : null}
                    loadingStatus={target.loading}

                    addData={{
                        title: Localize('Article.DefaultTitle'),
                        subTitle: Localize('Article.DefaultSubtitle'),
                        rawContent: Localize('Article.DefaultBody'), 
                        status: 1,
                        priority: 3,
                        idCategory: 3,
                        timeStamp: null,
                        mainImgUploadId: 0
                    }}

                    fieldDefinition={[
                        { fieldName: 'mainImgUrl', localizedLabel: 'Article.MainImage', hideInList: true, editRenderType: 'upload', passProps: { uploadType: 500, idField: 'id', onUploadSuccess: this.uploadSuccessHandler, className: 'Large' } },
                        { fieldName: 'title', localizedLabel: 'Article.Title', editRenderType: 'text', rules: 'required|string|between:0,500', hint: 'Hint.Required' },
                        { fieldName: 'subTitle', localizedLabel: 'Article.Subtitle', hideInList: true, editRenderType: 'text', rules: 'string|between:0,1000', hint: 'Article.Subtitle.Hint' },
                        { fieldName: 'status', localizedLabel: 'Article.Status', listRenderHandler: textLookup('ArticleStatus', 'status'), editRenderType: 'radio', selectOptions: getSelectOptionsFromFixedValues('ArticleStatus', 1, 2), passProps: {additionalClass: 'Horizontal'} },
                        // { fieldName: 'priority', localizedLabel: 'Article.Priority', listRenderHandler: textLookup('ArticlePriority', 'priority'), editRenderType: 'select', selectOptions: getSelectOptionsFromFixedValues('ArticlePriority', 1, 3) },
                        { fieldName: 'idCategory', localizedLabel: 'Article.Category', listRenderHandler:  textLookup('ArticleSection', 'idCategory'), editRenderType: 'select', selectOptions: getSelectOptionsFromFixedValues('ArticleSection', 1, 4) },
                        { fieldName: 'timeStamp', localizedLabel: 'LastEditionTime', listRenderHandler: formattedDateTime('timeStamp'), canEdit: false },
                        //{ fieldName: 'keywords', localizedLabel: 'Article.Keywords', hideInList: true, editRenderType: 'text', hint: 'Article.Keywords.Hint' },
                        { fieldName: 'videoUrl', localizedLabel: 'Article.Video', hideInList: true, editRenderType: 'text', rules: '', hint: 'Article.Video.Hint' },
                        { fieldName: 'rawContent', localizedLabel: 'Article.Content', visibleInList: false, editRenderType: 'content', hint: 'Article.Content.Hint' },
                        
                        { fieldName: 'layoutType', localizedLabel: 'Article.Layout', hideInList: true, editRenderType: 'text', rules: '', hint: 'Article.Layout.Hint' },
                        { fieldName: 'mainImgUploadId', hideInList: true, hideInEdit: true, hideInAdd: true, editRenderType: 'text', localizedLabel: 'uploadId' }
                    ]}
                />
            </div>
        )
    }
}

export default Content;