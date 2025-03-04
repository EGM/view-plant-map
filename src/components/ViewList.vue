<script setup lang="ts">
import { center } from "@turf/turf";
const props = defineProps<{ features: Array<any> }>()
const emit = defineEmits<{
    (e: 'select', itemId: number, itemCenter: number[]): void
}>()
</script>

<template>
    <ul>
        <li v-for="item in features" :key="item.id" @click="$emit('select', item.id, center(item).geometry.coordinates);">
            <div>
                <div>{{ item.id }}</div>
                <div>{{ item.properties.name }}</div>
            </div>
        </li>
    </ul>
</template>

<style scoped>
li {
    border-top-style: solid;
    border-top-width: 1px;
    font-size: 0.875rem;
    line-height: 1.4286;
    list-style-type: none;
}

li>div {
    display: flex;
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
</style>