import Observer from "./utility/Observer";
import WeatherData from "./WeatherData";

export default class WeatherView implements Observer {
    private weatherGUI?: HTMLElement;
    private searchForm?: HTMLFormElement;
    public searchField?: HTMLInputElement;

    constructor() {
        this.createForm();
    }

    
    update(weatherData: WeatherData | undefined) {
        if(weatherData) this.render(weatherData);
    }

    private render(weatherData: WeatherData): void {
        if(this.weatherGUI != null) this.clearNode(this.weatherGUI);
        this.createForm();

        //Creating elements 
        const weatherInfo = document.createElement("ul");

        const city = document.createElement("li");
        const cityText = document.createTextNode(`City: ${weatherData.cityName}`);
        city.appendChild(cityText);
        weatherInfo.appendChild(city);

        if(weatherData.stateName != null) {
            const state = document.createElement("li");
            const stateText = document.createTextNode(`State: ${weatherData.stateName}`);
            state.appendChild(stateText);
            weatherInfo.appendChild(state);
        }

        const country = document.createElement("li");
        const countryText = document.createTextNode(`Country: ${weatherData.countryName}`);
        country.appendChild(countryText);
        weatherInfo.appendChild(country);

        const temperature = document.createElement("li");
        const temperatureText = document.createTextNode(`Temperature: ${weatherData.temperature}`);
        temperature.appendChild(temperatureText);
        weatherInfo.appendChild(temperature);

        const weatherType = document.createElement("li");
        const weatherTypeText = document.createTextNode(`Weather Type: ${weatherData.weatherType}`);
        weatherType.appendChild(weatherTypeText);
        weatherInfo.appendChild(weatherType);

        const windSpeed = document.createElement("li");
        const windSpeedText = document.createTextNode(`Wind Speed: ${weatherData.windSpeed}`);
        windSpeed.appendChild(windSpeedText);
        weatherInfo.appendChild(windSpeed);

        const humidity = document.createElement("li");
        const humidityText = document.createTextNode(`Humidity: ${weatherData.humidity}`);
        humidity.appendChild(humidityText);
        weatherInfo.appendChild(humidity);

        const units = document.createElement("li");
        const unitsText = document.createTextNode(`Units: ${weatherData.units}`);
        units.appendChild(unitsText);
        weatherInfo.appendChild(units);

        this.weatherGUI?.appendChild(weatherInfo);
    }

    private clearNode(node: HTMLElement) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    public get inputText(): string {
        if(this.searchField?.value != undefined)
            return this.searchField?.value;
        return '';
    }

    private createForm() {
        this.weatherGUI = document.createElement("main");
        this.weatherGUI.setAttribute('id', 'gui');
        this.searchForm = document.createElement("form");
        this.searchField = document.createElement("input");
        const submitButton = document.createElement("input");
        this.searchField.setAttribute('type', 'text');
        this.searchField.setAttribute('placeholder', 'Enter a location...');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit');
        document.body.appendChild(this.weatherGUI);
        this.weatherGUI.appendChild(this.searchForm);
        this.searchForm.appendChild(this.searchField);
        this.searchForm.appendChild(submitButton);
        this.appendForm(this.searchForm);
    }

    private appendForm(form: HTMLFormElement): void {
        this.weatherGUI?.appendChild(form);
    }
}