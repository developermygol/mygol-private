import React from 'react';
import AlloyEditor from './AlloyEditorLoader';
import axios from '../../../axios';
import { toast } from 'react-toastify';
import { getOpErrorText } from '../FormsMobx/Utils';
import { observable } from 'mobx';
import { Localize } from '../Locale/Loc';
import { getUploadUrl } from '../../helpers/Utils';


class AlloyEditorComponent extends React.Component {

    @observable uploading = false;

    handleImageAdded = (event) => {
        const { file, el } = event.data;

        const f = new FormData();
        f.append("file", file, file.name);
        f.append("type", 500);          // Org Content
        f.append("idobject", -2);       // May not have an object id yet
        //f.append("createThumbnails", "1");
        
        this.uploading = true;

        axios.post('/upload', f, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
        }).then( res => {
            el.$.src = getUploadUrl(res.data);
            toast.success(Localize('Content.ImageUploadedOk'))
            this.handleChange();
            this.uploading = false;
        }).catch(err => {
            toast.error(getOpErrorText(err));
            this.handleChange();
            this.uploading = false;
        });
    }

    handleChange = () => {
        const data = this.nativeEditor.getData();
        this.props.onChange(data);
    }

    componentDidMount() {
        const p = this.props;

        AlloyEditor()
            .then((alloyeditor) => {
                this.editor = alloyeditor.editable(p.container, p.alloyEditorConfig);
                this.nativeEditor = this.editor.get('nativeEditor');
                this.nativeEditor.on('blur', this.handleChange);
                this.nativeEditor.on('change', this.handleChange);
                this.nativeEditor.setData(p.value);
                this.nativeEditor.on('imageAdd', this.handleImageAdded);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    componentWillUnmount() {
        if (this.editor) this.editor.destroy();
    }

    render() {
        return (
            <div
                className='RichEditor'
                id={this.props.container}
            >

            </div>
        );
    }
}

export default AlloyEditorComponent;