<script>
    import { onMount } from "svelte";
    import { Logo } from "../lib/components";
    import NavHome from "./NavHome.svelte";

    let angle = 0;
    let plus = 1;
    onMount(() => {
        function interval() {
            const min = 1,
                max = 3;
            const rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 5 - 10
            plus = plus * -1;
            setTimeout(interval, rand * 1000);
        }
        interval();
        const animation = (time) => {
            angle += Math.round(Math.random()) * plus;
            requestAnimationFrame(animation);
        };
        animation(0);
    });
</script>

<NavHome />
<main class="container grid auto-fit content" style="gap: 1rem">
    <section class="flex direction content">
        <h1 class="wrap items" style="--i: end">
            <span style="--angle: {angle}deg">ASTREA</span>bank
        </h1>
        <div class="grid gap">
            <p>
                Cobra y estafa a las personas por transacciones que son gratis!
            </p>
            <div class="flex gap">
                <a href="/signIn" class="button">Mas informacion</a>
            </div>
        </div>
    </section>
    <section>
        <Logo />
    </section>
</main>

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
</style>
