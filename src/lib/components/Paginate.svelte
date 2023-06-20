<script>
    import { page as pageStore } from "$app/stores";
    import { goto } from "$app/navigation";
    export let page;
    export let count;
    export let perPage = 10;
    const href = (page) => {
        $pageStore.url.searchParams.set("page", page);
        return $pageStore.url.pathname + $pageStore.url.search;
    };
    /* const updateParams = async (page) => {
        $pageStore.url.searchParams.set("page", page);
        //window.location.href = $pageStore.url;
        goto($pageStore.url);
    }; */
    $: paginates = Math.ceil(count / perPage);
    $: maxPages = Math.min(5, paginates);
    $: half = parseInt(maxPages / 2);
    $: rest = Array(maxPages)
        .fill(0)
        .map((a, index) => {
            if (page - half < 0) return index;
            if (page + maxPages > paginates)
                return paginates - maxPages + index;
            return index + page - half;
        });
</script>

<section class="flex" style="gap: 0.5rem">
    {#if page > 0}
        <a href={href(--page)}>
            <iconify-icon icon="lucide:left" width="1.5rem" />
        </a>
    {/if}
    {#if page - half > 0}
        <a href={href(0)}>1</a>
    {/if}
    {#if page - half > 0}
        <span>...</span>
    {/if}
    {#each rest as index}
        <a href={href(index)}>{index + 1}</a>
    {/each}
    {#if page + maxPages - half + 1 < paginates}
        <span>...</span>
    {/if}
    {#if page + maxPages - half + 1 < paginates}
        <a href={href(paginates - 1)}>{paginates}</a>
    {/if}
    {#if page < paginates - 1}
        <a href={href(++page)}
            ><iconify-icon icon="lucide:rigth" width="1.5rem" /></a
        >
    {/if}
</section>
