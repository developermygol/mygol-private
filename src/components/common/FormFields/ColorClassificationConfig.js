import React, { useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import XCircle from 'react-feather/dist/icons/x-circle';
import Edit3 from 'react-feather/dist/icons/edit-3';

import { useForm } from '../../../hooks/useForm';
import { parseJson } from '../../helpers/Utils';
import Loc, { Localize } from '../Locale/Loc';
import IconButton from '../../../formFields/IconButton';
import SimpleMessageBox from '../../shared/Message/SimpleMessageBox';
import ColorPickerForm from '../../shared/Appearance/ColorPickerForm';

const initialForm = {
  start: 1,
  end: 1,
  title: '',
  description: '',
  color: '#456789',
};

const scrollModal = (type = 'top') => {
  const modalElement = document.getElementsByClassName('ModalWindow')[0];
  if ('top') modalElement.scrollTo({ top: 0, behavior: 'smooth' });
  if ('bottom') modalElement.scrollTo({ left: 0, top: modalElement.scrollHeight, behavior: 'smooth' });
};

const ColorClassificationConfig = props => {
  const { field, hint } = props;
  const { value, label } = field;

  const [config, setConfig] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [values, handleInputChange, reset] = useForm(initialForm);
  const { start, end, title, description, color } = values;

  useEffect(() => {
    const data = parseJson(value);
    if (data) setConfig(data);
  }, []);

  const handleNew = e => {
    e.preventDefault();
    reset(initialForm);
    setSelectedItem(null);
    setShowForm(true);
    scrollModal();
  };

  const handleEdit = (e, item) => {
    e.preventDefault();
    reset(item);
    setShowForm(true);
    scrollModal();
  };

  const handleRemove = id => {
    const filteredConfig = config.filter(c => c.id !== id);
    setConfig(filteredConfig);
    props.field.value = JSON.stringify(filteredConfig);
  };

  const handleSaveForm = e => {
    e.preventDefault();
    const isNewItem = !selectedItem;
    const id = selectedItem ? selectedItem.id : uuidV4();
    const colorRange = { id, start, end, title, description, color };

    let colorConfig;

    if (isNewItem) colorConfig = [...config, colorRange];
    else
      colorConfig = config.map(e => {
        if (e.id === colorRange.id) return colorRange;
        return e;
      });

    setConfig(colorConfig);
    props.field.value = JSON.stringify(colorConfig);

    scrollModal('bottom');
    setShowForm(false);
    reset(initialForm);
  };

  return (
    <React.Fragment>
      <div className="FormField Criteria">
        <label className="Label forText" htmlFor="colorConfig">
          {label}
        </label>
        <small className="Hint">{hint}</small>
        <button className="Button Second" onClick={handleNew}>
          <Loc>Stage.AddColor</Loc>
        </button>
        <table className="DataTable">
          <thead>
            <tr className="DataTableHeaderRow">
              <th className="DataTableHeaderCell DataTableCell Mini">
                <Loc>Color</Loc>
              </th>
              <th className="DataTableHeaderCell DataTableCell Mini">
                <Loc>Start</Loc>
              </th>
              <th className="DataTableHeaderCell DataTableCell Mini">
                <Loc>End</Loc>
              </th>
              <th className="DataTableHeaderCell DataTableCell">
                <Loc>Title</Loc>
              </th>
              <th className="DataTableHeaderCell DataTableCell Mini"></th>
            </tr>
          </thead>
          <tbody>
            {config &&
              config.map(colorRange => {
                const { color, start, end, title, id } = colorRange;
                return (
                  <tr key={id} className="DataTableRow">
                    <td className="DataTableCell">
                      <span className="StageConfigColor" style={{ backgroundColor: color }} />
                    </td>
                    <td className="DataTableCell">{start}</td>
                    <td className="DataTableCell">{end}</td>
                    <td className="DataTableCell">{title}</td>
                    <td className="DataTableCell">
                      <div className="ListActionButtons">
                        <IconButton
                          className="Button Third"
                          onClick={e => {
                            setSelectedItem(colorRange);
                            handleEdit(e, colorRange);
                          }}
                        >
                          <Edit3 size={20} />
                        </IconButton>
                        <IconButton
                          className="Button Third"
                          onClick={e => {
                            setShowConfirm(true);
                            setSelectedItem(colorRange);
                            scrollModal();
                          }}
                        >
                          <XCircle size={20} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {showForm && (
          <div className="BackDrop">
            <div className="ModalWindow">
              <div className="Card Form">
                <h3> </h3>
                <div className="Content">
                  <div className="FormField">
                    <label className="Label forText" htmlFor="start">
                      <Loc>Stage.Edit.Start</Loc>
                    </label>
                    <small className="Hint"></small>
                    <input
                      className="Text"
                      name="start"
                      type="text"
                      label={Localize('Stage.Edit.Start')}
                      placeholder=""
                      value={start}
                      onChange={handleInputChange}
                    />
                    <small className="ValidationError"></small>
                  </div>
                  <div className="FormField">
                    <label className="Label forText" htmlFor="end">
                      <Loc>Stage.Edit.End</Loc>
                    </label>
                    <small className="Hint"></small>
                    <input
                      className="Text"
                      name="end"
                      type="text"
                      label={Localize('Stage.Edit.End')}
                      placeholder=""
                      value={end}
                      onChange={handleInputChange}
                    />
                    <small className="ValidationError"></small>
                  </div>
                  <div className="FormField">
                    <label className="Label forText" htmlFor="title">
                      <Loc>Title</Loc>
                    </label>
                    <small className="Hint">
                      <Loc>Stage.Title.Hint</Loc>
                    </small>
                    <input
                      className="Text"
                      name="title"
                      type="text"
                      label={Localize('Stage.Title')}
                      placeholder=""
                      value={title}
                      onChange={handleInputChange}
                    />
                    <small className="ValidationError"></small>
                  </div>
                  <div className="FormField">
                    <label className="Label forText" htmlFor="description">
                      <Loc>Stage.Desc</Loc>
                    </label>
                    <small className="Hint"></small>
                    <input
                      className="Text"
                      name="description"
                      type="text"
                      label={Localize('Stage.Desc')}
                      placeholder=""
                      value={description}
                      onChange={handleInputChange}
                    />
                    <small className="ValidationError"></small>
                  </div>
                  <div className="FormField">
                    <label className="Label forText" htmlFor="color">
                      <Loc>Color</Loc>
                    </label>
                    <small className="Hint"></small>
                    <ColorPickerForm value={color} onChange={handleInputChange} name="color" />
                    <small className="ValidationError"></small>
                  </div>
                </div>
                <div className="Errors"></div>
                <div className="EditButtons">
                  <button className="Button" onClick={() => setShowForm(false)}>
                    <FontAwesomeIcon icon={faArrowLeft} /> <Loc>Back</Loc>
                  </button>
                  <button className="Button Active SpinnerButtonIdle" onClick={handleSaveForm}>
                    <Loc>Save</Loc>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <small className="ValidationError"></small>
      </div>
      <SimpleMessageBox
        show={showConfirm}
        onConfirm={e => {
          e.preventDefault();
          handleRemove(selectedItem.id);
          setShowConfirm(false);
          scrollModal('bottom');
        }}
        onCancel={() => setShowConfirm(false)}
      >
        <p>
          <Loc>Really delete?</Loc>
          {` ${selectedItem && selectedItem.title}?`}
        </p>
      </SimpleMessageBox>
    </React.Fragment>
  );
};

export default ColorClassificationConfig;
