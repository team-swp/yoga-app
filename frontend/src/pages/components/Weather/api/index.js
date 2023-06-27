//*** OPEN WEATHER & UNSPLASH KEYS****//
const API_APPID = '042b037213e9b514f75de03ca875cbf2'
const API_UNPSLASH = 'B42i6Sw005IpjclTfNfArUShno8hHqpo6HEDyyE5mY4'

const API_URL_APPID = "https://api.openweathermap.org/data/2.5/weather";
const DEFAULT_URL = `${API_URL_APPID}/?APPID=${API_APPID}&lat=10.762622&lon=106.660172`;
const SEARCH_BY_LOCATION = `${API_URL_APPID}?appid=${API_APPID}`; //&lat={lat}&lon={lon}

const GET_NEXT_DAYS_HOURS = `https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&appid=${API_APPID}`; //&lat={lat}&lon={lon}
const DEF_N_D_H = `https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&appid=${API_APPID}&lat=10.762622&lon=106.660172`;

//*** UNSPLASH ****//
const URL_UNSPLASH = "https://api.unsplash.com/search/photos";
const SEARCH_BY_WORD = `${URL_UNSPLASH}?client_id=${API_UNPSLASH}&page=1&query=`;
const SEARCH_DEFAULT = `${URL_UNSPLASH}?client_id=${API_UNPSLASH}&page=1&query=Vietnam`;

export {
  API_URL_APPID,
  API_APPID,
  DEFAULT_URL,
  SEARCH_BY_LOCATION,
  SEARCH_BY_WORD,
  SEARCH_DEFAULT,
  GET_NEXT_DAYS_HOURS,
  DEF_N_D_H,
};