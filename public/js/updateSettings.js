import axios from 'axios';
import { showAlert } from './alerts';

// type is either "data" or "password"
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);

      //   clear input fields
      if (type === 'password') {
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
      } else {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
      }

      window.setTimeout(() => {
        location.reload();
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
