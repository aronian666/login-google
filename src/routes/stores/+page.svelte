<script>
    import { Form, Input, Modal } from "../../lib/components";
    import { Store, StoreUser } from "../../lib/tables";
    export let data;
    let store;
</script>

<div style="flex: 1 1 100%">
    <h1>Aqui iran las tiendas</h1>
    <section class="grid auto-fill gap">
        {#each data.stores as { store, role }}
            <a href={`/stores/${store.id}`} class="panel border1">
                <h2>{store.name}</h2>
                <p>{store.created_at}</p>
                <p>{StoreUser.roles[role]}</p>
            </a>
        {/each}
        <button on:click={() => (store = new Store())} class="border1">
            <iconify-icon icon="lucide:plus" width="2rem" />
            Agregar tienda
        </button>
    </section>
    <button>Unirse</button>
</div>

{#if store}
    <Modal class="panel" onClose={() => (store = null)}>
        <Form
            onSubmit={async () => {
                const { id } = await store.create(false);
                const storeUser = new StoreUser({
                    user_id: data.current_user.id,
                    store_id: id,
                });
                await storeUser.create();
                store = null;
            }}
            fetch="stores"
        >
            <Input
                required={true}
                name="store[name]"
                title="Nombre de la tienda"
                bind:value={store.name}
            />
            <button>Agregar</button>
        </Form>
    </Modal>
{/if}
