<script setup lang="ts">
import hereIcon from "../assets/here.png";
import { inject, ref } from "vue";
import type { View } from "ol";
import type { ObjectEvent } from "ol/Object";
const projection = ref("EPSG:4326");
const props = defineProps<{
    zoom: number,
    center: Array<number>
}>()
const emit = defineEmits(['mapClickEvent']);

const url = ref("https://raw.githubusercontent.com/EGM/egm.github.io/refs/heads/master/maps/wwtp1.json");
const format: any = inject("ol-format");
const geoJson = new format.GeoJSON();

const view = ref<View>();
  const map = ref(null);
  const position = ref([]);


const selectPoint = (event) => {
    console.log(event);
}
const selectConditions = inject("ol-selectconditions");

const selectCondition = selectConditions.pointerMove;

const featureSelected = (event) => {
    console.log(event);
    if (event.selected.length === 1) {
        console.log("ID: ", event.selected[0].id_)
        emit('mapClickEvent', event.selected[0].id_);
    }
};

const selectInteactionFilter = (feature) => {
    return feature.values_.name != undefined;
};

const geoLocChange = (event: ObjectEvent) => {
    console.log("AAAAA", event);
    position.value = event.target.getPosition();
    view.value?.setCenter(event.target?.getPosition());
  };
</script>

<template>
    <ol-map @click="selectPoint">
        <ol-view :center=center :zoom=zoom projection="EPSG:4326" />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

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

        <ol-interaction-select @select="featureSelected" :condition="selectCondition" :filter="selectInteactionFilter">
            <ol-style>
                <ol-style-stroke color="green" :width="2"></ol-style-stroke>
                <ol-style-fill color="rgba(99,255,99,0.5)"></ol-style-fill>
            </ol-style>
        </ol-interaction-select>

        <ol-vector-layer>
            <ol-source-vector :url="url" :format="geoJson" />

            <ol-style>
                <ol-style-stroke color="red" :width="2"></ol-style-stroke>
                <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>

            </ol-style>
        </ol-vector-layer>
    </ol-map>
</template>