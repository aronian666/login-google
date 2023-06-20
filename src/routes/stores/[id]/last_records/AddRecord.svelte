<script>
    import { getContext } from "svelte";
    import { Form, Input } from "../../../../lib/components";
    export let record;
    export let rates = [];
    console.log(
        rates
            .filter((record) => record.type_id === 5)
            .sort((a, b) => a.min - b.max)
    );
    const onClose = getContext("onClose");
    $: {
        const rate = rates.find(
            ({ min, max, type_id }) =>
                record.value >= min &&
                record.value < max &&
                type_id === record.type_id
        );
        record.commission = rate ? rate.commission : 0;
    }
</script>

<h2>Agregar fondos</h2>
<div class="flex gap5">
    <button
        style="--color: var(--dark)"
        class={record.type_id === 5 ? "alpha" : "holed"}
        on:click={(e) => (record.type_id = 5)}
        type="button"
    >
        Yape
    </button>
    <button
        style="--color: var(--dark)"
        class={record.type_id === 4 ? "alpha" : "holed"}
        on:click={(e) => (record.type_id = 4)}
        type="button"
    >
        Recarga
    </button>
</div>
<Form
    onSubmit={async (e) => {
        await record.create(false);
        onClose();
    }}
>
    <Input
        name="record[value]"
        type="number"
        step="0.01"
        title="Monto"
        bind:value={record.value}
        required
    />
    {#if record.type_id === 5}
        <Input
            type="number"
            name="record[commission]"
            title="Comision"
            step="0.1"
            bind:value={record.commission}
            required
            readonly
        />
    {/if}
    <button type="submit">Agregar</button>
</Form>
