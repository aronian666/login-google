<script>
    import { Table, Input } from "../../../../lib/components";
    import { Rate } from "../../../../lib/tables";
    export let data;
    const header = ["Nombre", "Tipo", "Comisiones", "Agregar"];

    const handleEdit = async (rate, index) => {
        if (![rate.commission, rate.min, rate.max].includes(null)) {
            const { data: rates } = await Rate.upsert(rate).select("*");
            data.operations[rates[0].type_id][index].id = rates[0].id;
            //document.activeElement.blur();
        }
    };
</script>

<section class="panel grid border5">
    <h1>Operaciones</h1>
    <table>
        <thead>
            <tr>
                {#each header as head}
                    <th>{head}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(data.operations) as [key, rates]}
                <tr>
                    <td>{rates[0].type.name}</td>
                    <td>
                        {rates[0].type.add ? "Aumento" : "Disminucion"}
                    </td>
                    <td>
                        {#each rates as rate, index}
                            <div class="flex gap5 items" style="--i: end">
                                <Input
                                    title="Desde"
                                    type="number"
                                    step="0.1"
                                    bind:value={rate.min}
                                    on:keypress={(e) => {
                                        if (e.key === "Enter")
                                            handleEdit(rate, index);
                                    }}
                                    on:blur={(e) => handleEdit(rate, index)}
                                />
                                <Input
                                    title="Hasta"
                                    type="number"
                                    step="0.1"
                                    bind:value={rate.max}
                                    on:keypress={(e) => {
                                        if (e.key === "Enter")
                                            handleEdit(rate, index);
                                    }}
                                    on:blur={(e) => handleEdit(rate, index)}
                                />
                                <Input
                                    title="Comision"
                                    type="number"
                                    step="0.1"
                                    bind:value={rate.commission}
                                    on:keypress={(e) => {
                                        if (e.key === "Enter")
                                            handleEdit(rate, index);
                                    }}
                                    on:blur={(e) => handleEdit(rate, index)}
                                />
                                {#if index !== 0}
                                    <button
                                        on:click={async (e) => {
                                            const deleted = data.operations[
                                                key
                                            ].splice(index, 1)[0];
                                            if (deleted.id)
                                                await Rate.delete({
                                                    id: deleted.id,
                                                });
                                            data = data;
                                        }}
                                        class="holed"
                                        style="--color: var(--red)"
                                    >
                                        Eliminar
                                    </button>
                                {/if}
                            </div>
                        {/each}
                    </td>
                    <td>
                        <button
                            on:click={(e) => {
                                data.operations[key].push({
                                    commission: 0,
                                    min: 0,
                                    max: 0,
                                    store_id: data.store.id,
                                    type_id: key,
                                });
                                data = data;
                            }}
                        >
                            Agregar
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>
