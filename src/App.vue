<script setup lang="ts">
import { ref } from "vue";
import ViewDetails from "./components/ViewDetails.vue";
import ViewList from "./components/ViewList.vue";
import ViewMap from "./components/ViewMap.vue";
import featuresCollection from "./assets/wwtp1.json";
const features = featuresCollection.features;
const featureId = ref("01");
const mapCenter = ref([-81.20767148755314, 29.548722921422694]);
const filterById = item => item.id === featureId.value;
const handleSelect = (id, newCenter) => {
  featureId.value = id;
  mapCenter.value = newCenter;
}
</script>

<template>
  <div style="display: flex;">
    <ViewMap :zoom="19" :center="mapCenter" class="map-size"></ViewMap>

    <div>
      <div class="container scrollXY">
        <ViewList :features="features" @select="handleSelect" />
      </div>
      <div class="container">
        <h2>Details:</h2>
        <ViewDetails :feature="features.find(filterById)" />
      </div>
    </div>

  </div>
</template>

<style scoped>
.map-size {
  height: 100vh;
  width: calc(100% - 17rem);
}
.container {
  width: 17rem;
  height: calc(1/2 * 100vh);
  border-style: solid;
  border-width: 2px;
  border-radius: 0.5rem;
}
.scrollXY {
  overflow: scroll;
}
</style>