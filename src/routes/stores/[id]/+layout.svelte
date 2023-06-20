<script>
    import { aside } from "../../../lib/stores";
    import { Aside, Layout } from "../../../lib/components";
    import { page } from "$app/stores";

    const path = `/stores/${$page.params.id}`;
    export let data;
    const pages = [
        {
            name: "Inicio",
            href: path,
            icon: "lucide:home",
            visible: [0, 1].includes(data.storeUser.role),
        },
        {
            name: "Operaciones del dia",
            href: path + "/last_records",
            icon: "lucide:folders",
            visible: [0, 1].includes(data.storeUser.role),
        },
        {
            name: "Registros",
            href: path + "/records",
            icon: "lucide:folder",
            visible: [0].includes(data.storeUser.role),
        },
        {
            name: "Usuarios",
            href: path + "/users",
            icon: "lucide:users",
            visible: [0].includes(data.storeUser.role),
        },
        {
            name: "Tarifas",
            href: path + "/rates",
            icon: "akar-icons:coin",
            visible: [0].includes(data.storeUser.role),
        },
        {
            name: "Tienda",
            href: path + "/edit",
            icon: "lucide:store",
            visible: [0].includes(data.storeUser.role),
        },
    ];
</script>

<Layout>
    {#if $aside}
        <Aside pages={pages.filter((page) => page.visible)} />
    {/if}
    <div style="flex: 1 1 90%; overflow-y: auto" class="border5 flex direction">
        <slot />
    </div>
</Layout>
