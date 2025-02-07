<script setup lang="ts">
import { Map, Layers, Sources } from "vue3-openlayers";
defineProps<{
    initialZoom: string,
    initialCenter: string
}>()
</script>

<template>
    <Map.OlMap style="min-width: 400px;" class="h-screen w-screen">
        <Map.OlView :center=JSON.parse(initialCenter) :zoom=JSON.parse(initialZoom) projection="EPSG:4326" />
        <Layers.OlTileLayer>
            <Sources.OlSourceOsm />
        </Layers.OlTileLayer>
    </Map.OlMap></template>

<style>
@import "tailwindcss";
</style>