<script setup lang="ts">
import { ref } from "vue";
import ViewDetails from "./components/ViewDetails.vue";
import ViewList from "./components/ViewList.vue";
import ViewMap from "./components/ViewMap.vue";
import featuresCollection from "./assets/wwtp1.json";
const itemSort = (a, b) => {
  const nameA = a.properties.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.properties.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
};
const features = featuresCollection.features.sort(itemSort);
const featureId = ref("01");
const mapCenter = ref([-81.20767148755314, 29.548722921422694]);
const filterById = item => item.id === featureId.value;
const handleSelect = (id, newCenter) => {
  featureId.value = id;
  mapCenter.value = newCenter;
}
const handleMapClickEvent = (id) => {
  featureId.value = id;
  console.log(id)
}
</script>

<template>
  <div style="display: flex;">
    <ViewMap :zoom="19" :center="mapCenter" class="map-size" @mapClickEvent="handleMapClickEvent"></ViewMap>

    <div>
      <div class="container scrollY">
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

.scrollY {
  overflow-y: scroll;
}</style>