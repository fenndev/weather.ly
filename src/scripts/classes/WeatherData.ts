export default class WeatherData {
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
        this.cityName = city;
        this.stateName = state;
        this.countryName = country;
        this.temperature = Number.parseFloat(temperature.toFixed(1));
        this.weatherType = weatherType;
        this.weatherID = weatherID;
        this.windSpeed = Number.parseFloat(windSpeed.toFixed(1));
        this.humidity = humidity;
        this.unitSystem = unitSystem;

        this.changeUnitDisplay();
    }

    public convertUnits(desiredUnits: string): WeatherData {
        if (desiredUnits === this.unitSystem) return this;
        if (this.unitSystem === 'imperial') {
            this.temperature = Number.parseFloat(
                ((this.temperature - 32) * (5 / 9)).toFixed(1)
            );
            this.windSpeed = Number.parseFloat(
                (this.windSpeed * 1.609).toFixed(1)
            );
            this.unitSystem = 'metric';
        } else if (this.unitSystem === 'metric') {
            this.temperature = Number.parseFloat(
                (this.temperature * (9 / 5) + 32).toFixed(1)
            );
            this.windSpeed = Number.parseFloat(
                (this.windSpeed / 1.609).toFixed(1)
            );
            this.unitSystem = 'imperial';
        }
        this.changeUnitDisplay();
        return this;
    }

    private changeUnitDisplay(): void {
        if (this.unitSystem == 'metric') {
            this.temperatureUnits = '°C';
            this.windSpeedUnits = 'kph';
        } else {
            this.temperatureUnits = '°F';
            this.windSpeedUnits = 'mph';
        }
    }
}
