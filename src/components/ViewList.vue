<script setup lang="ts">
defineProps<{ features: Array<any> }>()
</script>

<template>
    <ul>
        <li v-for="item in features" :key="item.id" @click="$emit('select', item.id)" class="border-t-1 text-sm">
            <div class="flex justify-between px-1">
                <div>{{ item.id }}</div>
                <div>{{ item.properties.name }}</div>
            </div>
        </li>
    </ul>
</template>