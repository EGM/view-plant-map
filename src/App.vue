<script setup lang="ts">

import ViewList from "./components/ViewList.vue";
import ViewMap from "./components/ViewMap.vue";

</script>

<template>
  <div class="flex w-full h-full">
    <ViewMap class="w-5/6" initialZoom="18" initialCenter="[-81.2064552,29.5490275]"></ViewMap>
    <div>
      <div class="w-68 h-1/2 border-2 rounded-xl">
        <h2>Objects</h2>
        <ViewList  class="overflow-scroll h-full" @select="(name)=>{console.log(name)}"/>
      </div>
      <div class="w-68 h-1/2 border-2 rounded-xl">Box 3</div>
    </div>
  </div>
</template>

<style scoped>
@import "tailwindcss";
</style>
