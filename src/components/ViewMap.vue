<script setup lang="ts">
import { defineProps, inject, ref } from "vue";

defineProps<{
    zoom: number,
    center: Array<number>
}>()
const url = ref("https://raw.githubusercontent.com/EGM/egm.github.io/refs/heads/master/maps/wwtp1.json");
const format = inject("ol-format");
const geoJson = new format.GeoJSON();
</script>

<template>
    <ol-map style="min-width: 400px;" class="h-screen w-screen">
        <ol-view :center=center :zoom=zoom projection="EPSG:4326" />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>
        <ol-vector-layer>
            <ol-source-vector :url="url" :format="geoJson" />
        </ol-vector-layer>
    </ol-map>
</template>