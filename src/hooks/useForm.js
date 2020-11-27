import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target, value, name }) => {
    const isSelect = !target && name && value;

    if (isSelect) {
      setValues({
        ...values,
        [name]: value,
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
