<script lang="ts">
	import { onMount } from 'svelte';
	import * as BABYLON from 'babylonjs';
	import * as THREE from 'three';
	import { Tiles3DLoader } from '@loaders.gl/3d-tiles';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const engine = new BABYLON.Engine(canvas);
		const scene = new BABYLON.Scene(engine);
		// ... set up camera, load 3D Tiles, etc.

		//Add a camera, a light and a cube object
		let camera = new BABYLON.ArcRotateCamera(
			'Camera',
			Math.PI / 2,
			Math.PI / 4,
			2,
			new BABYLON.Vector3(0, 0, 0),
			scene
		);
		camera.attachControl(canvas, true);
		let light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);
		let sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);

		engine.runRenderLoop(() => {
			scene.render();
		});
	});
</script>

<canvas bind:this={canvas}></canvas>
