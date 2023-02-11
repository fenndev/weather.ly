export class WeatherModel {
  private _currentWeather!: WeatherData;
  // Weather Fetching Functions

  public sanitizeQuery(input: string): string {
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
  public convertUnits(): WeatherData {
    try {
      if (this._currentWeather.unitSystem === "imperial") {
        this._currentWeather.temperature = Number.parseFloat(
          ((this._currentWeather.temperature - 32) * (5 / 9)).toFixed(1)
        );
        this._currentWeather.windSpeed = Number.parseFloat(
          (this._currentWeather.windSpeed * 1.609).toFixed(1)
        );
        this._currentWeather.unitSystem = "metric";
      } else if (this._currentWeather.unitSystem === "metric") {
        this._currentWeather.temperature = Number.parseFloat(
          (this._currentWeather.temperature * (9 / 5) + 32).toFixed(1)
        );
        this._currentWeather.windSpeed = Number.parseFloat(
          (this._currentWeather.windSpeed / 1.609).toFixed(1)
        );
        this._currentWeather.unitSystem = "imperial";
        return this._currentWeather;
      } else {
        throw new Error(
          `Error: Unrecognized unitSystem. /"${this._currentWeather.unitSystem}/" is not a known value.`
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

export class WeatherData {
  public cityName: string;
  public stateName: string | undefined;
  public countryName: string;
  public temperature: number;
  public weatherType: string;
  public weatherID: number;
  public windSpeed: number;
  public humidity: number;
  public unitSystem: string;
  public temperatureUnits: string;
  public windSpeedUnits: string;

  constructor(
    city: string,
    state: string | undefined,
    country: string,
    temperature: number,
    weatherType: string,
    weatherID: number,
    windSpeed: number,
    humidity: number,
    unitSystem: string
  ) {
    this.cityName = city.toLowerCase();
    this.stateName = state?.toLowerCase();
    this.countryName = country.toLowerCase();
    this.temperature = Number.parseFloat(temperature.toFixed(1));
    this.weatherType = weatherType.toLowerCase();
    this.weatherID = weatherID;
    this.windSpeed = Number.parseFloat(windSpeed.toFixed(1));
    this.humidity = humidity;
    this.unitSystem = unitSystem;

    if (unitSystem == "metric") {
      this.temperatureUnits = "°C";
      this.windSpeedUnits = "kph";
    } else {
      this.temperatureUnits = "°F";
      this.windSpeedUnits = "mph";
    }
  }
}
