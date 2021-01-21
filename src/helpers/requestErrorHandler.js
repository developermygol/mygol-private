import { toast } from 'react-toastify';

export const errorBasiHandler = err => {
  if (err.response && err.response.data) {
    toast.error(err.response.data);
    console.error(err.response.data);
    return;
  }
  toast.error(err.message);
  console.error(err);
};
