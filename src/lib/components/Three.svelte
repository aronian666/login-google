<script>
    import { onMount, setContext } from "svelte";
    import {
        Mesh,
        BoxGeometry,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
        DirectionalLight,
        PointLight,
        MeshStandardMaterial,
        AmbientLight,
    } from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
    import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
    export let width;
    export let height;
    let canvas;
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    const scene = new Scene();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/loaders/draco/");
    const light = new PointLight("white", 1);
    light.position.set(4, 4, 4);
    scene.add(light);
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    let updates = [];
    setContext("scene", scene);
    setContext("camera", camera);

    onMount(async () => {
        const renderer = new WebGLRenderer({ canvas });
        const model = await gltfLoader.loadAsync("/models/cardwithout.glb");
        scene.add(model.scene);
        camera.position.z = 5;
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.max(2, window.devicePixelRatio));
        const controls = new OrbitControls(camera, canvas);
        function animate(time) {
            requestAnimationFrame(animate);
            updates.forEach((update) => update(time));
            controls.update();
            renderer.render(scene, camera);
        }
        animate(0);
        return () => {
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            controls.dispose();
        };
    });
</script>

<canvas bind:this={canvas} />
<slot />
