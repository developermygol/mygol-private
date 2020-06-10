import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default async () => {
    await PropTypes;
    await createReactClass; 

    window.PropTypes = PropTypes;
    window.createReactClass = createReactClass;
    window['CKEDITOR_BASEPATH'] = process.env.PUBLIC_URL + "/alloy-editor/";
    window['ALLOYEDITOR_BASEPATH'] = process.env.PUBLIC_URL + "/alloy-editor/";

    const AlloyEditor = require('alloyeditor');

    return AlloyEditor;
};

