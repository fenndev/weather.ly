import Subject from "./utility/Subject";
import WeatherModel from "./WeatherModel";
import WeatherView from "./WeatherView";

export default class WeatherController extends Subject {
  protected key = "53f818d0cdccfe5b5566f280ab1141d5";
  private view: WeatherView;
  private model: WeatherModel;

  private rateLimit: number;
  private rateLimitCounter: number;
  private rateLimitTimestamp: number;
  private rateLimitPeriod: number;

  constructor() {
    super();
    // Initialize Observers
    this.view = new WeatherView();
    this.model = new WeatherModel();
    this.subscribe(this.view);

    // Set declared variables
    this.rateLimit = 10;
    this.rateLimitCounter = 0;
    this.rateLimitTimestamp = Date.now();
    this.rateLimitPeriod = 60000; // 1 minute

    // Default location
    this.fetchWeatherData("seattle", "imperial");
  }

  public async fetchWeatherData(
    cityName: string,
    units = "metric"
  ): Promise<void> {
    try {
      if (await this.isRateLimitReached())
        throw new Error("Rate limit reached, please try again later.");
      const coordinatesResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.key}`
      );
      const coordinates: any[] = await coordinatesResponse.json();
      const location: any = coordinates[0];
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${this.key}`
      );
      const weather = await weatherResponse.json();
      this.model.parseWeatherData(
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
      if(this.view != undefined) {
        await this.notify(this.model.currentWeather);
        this.view.searchField?.addEventListener('input', (event) => {
          const { target } = event;
          if(target) console.log((target as HTMLInputElement).value)
        });
      }
        
    } catch (error) {
      console.log(error);
    }
  }

  private async isRateLimitReached(): Promise<boolean> {
    if (Date.now() - this.rateLimitTimestamp >= this.rateLimitPeriod) {
      this.rateLimitCounter = 0;
      this.rateLimitTimestamp = Date.now();
    }
    if (this.rateLimitCounter < this.rateLimit) {
      this.rateLimitCounter++;
      return false;
    } else return true;
  }
}
