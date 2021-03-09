import React, { useEffect, useState } from 'react';
import { useForm } from '../../../../hooks/useForm';
import { v4 as uuidV4 } from 'uuid';

import Loc, { Localize } from '../../../common/Locale/Loc';
import {
  editNotice,
  createNotice,
  startLoadingNotices,
  removeNotice,
} from '../../../../store/actions/notices';
import { useDispatch, useSelector } from 'react-redux';
import NoticeDetail from './NoticeDetail';
import NoticesForm from './NoticesForm';

const initialForm = {
  name: '',
  text: '',
  confirmationText1: '',
  confirmationText2: '',
  confirmationText3: '',
  acceptText: '',
  hoursInAdvance: 24,
  enabled: true,
};

const Notices = () => {
  const dispatch = useDispatch();
  const { notices } = useSelector(state => state.notices);
  const [showForm, setShowForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [enabled, setEnabled] = useState(initialForm.enabled);
  const [errors, setErrors] = useState([]);

  const [formValues, handleInputChange, reset] = useForm(initialForm);

  useEffect(() => {
    dispatch(startLoadingNotices());
  }, []);

  const handleEnabled = () => setEnabled(!enabled);

  const handleAdd = () => {
    setIsEditForm(false);
    reset(initialForm);
    setEnabled(initialForm.enabled);
    setShowForm(true);
  };

  const handleEdit = notice => {
    setIsEditForm(true);
    reset(notice);
    setEnabled(notice.enabled);
    setShowForm(true);
  };

  const handleRemove = notice => {
    dispatch(removeNotice(notice));
  };

  const handleReturn = () => setShowForm(false);

  const handleSaveForm = () => {
    const finalForm = {
      ...formValues,
      hoursInAdvance: parseInt(formValues.hoursInAdvance, 10),
      enabled,
    };

    if (handleValidation(finalForm)) {
      if (isEditForm) dispatch(editNotice(finalForm));
      else dispatch(createNotice(finalForm));
      handleReturn();
    }
  };

  const handleValidation = formValues => {
    let valid = true;
    const { name, hoursInAdvance } = formValues;
    setErrors([]);
    if (name.trim().length < 3) {
      setErrors([...errors, Localize('Notices.Title.Error')]);
      valid = false;
    }
    if (isNaN(hoursInAdvance)) {
      setErrors([...errors, Localize('Notices.Time.Error')]);
      valid = false;
    }
    return valid;
  };

  return (
    <div className="Notices">
      <h2>
        <Loc>Notices.Title</Loc>
      </h2>
      {!showForm && (
        <React.Fragment>
          <div className="ActionBar">
            <button className="Button Active" onClick={handleAdd}>
              <Loc>Notices.New</Loc>
            </button>
          </div>
          <table className="DataTable">
            <thead>
              <tr className="DataTableHeaderRow">
                <th className="DataTableHeaderCell DataTableCell">
                  <Loc>Notices.Title.Label</Loc>
                </th>
                <th className="DataTableHeaderCell DataTableCell">
                  <Loc>Notices.Time.Label</Loc>
                </th>
                <th className="DataTableHeaderCell DataTableCell">
                  <Loc>Notices.Active.Label</Loc>
                </th>
                <th className="DataTableHeaderCell DataTableCell"></th>
              </tr>
            </thead>
            <tbody>
              {notices.map(notice => (
                <NoticeDetail key={uuidV4()} notice={notice} edit={handleEdit} remove={handleRemove} />
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
      {showForm && (
        <NoticesForm
          isEdit={isEditForm}
          formValues={{ ...formValues, enabled }}
          handleEnabled={handleEnabled}
          handleInputChange={handleInputChange}
          errors={errors}
          goBack={handleReturn}
          save={handleSaveForm}
        />
      )}
    </div>
  );
};

export default Notices;
