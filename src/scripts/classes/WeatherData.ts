export default class WeatherData {
    constructor(
        public cityName: string,
        public stateName: string | null,
        public countryName: string,
        public temperature: number,
        public weatherType: string,
        public weatherID: number,
        public windSpeed: number,
        public humidity: number,
        public units: string
    ) {};

    public convertUnits() {
        try {
            if (this.units === 'imperial') {
                this.temperature = Number.parseFloat(((this.temperature - 32) * (5 / 9)).toFixed(1));
                this.windSpeed = Number.parseFloat((this.windSpeed * 1.609).toFixed(1));
                this.units = 'metric';
            }
            else if (this.units === 'metric') {
                this.temperature = Number.parseFloat((this.temperature * (9 / 5) + 32).toFixed(1));
                this.windSpeed = Number.parseFloat((this.windSpeed / 1.609).toFixed(1));
                this.units = 'imperial';
            }
            else {
                throw new Error(`Error: Unrecognized units. ${this.units} is not a known value.`);
            }
        }
        catch (error) {
            console.error(error.message)
        }
        
    }
}