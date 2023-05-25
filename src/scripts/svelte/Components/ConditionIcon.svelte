<script lang="ts">
    export let weatherType: string;
    export let size: number = 64;
    if (weatherType == 'drizzle') weatherType = 'rain';
    import '/icons.svg';
</script>

<svg width={size} height={size}>
    <use href={`/icons.svg#icon-${weatherType}`} />
</svg>
