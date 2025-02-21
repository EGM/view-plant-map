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
  <div class="flex">
    <ViewMap class="w-full md:w-5/6" :zoom="19" :center="mapCenter"></ViewMap>
    <div>
      <div class="w-68 med:w-68 h-1/2 border-2 rounded-lg">
        <ViewList :features="features" class="overflow-scroll h-full" @select="handleSelect" />
      </div>
      <div class="w-68 med:w-68 h-1/2 border-2 rounded-lg">
        <h2>Details:</h2>
        <ViewDetails :feature="features.find(filterById)" />
      </div>
    </div>
  </div>
</template>