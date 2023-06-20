<script>
    import { invalidateAll, invalidate } from "$app/navigation";
    /**
     * @type {function(): Promise<void> | undefined}
     */
    export let onSubmit;
    export let fetch;
    let loading = false;
    const handleSubmit = async (e) => {
        loading = true;
        if (onSubmit) await onSubmit(e);
        loading = false;
        if (fetch) invalidate(fetch);
        else invalidateAll();
    };
</script>

<form class:loading on:submit|preventDefault={handleSubmit}>
    <slot />
</form>
