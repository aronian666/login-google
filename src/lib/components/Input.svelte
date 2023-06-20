<script>
    export let name;
    export let title;
    export let value;
    export let error = false;
</script>

<fieldset>
    {#if title}
        <label for={name}>{title}</label>
    {/if}
    <input
        autocomplete="off"
        placeholder=" "
        id={name}
        {name}
        type="text"
        bind:value
        on:keypress
        on:blur
        {...$$restProps}
    />
    {#if error}
        <span>{error}</span>
    {/if}
</fieldset>

<style>
    span {
        color: var(--red);
        font-size: 0.8rem;
    }
</style>
