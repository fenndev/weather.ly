import type LocationResponse from "../interfaces/LocationResponse";
import type WeatherResponse from "../interfaces/WeatherResponse";

export class WeatherModel {
  private _currentWeather!: WeatherData;
  protected key = "appid=53f818d0cdccfe5b5566f280ab1141d5";
  private openWeatherMapURL = "https://api.openweathermap.org/data/2.5/weather";
  private limit = 1;

  // Weather Fetching Functions

  public async getWeatherData(
    query: string,
    units = "metric"
  ): Promise<WeatherData> {
    try {
      const location: LocationResponse = await this.queryLocation(query);
      const weather: WeatherResponse = await this.fetchWeather(location.lat, location.lon, units);
      if (location.country != "US") location.state = null;
      return new WeatherData(
        location.name,
        location.state,
        location.country,
        weather.main.temp,
        weather.weather[0].main,
        weather.weather[0].id,
        weather.wind.speed,
        weather.main.humidity,
        units
      );
    } catch (error) {
      alert(error);
    }
  }

  private async queryLocation(query: string): Promise<LocationResponse> {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${this.limit}&appid=${this.key}`
    );
    const location: LocationResponse = await (response.json())[0];
    return location;
  }

  private async fetchWeather(
    lat: number,
    lon: number,
    units: string
  ): Promise<WeatherResponse> {
    const response = await fetch(
      `${this.openWeatherMapURL}?lat=${lat}&lon=${lon}&units=${units}&appid=${this.key}`
    );
    const weather: WeatherResponse = await response.json();
    return weather;
  }

  public parseQuery(initQuery: string): string | undefined {
    const sanitizedQuery: string = this.sanitizeInput(initQuery);
    const postalCodePattern = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/;
    const locationPattern = /^([a-zA-Z]+)(,\s*([a-zA-Z]+))?(,\s*([a-zA-Z]+))?$/;
    const isPostal: boolean = postalCodePattern.test(sanitizedQuery);
    const isLocation: boolean = locationPattern.test(sanitizedQuery);

    if (isPostal || isLocation) return sanitizedQuery;
    else return undefined;
  }

  private sanitizeInput(input: string): string {
    // Strip HTML and script tags
    let untaggedString = input.replace(/<[^>]*>/g, "");
    untaggedString = untaggedString.replace(/<script[^>]*>.*<\/script>/gi, "");

    // Escape special characters
    let escapedString = untaggedString.replace(/&/g, "&amp;");
    escapedString = escapedString.replace(/</g, "&lt;");
    escapedString = escapedString.replace(/>/g, "&gt;");
    escapedString = escapedString.replace(/"/g, "&quot;");
    escapedString = escapedString.replace(/'/g, "&#39;");

    // Standardize input
    const sanitizedString = escapedString.toLowerCase();
    return sanitizedString;
  }

  // Convert units and return the current weather
  public convertUnits() {
    try {
      if (this._currentWeather.units === "imperial") {
        this._currentWeather.temperature = Number.parseFloat(
          ((this._currentWeather.temperature - 32) * (5 / 9)).toFixed(1)
        );
        this._currentWeather.windSpeed = Number.parseFloat(
          (this._currentWeather.windSpeed * 1.609).toFixed(1)
        );
        this._currentWeather.units = "metric";
      } else if (this._currentWeather.units === "metric") {
        this._currentWeather.temperature = Number.parseFloat(
          (this._currentWeather.temperature * (9 / 5) + 32).toFixed(1)
        );
        this._currentWeather.windSpeed = Number.parseFloat(
          (this._currentWeather.windSpeed / 1.609).toFixed(1)
        );
        this._currentWeather.units = "imperial";
      } else {
        throw new Error(
          `Error: Unrecognized units. ${this._currentWeather.units} is not a known value.`
        );
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  // Return current weather information
  public get currentWeather(): WeatherData {
    return this._currentWeather;
  }
}

export default class WeatherData {
  public cityName: string;
  public stateName: string | undefined;
  public countryName: string;
  public temperature: number;
  public weatherType: string;
  public weatherID: number;
  public windSpeed: number;
  public humidity: number;
  public units: string;

  constructor(
    city: string,
    state: string | undefined,
    country: string,
    temperature: number,
    weatherType: string,
    weatherID: number,
    windSpeed: number,
    humidity: number,
    units: string
  ) {
    this.cityName = city.toLowerCase();
    this.stateName = state?.toLowerCase();
    this.countryName = country.toLowerCase();
    this.temperature = Number.parseFloat(temperature.toFixed(1));
    this.weatherType = weatherType.toLowerCase();
    this.weatherID = weatherID;
    this.windSpeed = Number.parseFloat(windSpeed.toFixed(1));
    this.humidity = humidity;
    this.units = units;
  }
}
