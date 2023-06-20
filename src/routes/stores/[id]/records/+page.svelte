<script>
    import { Table, Filter } from "../../../../lib/components";
    import { page } from "$app/stores";
    import Paginate from "../../../../lib/components/Paginate.svelte";
    export let data;
    $: ({ filter, records } = data);
</script>

<section class="panel border5 grid gap">
    <Filter />
    {#if records}
        <Table
            header={["Operacion", "Fecha y hora", "Comision", "Imprimir"]}
            array={records}
            let:item
        >
            <tr>
                <td>{item.type.name}</td>
                <td>{item.created_at}</td>
                <td>{item.commission}</td>
                <td>
                    <a href="/stores/{$page.params.id}/records/{item.id}"
                        >imprimir</a
                    >
                </td>
            </tr>
        </Table>
        <Paginate
            count={data.count}
            page={filter.page}
            perPage={filter.perPage}
        />
    {:else}
        <p>No tienes registros</p>
    {/if}
</section>
