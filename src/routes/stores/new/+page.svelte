<script>
    import { Store, StoreUser } from "../../../lib/tables";
    import { goto } from "$app/navigation";
    import Inputs from "../../../lib/components/Inputs.svelte";
    import Layout from "../../../lib/components/Layout.svelte";
    export let data;
    let store = new Store();
    const form = {
        name: { title: "Nombre de la tienda", required: true },
        address: { title: "Direccion", required: true },
        city: { title: "Ciudad", required: true },
        department: { title: "Departamento", required: true },
        script: { title: "Link del correo", required: true },
    };
</script>

<svelte:head>
    <title>Crear tienda</title>
</svelte:head>
<Layout>
    <section class="container flex direction gap panel border5">
        <div class="flex">
            <a href="/" class="holed button"> Atras </a>
        </div>
        <h1>Crear nueva tienda</h1>
        <form
            class="grid"
            on:submit|preventDefault={async () => {
                const { id } = await store.create(false);

                const storeUser = new StoreUser({
                    store_id: id,
                    user_id: data.current_user.id,
                });
                await storeUser.create();
                return goto(`/stores/${id}`);
            }}
        >
            <Inputs object={store} {form} />
            <button>Crear tienda</button>
        </form>
    </section>
</Layout>
