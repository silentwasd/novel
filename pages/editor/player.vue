<script setup lang="ts">
import type Section from "~/types/Section";

const playerKey = ref<number>(1);

const sections = useLocalStorage<Section[]>('sections', () => [], {
    initOnMounted: true
});

const startSection = useLocalStorage<number>('startSection', () => 0, {
    initOnMounted: true
});

onMounted(() => {
    playerKey.value++;
});
</script>

<template>
    <div class="flex flex-col gap-2.5">
        <UButton label="Restart"
                 icon="i-heroicons-arrow-uturn-left"
                 color="gray"
                 @click="playerKey++"/>

        <StoryPlayer :key="playerKey"
                     :sections="sections"
                     :start-section="startSection"/>
    </div>
</template>

<style scoped>

</style>