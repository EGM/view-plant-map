<script setup lang="ts">
defineProps<{ feature: any }>()
</script>

<template>
    <div>
        ID: {{ feature.id }}<br />
        Name: {{ feature.properties.name }}
    </div>
</template>

<style scoped>
    div {
        padding-left: 1rem;
    }
</style>