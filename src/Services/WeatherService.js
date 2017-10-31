
export const API = {
  baseUrl: "https://api.openweathermap.org/data/2.5/",
  dailyForecastUrl: "forecast",
  currentWeatherUrl: "weather",
  //url: 'http://localhost:8888/joseph/react-native-try/SampleWeatherApp/response1.json',
  key: 'e48f4334ce699bf588f71ab4bd855616',
  getDailyForecastUrl: function() {
    return this.baseUrl + this.dailyForecastUrl;
  },
  getCurrentWeatherUrl: function() {
    return this.baseUrl + this.currentWeatherUrl;
    //return this.url;
  }
};