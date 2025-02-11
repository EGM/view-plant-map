<script setup lang="ts">
defineProps<{ feature: any }>()
</script>

<template>
    <div>
        ID: {{ feature.id }}<br />
        Name: {{ feature.properties.name }}
    </div>
</template>