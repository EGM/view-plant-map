<script setup lang="ts">

import hereIcon from "../assets/here.png";
import { inject, ref, watch } from "vue";
import type { View } from "ol";
import type { ObjectEvent } from "ol/Object";
import type MapEvent from "ol/MapEvent";
import type { SelectEvent } from "ol/Interaction/Select"

const props = defineProps<{
    zoom: number,
    center: Array<number>,
    selectedId: string
}>()
const emit = defineEmits<{
    // (e: 'select', itemId: string, itemCenter: number[]): void,
    (e: 'selectFeatureEvent', itemID: string): void,
    (e: 'deselectFeatureEvent', itemID: string): void
}>()

// Initialize variables - geoJSON
const url = ref("https://raw.githubusercontent.com/EGM/egm.github.io/refs/heads/master/maps/wwtp1.json");
const format: any = inject("ol-format");
const geoJson = new format.GeoJSON();

// Initialize variables - Geolocation.
const projection = ref("EPSG:4326");
const view = ref<View>();
const position = ref([]);


const handleMapClick = (event: MapEvent) => {
    console.log("selectPoint: ", event);
}

const selectConditions: any = inject("ol-selectconditions");

const selectCondition = selectConditions.pointerMove;

console.log(props.selectedId.value)

/* Handle the event fired when the cursor is hovering over a feature, 
   or stops hovering over a map feature. */
const featureSelected = (event: SelectEvent) => {
    console.log("Event: ", event);
    if (event.selected.length === 1) {
        console.log("Select ID: ", event.selected[0].getId())
        console.log(event.selected[0].getStyle())
        emit('selectFeatureEvent', event.selected[0].getId() as string);
    }
    if (event.deselected.length === 1) {
        console.log("Deselect ID: ", event.deselected[0].getId())
        console.log(event.deselected[0].getStyle())
        emit('deselectFeatureEvent', event.deselected[0].getId() as string);
    }
};

const selectInteractionFilter = (feature) => {
    return feature.values_.name != undefined;
};

const geoLocChange = (event: ObjectEvent) => {
    console.log("AAAAA", event);
    position.value = event.target.getPosition();
    view.value?.setCenter(event.target?.getPosition());
};
</script>

<template>
    <ol-map @click="handleMapClick">
        <ol-view :center=center :zoom=zoom :projection=projection />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <!-- Geolocation, if allowed. -->
        <ol-geolocation :projection="projection" @change:position="geoLocChange">
            <template>
                <ol-vector-layer :zIndex="2">
                    <ol-source-vector>
                        <ol-feature ref="positionFeature">
                            <ol-geom-point :coordinates="position"></ol-geom-point>
                            <ol-style>
                                <ol-style-icon :src="hereIcon" :scale="0.1"></ol-style-icon>
                            </ol-style>
                        </ol-feature>
                    </ol-source-vector>
                </ol-vector-layer>
            </template>
        </ol-geolocation>

        <!-- Interact with map [hover/touch]. -->
        <ol-interaction-select @select="featureSelected" :condition="selectCondition" :filter="selectInteractionFilter">
            <ol-style>
                <ol-style-stroke color="green" :width="2"></ol-style-stroke>
                <ol-style-fill color="rgba(99,255,99,0.5)"></ol-style-fill>
            </ol-style>
        </ol-interaction-select>

        <!-- Draw features; color red. -->
        <ol-vector-layer>
            <ol-source-vector :url="url" :format="geoJson" />
            <ol-style>
                <ol-style-stroke color="red" :width="2"></ol-style-stroke>
                <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
            </ol-style>
        </ol-vector-layer>
    </ol-map>
</template>