<script>
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    export let steps;
    export let title;
    let step = writable(0);
    export let onClose;
    setContext("onClose", onClose);
    setContext("step", step);
</script>

<section class="grid gap">
    <div>
        <button class="holed" on:click={onClose}>
            <iconify-icon icon="lucide:x" />
        </button>
        <p>
            {title} (Paso {$step + 1} de {steps})
        </p>
    </div>
    <slot step={$step} udpateStep={(s) => ($step = s)} />
</section>

<style>
    section {
        position: absolute;
        inset: 0 0 0 0;
        padding: clamp(1rem, 2vw, 3rem);
        background-color: white;
    }
    button {
        position: absolute;
        left: -2rem;
    }
</style>
