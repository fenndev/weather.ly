import WeatherData from "./WeatherData";

export default class WeatherModel {
  private _currentWeather?: WeatherData;
  protected key = "53f818d0cdccfe5b5566f280ab1141d5";

  public async fetchWeatherData(
    query: string,
    units = "metric"
  ): Promise<void> {
    try {
      const checkedQuery = this.parseQuery(query);
      if (!checkedQuery) throw new Error("Please enter a valid location.");
      const coordinatesResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${checkedQuery}&limit=1&appid=${this.key}`
      );
      const coordinates: any[] = await coordinatesResponse.json();
      const location: any = coordinates[0];
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${this.key}`
      );
      const weather = await weatherResponse.json();
      if (location.country != "US") location.state = null;
      this.parseWeatherData(
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

  public parseWeatherData(
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
    this._currentWeather = new WeatherData(
      city.toLowerCase(),
      state?.toLowerCase(),
      country.toLowerCase(),
      Number.parseFloat(temperature.toFixed(1)),
      weatherType.toLowerCase(),
      weatherID,
      Number.parseFloat(windSpeed.toFixed(1)),
      humidity,
      units
    );
  }

  private parseQuery(initQuery: string): string | undefined {
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
    let strippedInput = input.replace(/<[^>]*>/g, "");
    strippedInput = strippedInput.replace(/<script[^>]*>.*<\/script>/gi, "");

    // Escape special characters
    let escapedInput = strippedInput.replace(/&/g, "&amp;");
    escapedInput = escapedInput.replace(/</g, "&lt;");
    escapedInput = escapedInput.replace(/>/g, "&gt;");
    escapedInput = escapedInput.replace(/"/g, "&quot;");
    escapedInput = escapedInput.replace(/'/g, "&#39;");

    // Standardize input
    const standardInput = escapedInput.toLowerCase();
    return standardInput;
  }

  // Convert units and return the current weather
  public convertUnits() {
    this._currentWeather?.convertUnits();
    return this.currentWeather;
  }

  // Return current weather information
  public get currentWeather(): WeatherData | undefined {
    return this._currentWeather;
  }
}
