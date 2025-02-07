<script setup lang="ts">
import items from "../assets/wwtp1.json";
</script>

<template>
    <ul>
        <li v-for="item in items.features" @click="$emit('select', item.properties.name)" class="border-t-1 text-sm">
            {{ item.properties.name }} {{ item.id }}
        </li>
    </ul>
</template>

<style>
@import "tailwindcss"
</style>