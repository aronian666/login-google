<script>
    import { page } from "$app/stores";
    import { aside } from "../../lib/stores";
</script>

<div class="layout">
    <header class="flex direction content">
        <nav class="flex content" style="--c: space-between">
            <div class="flex gap items">
                <button
                    class="z1 float"
                    type="button"
                    on:click={() => ($aside = !$aside)}
                >
                    <iconify-icon icon="lucide:menu" width="1.75rem" />
                </button>
                <a href="/"> <img src="/images/logo.svg" alt="Logo" /></a>
            </div>
            <div class="flex gap">
                <a href="/profile" class="button z1 float">
                    <iconify-icon icon="lucide:settings" width="1.75rem" />
                </a>
                <div class="pop flex content">
                    <button class="z0" type="button">
                        <img
                            class="rounded"
                            src={$page.data.current_user.picture}
                            alt={$page.data.current_user.name}
                        />
                    </button>
                    <div class="panel left shadow gap" style="--display: grid">
                        <section class="flex gap">
                            <img
                                class="rounded"
                                src={$page.data.current_user.picture}
                                alt={$page.data.current_user.name}
                            />
                            <div class="self">
                                <h3 style="font-weight: 500;">
                                    {$page.data.current_user.name}
                                </h3>
                                <p>{$page.data.current_user.email}</p>
                            </div>
                        </section>
                        <div class="divider" />
                        <section class="grid gap5">
                            <a
                                href="/profile"
                                class="button float content"
                                style="--c: start">Profile</a
                            >
                            <button class="float content" style="--c: start"
                                >Crear tienda</button
                            >
                            <form action="/?/signOut" method="post">
                                <button
                                    class="float content"
                                    style="--c: start"
                                    type="submit">Cerrar sesion</button
                                >
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main class="flex gap5" style="padding: 0 0.5rem;">
        <slot />
    </main>
</div>

<style>
    .layout {
        display: grid;
        grid-template-rows: 72px calc(100vh - 72px - 1rem);
        height: 100vh;
        gap: 0.5rem;
        padding-bottom: 0.5rem;
    }
    img {
        width: 3rem;
    }
    section img {
        width: 5rem;
    }
    header {
        background-color: white;
        padding: 0 1rem;
    }

    p {
        font-size: 0.9rem;
        font-weight: 300;
    }
</style>
