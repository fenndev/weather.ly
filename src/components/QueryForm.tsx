import { Component } from "preact";
import queryWeather from "../scripts/query-weather";

class QueryForm extends Component {

    render() {
        return (
            <>
                <form>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" placeholder="Location" />
                    <button type="submit" value="Submit" />
                </form>
            </>
        )
    };
};

export default QueryForm;