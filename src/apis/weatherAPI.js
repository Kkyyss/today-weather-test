import { WEATHER_API_KEY, WEATHER_API_URL } from 'config';
import responseHelper from 'utils/responseHelper';
import fetchHelper from './fetchHelper';

// Get weather API
export default async function getWeather({ city, country }) {
  const queryString = `?q=${city},,${country}&APPID=${WEATHER_API_KEY}`;

  const { data } = await fetchHelper(`${WEATHER_API_URL}${queryString}`);

  return responseHelper(data);
}
