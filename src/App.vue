<script setup lang="ts">
import { ref } from "vue";
import ViewDetails from "./components/ViewDetails.vue";
import ViewList from "./components/ViewList.vue";
import ViewMap from "./components/ViewMap.vue";
import featuresCollection from "./assets/wwtp1.json";

// Sort by name.
const byName = (a, b) => {
  const nameA = a.properties.name;
  const nameB = b.properties.name;
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

// Sort by tag.
const byTag = (a, b) => {
  const nameA = a.properties.tag; 
  const nameB = b.properties.tag; 
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

// Find by Id.
const byId = (item) => item.id === featureId.value;

// Initialize variables.
const features = featuresCollection.features.sort(byTag).sort(byName);
const featureId = ref("01");
const mapCenter = ref([-81.20767148755314, 29.548722921422694]);


const handleListSelect = (id, newCenter) => {
  console.log("handleSelect")
  featureId.value = id;
  mapCenter.value = newCenter;
}
const handleMapSelect = (id) => {
  console.log("handleMapClickEvent")
  featureId.value = id;
}
</script>

<template>
  <div style="display: flex;">
    <ViewMap :zoom="19" :center="mapCenter" :selectedId="featureId" class="map-size" @selectFeatureEvent="handleMapSelect" />

    <div>
      <div class="container scrollY">
        <ViewList :features="features" @select="handleListSelect" />
      </div>
      <div class="container">
        <h2>Details:</h2>
        <ViewDetails :feature="features.find(byId)" />
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
}
</style>