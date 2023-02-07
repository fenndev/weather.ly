import RateLimiter from "./RateLimiter";
import { WeatherData, WeatherModel } from "./WeatherModel";

export default class WeatherController {
  
  private model: WeatherModel;
  private rateLimiter: RateLimiter;

  constructor() {
    this.model = new WeatherModel();
    this.rateLimiter = new RateLimiter();
  }

  public async getWeatherInformation(query: string, units = 'imperial'): Promise<WeatherData> {
    try {
      if(!this.rateLimiter.isRateLimitReached) throw new Error("Rate limit exceeded! Please slow down!");
      const sanitizedQuery: string = this.model.parseQuery(query);
      const weatherData = await this.model.getWeatherData(sanitizedQuery, units);
      return weatherData;
    } catch (error) {
      console.error(error.message);
    }
  }
}
