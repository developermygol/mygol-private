import React, { Component } from 'react';
import Loc, { Localize } from '../Locale/Loc';
import BackButton from '../BackButton';
import InfoBox from '../InfoBox';
import { withRouter } from 'react-router-dom';

import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

import { setNestedValue } from './ListRenderHandlers';

import Text from '../FormFields/Text';
import UploadComponent from '../FormFields/Upload';
import SelectComponent from '../FormFields/Select';
import RadioComponent from '../FormFields/Radio';
import DatePickerComponent from '../FormFields/DatePicker';
import ContentField from '../FormFields/ContentField';
import Separator from '../FormFields/Separator';
import TeamPlayerStatus from '../FormFields/TeamPlayerStatus';
import TextArea from '../FormFields/TextArea';
import Spinner from '../Spinner/Spinner';
import ReadOnlyText from '../FormFields/ReadOnlyText';
import ErrorBox from '../ErrorBox';
import SpinnerButton from '../SpinnerButton';
import FacilitySelector from '../FormFields/FacilitySelector';
import Time from '../FormFields/Time';
import DateTimePicker from '../FormFields/DateTimePicker';
import ForbiddenDays from '../FormFields/ForbiddenDays';
import ClassificationCriteria from '../FormFields/ClassificationCriteria';
import BooleanComponent from '../FormFields/BooleanComponent';
import ColoredCardSelector from '../FormFields/ColoredCardSelector';
import CycleCardSelector from '../FormFields/CycleCardSelector';
import GoalkeeperSelector from '../FormFields/GoalkeeperSelector';
import { extractGroupFromArray } from '../../helpers/Data';

const defaultProps = {
  title: null,
  fieldDefinition: null,

  editMessage: null,
  addMessage: null,

  isEditing: false,

  saveButtonHandler: null,
  backButton: true,
  onBackClick: null,
  data: null,
};

function getFieldsHierarchy(fields, targetField, isEditing, transformCallback = null) {
  const result = {};

  fields.forEach(f => {
    if (isEditing) {
      if (f.hideInEdit) return;
    } else {
      if (f.hideInAdd) return;
    }

    let value = f[targetField];
    if (transformCallback) value = transformCallback(value);

    setNestedValue(result, f.fieldName, value);
  });

  return result;
}

function getFieldNames(fields, isEditing) {
  const result = [];

  fields.forEach(f => {
    if (isEditing) {
      if (f.hideInEdit) return;
    } else {
      if (f.hideInAdd) return;
    }

    result.push(f.fieldName);
  });

  return result;
}

@inject('ui')
@observer
class Edit extends Component {
  form = null;

  @observable errorSummary = [];
  @observable loading = false;
  @observable error = null;
  @observable ready = false;
  @observable data = null;

  componentDidMount = () => {
    this.loadData();
  };

  @action createForm = values => {
    validatorjs.useLang(this.props.ui.lang);

    const hooks = {
      onSuccess: form => this.onSubmit(form),
      onError: form => this.onError(form),
    };

    const plugins = { dvr: validatorjs };

    const isEdit = this.isEditing();
    const fd = this.props.fieldDefinition;
    const fields = getFieldNames(fd, isEdit);
    const labels = getFieldsHierarchy(fd, 'localizedLabel', isEdit, v => Localize(v));
    const rules = getFieldsHierarchy(fd, 'rules', isEdit);
    //const inputConverters = getFieldsHierarchy(fd, 'inputConverter', isEdit);
    //const outputConverters = getFieldsHierarchy(fd, 'outputConverter', isEdit);

    this.form = new MobxReactForm(
      {
        fields,
        labels,
        values,
        rules,
        //input: inputConverters,
        //output: outputConverters
      },
      { plugins, hooks }
    );

    this.data = values;
    this.ready = true;
    this.setState({});
  };

  @action loadData = () => {
    const p = this.props;

    if (p.data) {
      this.createForm(p.data);
      return;
    }

    if (!p.getByIdAction || !p.routeIdParamName) {
      this.error = Localize('No data to edit');
      this.ready = true;
      return;
    }

    const id = p.match.params[p.routeIdParamName];
    p.getByIdAction(id).then(res => {
      this.createForm(res);
    });
  };

  isEditing = () => this.props.isEditing;

  onSubmit = form => {
    const values = form.values();
    // console.log(values);
    // if (values.startTime) values.startTime = new Date(values.startTime).toISOString();
    // console.log(values);
    this.props.saveButtonHandler(values);
  };

  @action onError = form => {
    const errs = form.errors();
    this.errorSummary.clear();

    Object.keys(errs).forEach((k, i) => {
      const val = errs[k];
      if (typeof val === 'string') {
        this.errorSummary.push(val);
      }
    });

    this.setState({});
  };

  getValue = fieldName => {
    const entity = this.data;

    return entity ? entity[fieldName] : '';
  };

