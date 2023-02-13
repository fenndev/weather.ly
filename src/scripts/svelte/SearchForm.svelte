<script lang="ts">
    let location: string = '';
    let selectedUnitSystem: string = '';

    export let onSubmit: (location: string, unitSystem: string) => void;
    export let onUnitChange: () => void;

    function handleSubmit(event: Event): void {
        let searchValue = (event.target as HTMLFormElement).elements.namedItem('location') as HTMLInputElement;
        let unitSystem = (event.target as HTMLFormElement).elements.namedItem('units') as HTMLInputElement;
        location = searchValue.value;
        selectedUnitSystem = (unitSystem as HTMLInputElement).value;
        onSubmit(location, selectedUnitSystem);
    };

    function handleChange(): void { onUnitChange() }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div>
        <input type="text" name='location' placeholder="Enter a location...">
        <button type="submit">Submit</button>
    </div>
    <fieldset>
        <legend>Unit System: </legend>
        <div>
            <input required on:change|preventDefault={handleChange} type="radio" name="units" id="metric" value="metric">
            <label for="metric">Metric</label>
        </div>
        <div>
            <input required on:change|preventDefault={handleChange} type="radio" name="units" id="imperial" value="imperial">
            <label for="imperial">Imperial</label>
        </div>
    </fieldset>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    input[type="text"] {
        width: 400px;
        padding: 0;
        height: 40px;
        font-size: 18px;
        margin-right: 10px;
    }

    fieldset {
        
    }

    button[type="submit"] {
        width: 100px;
        height: 40px;
        background-color: blue;
        color: white;
        font-size: 18px;
        border: none;
        cursor: pointer;
    }
</style>