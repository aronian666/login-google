<script>
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import { page, navigating } from "$app/stores";
    import { loading } from "$lib/stores";
    import PageTransition from "./PageTransition.svelte";
    import { Logo } from "../lib/components";
    $: $loading = !!$navigating;
    export let data;

    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth");
            }
        });

        return () => subscription.unsubscribe();
    });
</script>

{#if $loading}
    <Logo />
{:else}
    <PageTransition url={$page.url.href}>
        <slot />
    </PageTransition>
{/if}
