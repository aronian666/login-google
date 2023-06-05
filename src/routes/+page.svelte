<script>
    import Landing from "./Landing.svelte";
    export let data;
</script>

{#if data.current_user}
    <h1>{data.current_user.email}</h1>
{:else}
    <Landing />
{/if}