  getField = f => {
    if (!f.editRenderType) return null;

    if (f.hideInEdit && this.isEditing()) return null;
    if (f.hideInAdd && !this.isEditing()) return null;

    const control = { target: null };
    const args = {
      options: null,
      hint: f.hint,
      onChange: f.onChange,
      passProps: {
        ...f.passProps,
        localize: false,
      },
    };

    switch (f.editRenderType) {
      case 'radio':
        if (!f.selectOptions) return null;
        control.target = RadioComponent;
        args.options = f.selectOptions;
        break;
      case 'localizedradio':
        control.target = RadioComponent;
        args.options = f.selectOptions;
        args.passProps.localize = true;
        break;
      case 'select':
        control.target = SelectComponent;
        args.options = f.selectOptions;
        break;
      case 'localizedselect':
        control.target = SelectComponent;
        args.options = f.selectOptions;
        args.passProps.localize = true;
        break;
      case 'upload':
        control.target = UploadComponent;
        const idFieldName = f.passProps['idField'];
        if (!idFieldName) throw new Error('Upload field requires an idField passProp.');
        args.passProps = {
          idObject: this.getValue(idFieldName),
          ...f.passProps,
          isEditing: this.isEditing(),
          onUploadSuccess: ud => {
            const data = this.data;
            const c = f.passProps.onUploadSuccess;
            if (c) c(data, ud);
          },
        };
        break;
      case 'date':
        control.target = DatePickerComponent;
        break;
      case 'content':
        control.target = ContentField;
        break;
      case 'textarea':
        control.target = TextArea;
        break;
      case 'separator':
        control.target = Separator;
        break;
      case 'teamplayerstatus':
        control.target = TeamPlayerStatus;
        break;
      case 'boolean':
        control.target = BooleanComponent;
        break;
      case 'readonlytext':
        control.target = ReadOnlyText;
        break;
      case 'facilitySelector':
        control.target = FacilitySelector;
        args.passProps = { wantsEmptyRow: true };
        break;
      case 'goalkeeperSelector':
        control.target = GoalkeeperSelector;
        args.passProps = { teamId: this.data.id, wantsEmptyRow: true };
        break;
      case 'time':
        control.target = Time;
        break;
      case 'datetimepicker':
        control.target = DateTimePicker;
        break;
      case 'fobiddendays':
        control.target = ForbiddenDays;
        break;
      case 'classificationCriteria':
        control.target = ClassificationCriteria;
        break;
      case 'cardselect':
        control.target = ColoredCardSelector;
        args.options = f.selectOptions;
        break;
      case 'cyclecards':
        control.target = CycleCardSelector;
        break;
      default:
        control.target = Text;
        break;
    }

    const formField = this.form.$(f.fieldName);

    return <control.target key={f.fieldName} field={formField} {...args} />;
  };

  getFields = () => {
    return this.props.fieldDefinition.map(this.getField);
  };

  getGroups = fieldComponents => {
    if (!fieldComponents || fieldComponents.length === 0) return null;

    const { groups } = this.props;
    if (!groups) return fieldComponents;

    groups.forEach(({ fields, containerClassName }) => {
      const { objects, index } = extractGroupFromArray(fieldComponents, 'key', fields);
      if (index === -1) return;

      const groupComponent = (
        <div key={'FormGroup' + index} className={'FormFieldGroup ' + containerClassName}>
          {objects}
        </div>
      );

      fieldComponents.splice(index, 0, groupComponent);
    });

    return fieldComponents;
  };

  render() {
    const p = this.props;
    const title = this.isEditing() ? p.editMessage : p.addMessage;
    const { form } = this;

    if (this.error) return <ErrorBox message={this.error} detail="" />;

    return (
      <React.Fragment>
        {p.title ? (
          <h2>
            <Loc>{p.title}</Loc>
          </h2>
        ) : null}
        <div className="Card Form">
          <h3>
            <Loc>{title}</Loc>
          </h3>
          <Spinner loading={!this.ready}>
            {this.ready ? (
              <div className="Content">
                <form>{this.getGroups(this.getFields())}</form>

                <div className="Errors">
                  {this.errorSummary.map(e => (
                    <p key={e} className="Error">
                      {e}
                    </p>
                  ))}
                </div>

                <div className="EditButtons">
                  {p.backButton ? <BackButton onClick={p.onBackClick} /> : null}
                  <SpinnerButton loading={p.loading} className="Button Active" onClick={form.onSubmit}>
                    <Loc>Save</Loc>
                  </SpinnerButton>
                </div>
              </div>
            ) : (
              <div className="Content">
                <InfoBox>
                  <Loc>No data to edit</Loc>
                </InfoBox>
              </div>
            )}
          </Spinner>
        </div>
      </React.Fragment>
    );
  }
}

Edit.defaultProps = defaultProps;

export default withRouter(Edit);
