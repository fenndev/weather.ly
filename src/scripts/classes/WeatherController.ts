import Subject from "./utility/Subject";
import WeatherModel from "./WeatherModel";
import WeatherView from "./WeatherView";

export default class WeatherController extends Subject {
  protected key = "53f818d0cdccfe5b5566f280ab1141d5";
  private view: WeatherView;
  private model: WeatherModel;

  private searchForm: HTMLFormElement | undefined;

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
    query: string,
    units = "metric"
  ): Promise<void> {
    try {
      if (await this.isRateLimitReached())
        throw new Error("Rate limit reached, please try again later.");
      const checkedQuery = this.parseQuery(query);
      if(!checkedQuery) throw new Error('Please enter a valid location.');
      const coordinatesResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${checkedQuery}&limit=1&appid=${this.key}`
      );
      const coordinates: any[] = await coordinatesResponse.json();
      const location: any = coordinates[0];
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${this.key}`
      );
      const weather = await weatherResponse.json();
      if(location.country != 'US') location.state = null;
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

      // TODO: Extract this logic to somewhere else?
      if(this.view != undefined) {
        await this.notify(this.model.currentWeather);
        this.searchForm = this.view.searchFormElement;
        this.searchForm?.addEventListener('submit', (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const inputElement = form.elements.namedItem('searchForm') as HTMLInputElement;
          inputElement ? this.fetchWeatherData(inputElement.value) : console.error("The input value cannot be an empty string.");
        });

        // legacy code related to autocomplete feature
        // this.view.searchField?.addEventListener('input', (event) => {
        //   const { target } = event;
        //   if(target) console.log((target as HTMLInputElement).value)
        // });
      }
        
    } catch (error) {
      alert(error);
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

  private parseQuery(initQuery: string): string | undefined {
    const sanitizedQuery: string = this.sanitizeInput(initQuery);
    const postalCodePattern = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/;
    const locationPattern = /^([a-zA-Z]+)(,\s*([a-zA-Z]+))?(,\s*([a-zA-Z]+))?$/;
    const isPostal: boolean = postalCodePattern.test(sanitizedQuery);
    const isLocation: boolean = locationPattern.test(sanitizedQuery);
    
    if(isPostal || isLocation) return sanitizedQuery;
    else return undefined;
  }

  private sanitizeInput(input: string): string {
      // Strip HTML and script tags
      let strippedInput = input.replace(/<[^>]*>/g, '');
      strippedInput = strippedInput.replace(/<script[^>]*>.*<\/script>/ig, '');
    
      // Escape special characters
      let escapedInput = strippedInput.replace(/&/g, '&amp;');
      escapedInput = escapedInput.replace(/</g, '&lt;');
      escapedInput = escapedInput.replace(/>/g, '&gt;');
      escapedInput = escapedInput.replace(/"/g, '&quot;');
      escapedInput = escapedInput.replace(/'/g, '&#39;');

      // Standardize input
      const standardInput = escapedInput.toLowerCase();
      return standardInput;
  }
}
