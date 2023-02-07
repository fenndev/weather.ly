<script lang="ts">
    let location = '';

    export let onSubmit: (location: string) => void;

    function handleSubmit(event: Event): void {
        let searchValue = (event.target as HTMLFormElement).elements.namedItem('location') as HTMLInputElement;
        location = searchValue.value;
        onSubmit(location);
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" name='location' placeholder="Enter a location...">
    <button type="submit">Submit</button>
</form>