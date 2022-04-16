// initial state for fetch api.
export const initialState = {
  fetch: {
    loading: false,
    result: null,
    error: null,
  },
  history: [],
};
// for generating form fields
export const formFields = [
  {
    label: 'City',
    name: 'city',
    rules: [{ required: true, message: 'Please input the city name' }],
  },
  {
    label: 'Country',
    name: 'country',
    rules: [{ required: true, message: 'Please input the country code' }],
  },
];
