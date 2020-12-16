import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target, value, name, hex }) => {
    const isColorPicker = !target && hex;
    const isSelect = !target && name && value;

    if (isSelect) {
      setValues({
        ...values,
        [name]: value,
      });
    } else if (isColorPicker) {
      setValues({
        ...values,
        color: hex, //💥
      });
    } else {
      setValues({
        ...values,
        [target.name]: target.value, // 🔎 target object property name.
      });
    }
  };

  return [values, handleInputChange, reset];
};
