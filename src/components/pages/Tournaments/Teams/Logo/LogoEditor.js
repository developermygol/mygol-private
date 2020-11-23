import React, { Component, Fragment } from 'react';
import Logo1 from './Templates/Logo1';
import Logo2 from './Templates/Logo2';
import Loc, { Localize } from '../../../../common/Locale/Loc';
import BackButton from '../../../../common/BackButton';
import ColorPicker from '../../../../../formFields/ColorPicker';
import Text from '../../../../common/FormFields/Text';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import axios from '../../../../../axios';
import { withRouter } from 'react-router-dom';
import InfoBox from '../../../../common/InfoBox';


//Edge Blob polyfill https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var canvas = this;
            setTimeout(function () {
                var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback(new Blob([arr], { type: type || 'image/png' }));
            });
        }
    });
}

function upload(blob, idObject) {

    const f = new FormData();
    f.append("ImageFileField", blob, "file.png");
    f.append("type", 100);
    f.append("idobject", idObject);
    
    return axios.post('/upload', f, {
        headers: { "X-Requested-With": "XMLHttpRequest" }
    });
}


@inject('store')
export default withRouter(class LogoEditor extends Component {

    refContainer = {
        target: null
    }

    state = {
        selectedLogo: null
    }

    convertLogoToImg = (svg, idObject) => {
        if (!svg) return;

        const self = this;

        const width = 250;
        const height = 250;

        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        let data = new XMLSerializer().serializeToString(svg);
        data = encodeURIComponent(data);

        const img = new Image();

        img.onload = function () {
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function (blob) {
                upload(blob, idObject)
                    .then(res => {
                        const { teams } = self.props.store;
                        
                        if (!res.data) {
                            toast.error(Localize('Error.NoData'));
                            return;
                        }

                        const { repositoryPath } = res.data;
                        teams.current.logoImgUrl = repositoryPath;
                        teams.actions.edit(teams.current);
                        toast.success(Localize('Upload.OK'));
                        self.props.history.goBack();
                    })
                    .catch(err => {
                        toast.error(Localize('Upload.Error'));
                    });
            });
        }

        img.src = "data:image/svg+xml," + data
    }



    saveHandler = () => {
        const team = this.props.store.teams.current;
        this.convertLogoToImg(this.refContainer.target, team.id);
    }

    setLogo = (logoClass) => {
        this.setState({ selectedLogo: logoClass });
    }

    render = () => {
        return (
            <Fragment>
                <h3>LogoEditor</h3>
                <div className='Question'>Hay que añadir más plantillas de logotipos.</div>

                <div className='EditorContent'>
                    <LogoTemplateChooser onChange={(v) => this.setLogo(v)} />
                    <EditableSvgViewer logo={this.state.selectedLogo} refContainer={this.refContainer} />
                </div>

                <div className='BottomActions'>
                    <BackButton />
                    <button className='Button Active' onClick={this.saveHandler}><Loc>Save</Loc></button>
                </div>
            </Fragment>
        )
    }
})


class LogoTemplateChooser extends Component {

    availableLogos = [
        Logo1,
        Logo2
    ]

    clickHandler(selectedComponent) {
        this.props.onChange(selectedComponent);
    }

    render() {
        return (
            <div className='Templates'>
                {this.availableLogos.map((logo, i) => {
                    const component = { logo: logo };   // To instantiate a component with <>, a dot is needed.
                    return (
                        <div className='MiniLogo' key={i}>
                            <component.logo refContainer={{}} passProps={{ onClick: () => this.clickHandler(logo) }} />
                        </div>
                    )
                })}
            </div>
        )
    }
}


export class EditableSvgViewer extends Component {

    // Need a way to send updated props to the caller. 

    controlChanged = (component, key, value) => {
        component.props[key].value = value;
        if (this.props.onChange) this.props.onChange(component.props);
        this.setState({});  // Force render
    }

    getControlFields = (editableSvg, initialValues) => {
        const fs = initialValues || editableSvg.props;

        return (
            <Fragment>
                {Object.keys(fs).map((key, i) => {
                    const val = fs[key];
                    if (!val) return null;
                    
                    switch (val.type) {
                        case 'color':
                            return <ColorPicker
                                key={i}
                                label={Localize(val.caption)}
                                onChange={(value) => this.controlChanged(editableSvg, key, value.hex)}
                                value={val.value} />
                        case 'text':
                            return <Text
                                key={i}
                                field={{
                                    label: val.caption,
                                    bind: () => {
                                        return {
                                            onChange: (el) => this.controlChanged(editableSvg, key, el.target.value),
                                            value: val.value
                                        }
                                    }
                                }}
                            />
                        default: return null;
                    }
                })}
            </Fragment>
        );
    }

    render() {
        if (!this.props.logo) return <InfoBox><Loc>Logo.NoLogoSelected</Loc></InfoBox>;

        const logo = <this.props.logo {...this.props.data} refContainer={this.props.refContainer} />;

        return (
            <Fragment>
                <div className='Editor'>
                    <div className='Logo'>
                        {logo}
                    </div>

                    <div className='Controls'>
                        {this.getControlFields(logo)}
                    </div>
                </div>
            </Fragment>
        )
    }
}

