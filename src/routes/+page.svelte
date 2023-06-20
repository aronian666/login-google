<script>
    import Landing from "./Landing.svelte";
    import Home from "./Home.svelte";
    import { Layout } from "../lib/components";
    export let data;
</script>

<svelte:head>
    <title>Astrea</title>
</svelte:head>

{#if data.session}
    <Layout current_user={data.current_user}>
        <Home current_user={data.current_user} storeUsers={data.storeUsers} />
    </Layout>
{:else}
    <Landing />
{/if}
