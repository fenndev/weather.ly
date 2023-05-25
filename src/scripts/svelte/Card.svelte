<script lang="ts">
    import { date, time } from '../classes/Store';
    import { weather } from '../classes/Store';
    import Condition from './Components/Condition.svelte';
    import ConditionIcon from './Components/ConditionIcon.svelte';
    const convertUnits = (desiredUnits: string) => {
        weather.convertUnits(desiredUnits);
    };

    const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

    const getCountryName = (countryCode: string) =>
        countryNames.of(countryCode);
</script>

<main
    class="col-start-2 col-end-12 row-start-2 row-end-5 flex flex-col justify-between border border-black rounded-2xl p-8 shadow-md"
>
    <header class="info flex flex-wrap justify-between text-xl">
        <section class="info__datetime text-start">
            <p>{$date}</p>
            <p>{$time}</p>
        </section>
        <section class="info__location text-end">
            <p>
                {$weather.cityName}{#if $weather.stateName}, {$weather.stateName}{/if}
            </p>

            <p>{getCountryName($weather.countryName)}</p>
        </section>
    </header>
    <section
        class="conditions flex flex-col items-center justify-evenly flex-1"
    >
        <div class="conditions__main flex items-center gap-8">
            <ConditionIcon
                weatherType={$weather.weatherType.toLowerCase()}
                size={128}
            />
            <div class="conditions__desc">
                <p class="text-3xl">
                    {$weather.temperature}{$weather.temperatureUnits}
                </p>
                <p class="text-xl">{$weather.weatherType}</p>
            </div>
        </div>
        <div
            class="conditions__secondary w-full flex text-center justify-evenly text-lg"
        >
            <Condition
                conditionName="Humidity"
                conditionInfo={`${$weather.humidity}%`}
            />
            <Condition
                conditionName="Wind Speed"
                conditionInfo={`${$weather.windSpeed}${$weather.windSpeedUnits}`}
            />
            <Condition
                conditionName="Pressure"
                conditionInfo={`${$weather.pressure}hPa`}
            />
        </div>
    </section>
    <footer class="conditions__buttons flex justify-evenly">
        <button
            class="btn"
            class:selected={$weather.unitSystem === 'imperial'}
            on:click={() => convertUnits('imperial')}>Imperial</button
        >
        <button
            class="btn"
            class:selected={$weather.unitSystem === 'metric'}
            on:click={() => convertUnits('metric')}>Metric</button
        >
    </footer>
</main>

<style lang="postcss">
    .selected {
        background-color: #007bff;
        color: white;
        cursor: default;
    }
</style>
