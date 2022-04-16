import { WEATHER_API_ICON_URL } from 'config';

const responseHelper = (data) => ({
  tempMin: data.main.temp_min,
  tempMax: data.main.temp_max,
  humidity: data.main.humidity,
  description: data.weather[0].description,
  icon: `${WEATHER_API_ICON_URL}/${data.weather[0].icon}.png`,
  main: data.weather[0].main,
  city: data.name,
  country: data.sys.country,
});
export default responseHelper;
