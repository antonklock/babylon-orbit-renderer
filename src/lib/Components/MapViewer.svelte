<script lang="ts">
	import { onMount } from 'svelte';
	import * as BABYLON from 'babylonjs';
	import 'babylonjs-loaders';
	import * as THREE from 'three';
	// import { load } from '@loaders.gl/core';
	// import { Tiles3DLoader } from '@loaders.gl/3d-tiles';

	// export let tileset: string;
	export let contentUri: string;

	let canvas: HTMLCanvasElement;

	onMount(async () => {
		console.log(contentUri);

		const engine = new BABYLON.Engine(canvas);
		const scene = new BABYLON.Scene(engine);

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

		try {
			// const tilesetJson = await load(tileset, Tiles3DLoader);
			// console.log(tileset);
			// console.log(tilesetJson);
			// console.log(tilesetJson.root.children[0].children[0].content.uri);
		} catch (e) {
			console.error(e);
		}

		engine.runRenderLoop(() => {
			scene.render();
		});
	});
</script>

<canvas bind:this={canvas}></canvas>
<p>{contentUri}</p>
