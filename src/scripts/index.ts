import WeatherController from "./classes/WeatherController";

(function main() {
    const weatherController = new WeatherController();
    if(weatherController != undefined) console.log("It works!!");
})();