import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    let err;
    switch (error.response.status) {
      case 401:
        err = 'Oops. Invalid API key.';
        break;
      case 404:
        err = 'No result found.';
        break;
      case 429:
        err = 'Too many requests at a time. Please try again later.';
        break;
      default:
        err = 'Server Error';
        break;
    }
    return Promise.reject(err);
  }
);

const fetchHelper = async (url) => {
  const res = await axios.get(url);

  return res;
};
export default fetchHelper;
