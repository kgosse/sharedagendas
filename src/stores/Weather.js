import { observable, action, computed } from 'mobx';
import {SERVICE_STATES} from "../utils/consts";
import {API} from "../Services/WeatherService";

class WeatherStore {
  @observable currentWeather = null;
  @observable forecast = [];
  @observable search = null;
  @observable fetchApiDataForCurrentWeatherRequest = {
    state: SERVICE_STATES.initial,
    message: null
  };
  @observable fetchApiDataForForecastRequest = {
    state: SERVICE_STATES.initial,
    message: null
  };

  @action fetchApiDataForCurrentWeather = (search, cb) => {
    this.fetchApiDataForCurrentWeatherRequest.state = SERVICE_STATES.pending;
    this.search = search;
    const query = this._prepareAPIUrlForCurrentWeather();
    fetch(query)
      .then(response => response.json())
      .then(responseData => {
        this.fetchApiDataForCurrentWeatherSuccess(responseData, cb);
        // this.handleResponseForCurrentWeather(responseData)
      })
      .catch(error => {
        this.fetchApiDataForCurrentWeatherError(error);
      }).done();
  };

  @action.bound
  fetchApiDataForCurrentWeatherSuccess(data, cb) {
    this.currentWeather = data;
    this.fetchApiDataForForecast(cb);
  }

  @action.bound
  fetchApiDataForCurrentWeatherError(error) {
    this.fetchApiDataForCurrentWeatherRequest.state = SERVICE_STATES.error;
    this.fetchApiDataForCurrentWeatherRequest.message = error;
  }

  _prepareAPIUrlForCurrentWeather = () => {
    //get the current weather api data
    const url = API.getCurrentWeatherUrl();
    const queryStringData = {
      q: this.search,
      type: 'accurate'
    };
    return this._returnPreparedUrl(url, queryStringData);
  };

  _prepareAPIUrlForForecast = () => {
    const url = API.getDailyForecastUrl();
    const queryStringData = {
      q: this.search,
      cnt: 50,
      type: 'accurate'
    };
    return this._returnPreparedUrl(url, queryStringData);
  };

  _returnPreparedUrl = (url, queryStringData) => {
    //if api key is defined then add it to query string
    if(API.key && API.key.length > 0) {
      queryStringData["APPID"] = API.key
    }

    const querystring = Object.keys(queryStringData)
      .map(key => key + '=' + encodeURIComponent(queryStringData[key]))
      .join('&');

    return url + "?" + querystring;
  };

  @action fetchApiDataForForecast = (cb) => {
    const query = this._prepareAPIUrlForForecast();
    this.fetchApiDataForForecastRequest.state = SERVICE_STATES.pending;
    fetch(query)
      .then(response => response.json())
      .then(responseData =>{
        this.fetchApiDataForForecastSuccess(responseData, cb)
      })
      .catch(error => {
        this.fetchApiDataForForecastError(error);
      }).done();
  };

  @action.bound
  fetchApiDataForForecastSuccess(data, cb) {
    this.fetchApiDataForForecastRequest.state = SERVICE_STATES.done;
    this.fetchApiDataForForecastRequest.message = '';
    this.fetchApiDataForCurrentWeatherRequest.state = SERVICE_STATES.done;
    this.fetchApiDataForCurrentWeatherRequest.message = '';
    this.forecast = data.list;
    cb && cb();
  }

  @action.bound
  fetchApiDataForForecastError(error) {
    this.fetchApiDataForForecastRequest.state = SERVICE_STATES.error;
    this.fetchApiDataForForecastRequest.message = error;
  }

  @computed get forecastItems() {
    return this.forecast.map(f => f);
  }
/*

  handleResponseForForecast = (forecastData, currentWeatherData) => {

    this.props.navigator.push({
      title: "Current",
      component: TodayView,
      passProps: {
        data: currentWeatherData,
        city: this.state.searchString
      },
//navigate to Forecast View with prefetched data
      rightButtonTitle: 'Forecast',
      onRightButtonPress: () => {
        this.props.navigator.push({
          title: "10 day Forecast",
          component: ForecastView,
          passProps: {
            data: forecastData.list
          }
        });
      }
    });
  }
*/

}

export default new WeatherStore();