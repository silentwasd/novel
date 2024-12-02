<script setup lang="ts">
import type Section from "~/types/Section";
import type Item from "~/types/Item";

const sections = useLocalStorage<Section[]>('sections', () => [], {
    initOnMounted: true
});

const items = useLocalStorage<Item[]>('items', () => [], {
    initOnMounted: true
});

const nextSectionId = useLocalStorage<number>('nextSectionId', () => 1, {
    initOnMounted: true
});

const visibilityTypes = [{
    key  : 'always',
    label: 'Always'
}, {
    key  : 'has_item',
    label: 'Has item'
}];

const startSection = useLocalStorage<number>('startSection', () => 0, {
    initOnMounted: true
});

const editSectionShown = ref<boolean>(false);
const editSectionState = ref<Section>({
    id         : 0,
    title      : '',
    description: '',
    variants   : [],
    startAction: {
        type: 'nothing'
    }
});

function newSection() {
    editSectionState.value = {
        id         : nextSectionId.value++,
        title      : '',
        description: '',
        variants   : [],
        startAction: {
            type: 'nothing'
        }
    };
}

function editSection(section: Section) {
    editSectionState.value = {
        ...section,
        startAction: {...section.startAction},
        variants: [
            ...section.variants.map(variant => ({
                ...variant,
                action    : {...variant.action},
                visibility: {...variant.visibility}
            }))
        ]
    };
}

function updateSection() {
    const index = sections.value.findIndex(section => section.id == editSectionState.value.id);

    if (index >= 0) {
        sections.value[index] = {...editSectionState.value};
    } else {
        sections.value.push({...editSectionState.value});
    }

    editSectionShown.value = false;
}

function addVariant() {
    editSectionState.value.variants.push({
        label     : '',
        action    : {
            type: 'nothing'
        },
        visibility: {
            type    : 'always',
            negative: false
        }
    });
}

function moveUp(array, index) {
    if (index <= 0 || index >= array.length) {
        return array; // Ничего не делаем, если индекс за пределами массива или элемент на верхней границе
    }
    // Меняем местами элементы
    [array[index], array[index - 1]] = [array[index - 1], array[index]];
    return array;
}

function moveDown(array, index) {
    if (index < 0 || index >= array.length - 1) {
        return array; // Ничего не делаем, если индекс за пределами массива или элемент на нижней границе
    }
    // Меняем местами элементы
    [array[index], array[index + 1]] = [array[index + 1], array[index]];
    return array;
}
</script>

<template>
    <div class="flex flex-col gap-5">
        <UButton label="Add section"
                 icon="i-heroicons-plus"
                 color="gray"
                 @click="newSection(); editSectionShown = true"/>

        <div v-for="section in sections"
             class="bg-gray-800 border border-gray-700 rounded p-2.5 flex flex-col gap-1.5">
            <p class="text-sm">ID: {{ section.id }}</p>

            <h1 class="font-semibold">{{ section.title }}</h1>

            <p class="line-clamp-3 text-xs">{{ section.description }}</p>

            <div class="mt-1 flex items-center gap-2.5">
                <UButton v-if="startSection != section.id"
                         color="gray"
                         label="Mark as start"
                         icon="i-heroicons-check"
                         @click="startSection = section.id"/>

                <UButton color="gray"
                         label="Edit"
                         icon="i-heroicons-pencil-solid"
                         @click="editSectionShown = true; editSection(section)"/>

                <UButton color="gray"
                         label="Delete"
                         icon="i-heroicons-trash-solid"
                         @click="sections = sections.filter(_section => section != _section)"/>
            </div>
        </div>
    </div>

    <UModal v-model="editSectionShown">
        <UForm :state="editSectionState" @submit="updateSection">
            <UCard :ui="{ring: ''}">
                <div class="flex flex-col gap-2.5">
                    <UFormGroup label="Title">
                        <UInput v-model="editSectionState.title"/>
                    </UFormGroup>

                    <UFormGroup label="Description">
                        <UTextarea v-model="editSectionState.description"
                                   :rows="10"/>
                    </UFormGroup>

                    <div v-if="editSectionState.startAction" class="flex flex-col gap-2.5">
                        <p class="font-semibold text-sm">Start action</p>

                        <div class="flex flex-col gap-2.5 border-s-2 border-primary bg-gray-950 p-2.5 rounded">
                            <EditAction v-model="editSectionState.startAction"/>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2.5">
                        <p class="font-semibold text-sm">Variants</p>

                        <UButton label="Add variant"
                                 icon="i-heroicons-plus"
                                 color="gray"
                                 @click="addVariant"/>

                        <div class="flex flex-col gap-2.5">
                            <div v-for="(variant, index) in editSectionState.variants"
                                 class="flex flex-col gap-2.5 border-s-2 border-primary bg-gray-950 p-2.5 rounded">
                                <div class="flex gap-2.5">
                                    <UInput v-model="variant.label"
                                            placeholder="Label"
                                            class="grow"/>

                                    <UButton icon="i-heroicons-arrow-up"
                                             color="gray"
                                             @click="editSectionState.variants = moveUp(editSectionState.variants, index)"/>

                                    <UButton icon="i-heroicons-arrow-down"
                                             color="gray"
                                             @click="editSectionState.variants = moveDown(editSectionState.variants, index)"/>

                                    <UButton icon="i-heroicons-trash-solid"
                                             color="gray"
                                             @click="editSectionState.variants = editSectionState.variants.filter(_variant => variant !== _variant)"/>
                                </div>

                                <div class="flex flex-col gap-2.5">
                                    <EditAction v-model="variant.action"/>

                                    <div class="flex gap-2.5">
                                        <UFormGroup label="Visibility type" class="grow">
                                            <USelectMenu :options="visibilityTypes"
                                                         value-attribute="key"
                                                         v-model="variant.visibility.type"/>
                                        </UFormGroup>

                                        <UFormGroup label="!" :ui="{label: {wrapper: 'justify-center'}}">
                                            <UCheckbox v-model="variant.visibility.negative"/>
                                        </UFormGroup>
                                    </div>

                                    <UFormGroup v-if="variant.visibility.type == 'has_item'"
                                                label="Item">
                                        <USelectMenu :options="items"
                                                     option-attribute="name"
                                                     value-attribute="id"
                                                     searchable
                                                     v-model="variant.visibility.item"/>
                                    </UFormGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-end items-center">
                        <UButton label="Apply"
                                 color="gray"
                                 type="submit"/>
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>

<style scoped>

</style>