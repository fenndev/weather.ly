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

<style>
    form {
        display: flex;
        flex-direction: row;
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