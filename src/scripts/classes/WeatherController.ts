import RateLimiter from "./RateLimiter";
import { WeatherData, WeatherModel } from "./WeatherModel";

export default class WeatherController {
  
  private model: WeatherModel;
  private rateLimiter: RateLimiter;
  private URL = 'https://weatherlee.cyclic.app'

  constructor() {
    this.model = new WeatherModel();
    this.rateLimiter = new RateLimiter();
  }

  public async getWeatherInformation(query: string, units = 'imperial'): Promise<WeatherData> {
    try {
      if(!this.rateLimiter.isRateLimitReached) throw new Error("Rate limit exceeded! Please slow down!");
      const sanitizedQuery: string = this.model.sanitizeQuery(query);
      if(!sanitizedQuery) throw new Error(`Query is undefined.`);
      const response = await fetch(`${this.URL}/?q=${query}`);
      const parsedResponse = await response.json();
      const weatherData = parsedResponse;
      return weatherData;
    } catch (error) {
      console.error(error.message);
    }
  }
}
