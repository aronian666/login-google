<script>
    import { Form, Input, Modal } from "../lib/components";
    import { StoreUser } from "../lib/tables";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { formater } from "../lib/utils";
    import { onMount } from "svelte";
    let storeUsers = [];
    onMount(async () => {
        const { data } = await StoreUser.all().match({
            user_id: $page.data.current_user.id,
        });
        storeUsers = data;
    });
    let store;
    let error;
</script>

<section>
    <div class="container flex direction" style="gap: 4rem">
        <div class="grid gap">
            <h1>Bienvenido a ASTREA!</h1>
            <p>
                Administra los pagos y transferencias de tus tarjetas, <br /> podras
                cobrar las comisiones que tu quieras!
            </p>
        </div>
        <div>
            <button class="holed" on:click={(e) => (store = {})}>
                Unirse a una tienda
            </button>
        </div>
        <div class="grid auto-fill gap">
            {#each storeUsers as { store, role }}
                <a href="/stores/{store.id}" class="panel border5">
                    <h2>{store.name}</h2>
                    <p>{StoreUser.roles[role]}</p>
                    <p class="font small gray">
                        {formater.format(new Date(store.created_at))}
                    </p>
                </a>
            {/each}
            <a href="/stores/new" class="button">
                <iconify-icon icon="lucide:plus" width="2rem" />
                Agregar
            </a>
        </div>
    </div>
</section>

{#if store}
    <Modal class="panel border5" onClose={(e) => (store = null)}>
        <Form
            onSubmit={async (e) => {
                const storeUser = new StoreUser({
                    user_id: $page.data.current_user.id,
                    store_id: store.id,
                    role: 1,
                });
                try {
                    await storeUser.create(false);
                    return goto("/stores/" + store.id);
                } catch {
                    error =
                        "La tienda que ingreso no exite! Pruebe otro codigo";
                }
            }}
        >
            <Input
                bind:value={store.id}
                name="store[id]"
                title="Codigo de la tienda"
                required
                {error}
            />
            <button type="submit">Ingresar</button>
        </Form>
    </Modal>
{/if}

<style>
    a {
        color: var(--dark);
        height: 200px;
    }
    h1 {
        font-size: 2.5rem;
    }
    p {
        font-size: 1.125rem;
        color: gray;
    }
    section {
        flex: 1 1 100%;
        padding-top: 4rem;
        background-image: url("/images/girl with card.svg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 15vw 0;
    }
    a.button {
        color: white;
    }
</style>
