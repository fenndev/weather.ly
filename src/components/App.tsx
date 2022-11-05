import WeatherDisplay from "./WeatherDisplay";
import QueryForm from "./QueryForm";

import { Component } from "preact";

class App extends Component {
    
    render() {
        return (
            <>
                <QueryForm />
                <WeatherDisplay />
            </>
        )
    };
}

export default App;