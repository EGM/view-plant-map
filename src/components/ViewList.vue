<script setup lang="ts">
import { center } from "@turf/turf";
const props = defineProps<{ features: Array<any> }>()
const emit = defineEmits<{
    (e: 'select', itemId: number, itemCenter: number[]): void
}>()
</script>

<template>
    <ul>
        <li v-for="item in features" :key="item.id" @click="$emit('select', item.id, center(item).geometry.coordinates);" class="border-t-1 text-sm">
            <div class="flex justify-between px-1">
                <div>{{ item.id }}</div>
                <div>{{ item.properties.name }}</div>
            </div>
        </li>
    </ul>
</template>
