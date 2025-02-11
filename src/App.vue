<script setup lang="ts">
import { ref } from "vue";
import ViewDetails from "./components/ViewDetails.vue";
import ViewList from "./components/ViewList.vue";
import ViewMap from "./components/ViewMap.vue";
import featuresCollection from "./assets/wwtp1.json";
const features = featuresCollection.features;
const feature = ref("01")
const center = ref([-81.2064552,29.5490275])
</script>

<template>
  <div class="flex w-full h-full">
    <ViewMap  class="w-5/6" :zoom="18" :center="center"></ViewMap>
    <div>
      <div class="w-68 h-1/2 border-2 rounded-xl">
        <ViewList :features="features" class="overflow-scroll h-full" @select="(id)=>{feature = id}" />
      </div>
      <div class="w-68 h-1/2 border-2 rounded-xl">
        <h2>Details:</h2>
        <ViewDetails :feature="features.filter(item=>item.id === feature)[0]"/>
      </div>
    </div>
  </div>
</template>