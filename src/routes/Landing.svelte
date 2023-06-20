<script>
    import { Logo, Modal } from "../lib/components";
    import Three from "../lib/components/Three.svelte";
    import Login from "./Login.svelte";
    let login;
    const size = {};
</script>

<header>
    <nav class="container flex content gap items" style="--c: space-between">
        <a href="/">
            <img src="/images/logo.svg" alt="Logo" />
        </a>
        <div class="flex gap">
            <button on:click={(e) => (login = false)}>Iniciar sesion</button>
            <button on:click={(e) => (login = true)} class="holed"
                >Registrarse</button
            >
        </div>
    </nav>
</header>
<main class="container grid auto-fit content" style="gap: 1rem">
    <section class="flex direction content">
        <h1 class="wrap items" style="--i: end">
            <span>ASTREA</span>bank
        </h1>
        <div class="grid gap">
            <p>
                Cobra y estafa a las personas por transacciones que son gratis!
            </p>
            <div class="flex gap">
                <button on:click={(e) => (login = true)}>Empezar</button>
            </div>
        </div>
    </section>
    <section bind:clientWidth={size.width} bind:clientHeight={size.height}>
        {#if size.width && size.height}
            <Three {...size} />
        {/if}
    </section>
</main>

{#if login !== undefined}
    <Modal class="panel grid gap" onClose={(e) => (login = undefined)}>
        <Login signUp={login} />
    </Modal>
{/if}

<style>
    h1 {
        font-size: 2rem;
        font-weight: 800;
    }

    h1 span {
        background-image: linear-gradient(
            var(--angle, 45deg),
            var(--color1),
            var(--color2) 50%,
            var(--color3)
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-size: 5rem;
    }
    main {
        height: 100svh;
    }
    header {
        position: fixed;
        left: 0;
        right: 0;
        padding: 0.5rem 0;
    }
    a img {
        width: 3.5rem;
    }
</style>
