<script lang="ts">
	import MapViewer from '$lib/Components/MapViewer.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<!-- <MapViewer tileset={data.tileset} /> -->
<MapViewer contentUri={data.contentUri} />
