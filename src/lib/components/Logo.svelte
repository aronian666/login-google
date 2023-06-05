<script>
    import { onMount } from "svelte";

    let paths = [
        {
            d: "M0 67C0 29.9969 29.9969 0 67 0H72V85C72 122.003 42.0031 152 5 152H0V67Z",
        },
        {
            d: "M394 108.5C394 48.5771 345.423 0 285.5 0H284V152.5C284 212.423 332.577 261 392.5 261H394V108.5Z",
        },
        { d: "M82 0H190V261H187C129.01 261 82 213.99 82 156V0Z" },
        { d: "M273 0H201V154V154C240.765 154 273 121.765 273 82V0Z" },
        {
            d: "M110 274.5C110 214.577 61.4229 166 1.5 166H0V318.5C0 378.423 48.5771 427 108.5 427H110V274.5Z",
        },
        {
            d: "M322 342C322 304.997 351.997 275 389 275H394V360C394 397.003 364.003 427 327 427H322V342Z",
        },
        { d: "M118 427H190V273V273C150.235 273 118 305.235 118 345V427Z" },
        { d: "M309 427H201V166H204C261.99 166 309 213.01 309 271V427Z" },
    ];
    onMount(() => {
        const animate = async () => {
            paths = paths.map((path) => ({
                d: path.d,
                duration: Math.round(Math.random()),
                distance: Math.round(Math.random() * 5 + 10),
            }));
            setTimeout(animate, 5000);
        };
        animate();
    });
</script>

<svg
    width="600"
    height="650"
    viewBox="-150 -150 600 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g id="Logo">
        {#each paths as { d, duration, distance }, index (index)}
            <path
                {d}
                style={`--direction: ${
                    index >= 4 ? 1 : -1
                }; --duration: ${duration}; --distance: ${distance}`}
                fill="url(#g{index + 1})"
            />
        {/each}
    </g>
    <defs>
        <linearGradient
            id="g1"
            x1="72"
            y1="0"
            x2="0"
            y2="152"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#17EAD9" />
            <stop offset="0.44188" stop-color="#4586FF" />
            <stop offset="1" stop-color="#A35FBE" />
        </linearGradient>
        <linearGradient
            id="g2"
            x1="394"
            y1="0"
            x2="284"
            y2="261"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#17EAD9" />
            <stop offset="0.784722" stop-color="#4586FF" />
        </linearGradient>
        <linearGradient
            id="g5"
            x1="110"
            y1="166"
            x2="2.80237e-06"
            y2="427"
            gradientUnits="userSpaceOnUse"
        >
            <stop offset="0.0625" stop-color="#4586FF" />
            <stop offset="1" stop-color="#17EAD9" />
        </linearGradient>
        <linearGradient
            id="g6"
            x1="390.5"
            y1="273"
            x2="322"
            y2="427"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#A35FBE" />
            <stop offset="0.53125" stop-color="#4586FF" />
            <stop offset="1" stop-color="#17EAD9" />
        </linearGradient>
        <linearGradient
            id="g3"
            x1="136"
            y1="0"
            x2="136"
            y2="261"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#17EAD9" />
            <stop offset="0.769097" stop-color="#4586FF" />
        </linearGradient>
        <linearGradient
            id="g4"
            x1="273"
            y1="0"
            x2="201"
            y2="154"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#A35FBE" />
            <stop offset="0.515625" stop-color="#4586FF" />
            <stop offset="1" stop-color="#17EAD9" />
        </linearGradient>
        <linearGradient
            id="g7"
            x1="118"
            y1="427"
            x2="190"
            y2="273"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#A35FBE" />
            <stop offset="0.541667" stop-color="#4586FF" />
            <stop offset="1" stop-color="#17EAD9" />
        </linearGradient>
        <linearGradient
            id="g8"
            x1="255"
            y1="427"
            x2="255"
            y2="166"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#17EAD9" />
            <stop offset="0.748264" stop-color="#4586FF" />
        </linearGradient>
    </defs>
</svg>

<style>
    path {
        animation: animation calc(var(--duration) * 2.5s)
            cubic-bezier(1, 0, 0, 1) 0s alternate infinite;
        z-index: -1;
    }
    @keyframes animation {
        0%,
        10% {
            translate: 0;
        }

        70%,
        100% {
            translate: 0 calc(var(--direction) * var(--distance) * 1%);
        }
    }
</style>
