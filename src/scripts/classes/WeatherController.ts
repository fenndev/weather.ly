import WeatherModel from "./WeatherModel";
import WeatherView from "./WeatherView";

export default class WeatherController {
    protected key: string = '53eb90610b23be70589bc3e845c27b5a';
    private view: WeatherView;
    private model: WeatherModel;

    private rateLimitCounter: number = 0;
    private rateLimitTimestamp: number = Date.now();
    private rateLimit: number = 10;
    private rateLimitPeriod: number = 60000; // 1 minute

    constructor(data: string) {
        this.view = new WeatherView();
        this.model = new WeatherModel();

        this.fetchWeatherData('seattle', 'imperial');
    }

    public async fetchWeatherData(cityName: string, units = 'metric'): Promise<void> {
        try {
            if(await this.isRateLimitReached()) 
                throw new Error("Rate limit reached, please try again later.");
            const coordinatesResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.key}`);
            const coordinates: any[] = await coordinatesResponse.json();
            const location: any = coordinates[0];
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${this.key}`);
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
            this.view.update(this.model.currentWeather);
        }
        catch(error) {
            console.log(error);
        }
    }

    private async isRateLimitReached() : Promise<Boolean> {
        if(Date.now() - this.rateLimitTimestamp >= this.rateLimitPeriod) {
            this.rateLimitCounter = 0;
            this.rateLimitTimestamp = Date.now();
        }
        if(this.rateLimitCounter < this.rateLimit) {
            this.rateLimitCounter++;
            return false;
        } 
        else return true;
    }
}