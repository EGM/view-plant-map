<script setup lang="ts">
defineProps<{ feature: any }>()
</script>

<template>
    <div>
        <p><label>ID:</label> {{ feature.id }}</p>
        <p><label>Name:</label> {{ feature.properties.name }}</p>
        <p><label>Description:</label> {{ feature.properties.description }}</p>
    </div>
</template>

<style scoped>
    div {
        padding-left: 1rem;
        font-size: 1.125rem;
    }
    label {
        color: #300;
        font-size: 0.875rem;
    }
    p {
        margin-top: 0.5rem;
    }
</style>