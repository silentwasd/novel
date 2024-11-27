<script setup lang="ts">
import type Section from "~/types/Section";
import type Action from "~/types/Action";

const props = defineProps<{
    sections: Section[],
    startSection: number
}>();

const currentSectionId = ref<number>(props.startSection);
const currentSection   = computed<Section | undefined>(() => props.sections.find(section => section.id ==
                                                                                            currentSectionId.value));

function doAction(action: Action) {
    switch (action.type) {
        case 'go':
            currentSectionId.value = action.destination;
            break;
    }
}
</script>

<template>
    <div v-if="currentSection" class="flex flex-col gap-5">
        <div class="flex flex-col gap-2.5">
            <h1 class="text-xl font-semibold">{{ currentSection.title }}</h1>

            <p v-for="line in currentSection.description.split('\n')">{{ line }}</p>
        </div>

        <div class="flex flex-col gap-2.5">
            <UButton v-for="variant in currentSection.variants"
                     :label="variant.label"
                     color="gray"
                     class="w-full"
                     @click="doAction(variant.action)"/>
        </div>
    </div>
</template>

<style scoped>

</style>