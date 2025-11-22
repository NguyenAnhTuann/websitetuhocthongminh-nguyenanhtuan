import axios from 'axios';

const API_KEY = '2cec6717dab8d291ecead745f9293816';

export const getWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data.weather[0].main; // e.g. 'Rain', 'Clear', 'Clouds'
};
