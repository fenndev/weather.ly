import RateLimiter from './RateLimiter';
import WeatherData from './WeatherData';
import sanitizeQuery from '../functions/SanitizeQuery';

export default class WeatherController {
    private rateLimiter: RateLimiter;
    private URL = 'https://weatherlee.cyclic.app';

    constructor() {
        this.rateLimiter = new RateLimiter();
    }

    public async getWeatherInformation(
        query: string,
        units = 'imperial'
    ): Promise<WeatherData> {
        try {
            if (!this.rateLimiter.isRateLimitReached)
                throw new Error('Rate limit exceeded! Please slow down!');
            const sanitizedQuery: string = sanitizeQuery(query);
            if (!sanitizedQuery) throw new Error(`Query is undefined.`);
            const response = await fetch(
                `${this.URL}/?q=${query}&units=${units}`
            );
            const parsedResponse = await response.json();
            const {
                cityName,
                stateName,
                countryName,
                temperature,
                weatherType,
                weatherID,
                windSpeed,
                humidity,
                unitSystem,
            } = parsedResponse;
            return new WeatherData(
                cityName,
                stateName,
                countryName,
                temperature,
                weatherType,
                weatherID,
                windSpeed,
                humidity,
                unitSystem
            );
        } catch (error) {
            console.error(error.message);
        }
    }
}
