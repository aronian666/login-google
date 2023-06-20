<script>
    export let pages = [];
    import { page } from "$app/stores";
</script>

<aside class="grid border5" style="flex: 1 1 260px">
    <nav class="flex direction" style="gap: 0.5rem">
        {#each pages as { name, icon, href }}
            <a
                class:float={$page.url.pathname !== href}
                {href}
                class="button flex content gap"
                style="--c: start"
            >
                <iconify-icon {icon} width="1.4rem" />
                {name}
            </a>
        {/each}
    </nav>
</aside>

<style>
    aside {
        padding: 1rem;
        background-color: white;
    }
</style>
