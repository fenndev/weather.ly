import RateLimiter from "./RateLimiter";
import WeatherModel from "./WeatherModel";

export default class WeatherController {
  
  private model: WeatherModel;
  private rateLimiter: RateLimiter;

  

  constructor() {
    // Initialize Observers
    this.model = new WeatherModel();
    this.rateLimiter = new RateLimiter();
  }
}
