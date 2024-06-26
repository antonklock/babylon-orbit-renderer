import type { PageServerLoad } from './$types';
import { createClient } from 'redis';
import { env } from '$env/dynamic/private';
import { load as loadFromLglCore } from '@loaders.gl/core';
import { Tiles3DLoader } from '@loaders.gl/3d-tiles';
import { onDestroy } from 'svelte';

// let cachedTileset = null;

const client = createClient({
    url: env.SECRET_REDIS_URL
})

export const load = (async () => {
    if (!client.isOpen) await client.connect();

    const tilesetUrl = `https://tile.googleapis.com/v1/3dtiles/root.json?key=${env.SECRET_GOOGLE_MAPS_API_KEY}`;
    const cacheKey = 'tileset-' + tilesetUrl;

    let tileset;

    try {
        const cachedTileset = await client.get(cacheKey);

        if (cachedTileset) {
            tileset = JSON.parse(cachedTileset);
            // console.log('Tileset retrieved from cache:', tileset);
        } else {
            const tileset = await fetch(tilesetUrl);
            // tileset = await loadFromLglCore(tilesetUrl, Tiles3DLoader);
            await client.set(cacheKey, JSON.stringify(tileset));
            // console.log('Tileset cached:', tileset);
        }
    } catch (error) {
        console.error('Error interacting with Redis:', error);
    }

    // console.log(tileset.root.children);
    // console.log(tileset.root.children[0].children[0]);

    let contentUri = tileset.root.children[0].children[0].content.uri;

    if (contentUri.startsWith('/v1/3dtiles/')) {
        contentUri = contentUri.substring('/v1/3dtiles/'.length);
    }
    // const renderUrl = tileset.basePath + contentUri;
    // console.log(renderUrl);

    const renderUrl = 'https://tile.googleapis.com/v1/3dtiles/datasets/CgA/files/UlRPVEYuYnVs.json?session=CIqhrPOFvdHSYg&key=AIzaSyDzxgrPkpCqVDZHsd_QP-zzJ9onpjM4gzA'
    const renderResponse = await fetch(renderUrl);
    console.log('renderResponse:', renderResponse);

    // try {
    //     // const renderResponse = await fetch(renderUrl);
    //     // console.log('renderResponse:', renderResponse);

    //     fetch(renderUrl)
    //         .then(response => {
    //             console.log('HTTP Status Code:', response.status);

    //             // For debugging, let's see the content type 
    //             console.log('Content-Type:', response.headers.get('Content-Type'));

    //             // Convert response to text for initial inspection
    //             return response.text();
    //         })
    //         .then(data => {
    //             console.log('First few lines:', data.slice(0, 100)); // Adjust slice length if needed
    //         })
    //         .catch(error => {
    //             console.error('Error fetching glTF:', error);
    //         });
    // } catch (e) {
    //     console.error('Error fetching tileset:', e);
    // }



    // const contentUri = tileset.root.children[0].children[0].content.uri;
    // console.log(tileset);
    // const renderUrl = `https://tile.googleapis.com${contentUri}/&key=${env.SECRET_GOOGLE_MAPS_API_KEY}`;
    // console.log('contentUri: ' + contentUri);
    // console.log('renderUrl: ' + renderUrl);

    // const renderResponse = await fetch(renderUrl);
    // console.log('renderResponse:', renderResponse);

    return {
        contentUri,
    };
}) satisfies PageServerLoad;