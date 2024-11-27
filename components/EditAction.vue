<script setup lang="ts">
import type Action from "~/types/Action";
import type Section from "~/types/Section";
import type Item from "~/types/Item";

const actionTypes = [{
    key  : 'nothing',
    label: 'Nothing'
}, {
    key  : 'go',
    label: 'Go to'
}, {
    key  : 'take_item',
    label: 'Take item'
}, {
    key  : 'return_item',
    label: 'Return item'
}];

const action   = defineModel<Action>({required: true});
const sections = useLocalStorage<Section[]>('sections', () => []);
const items    = useLocalStorage<Item[]>('items', () => []);
</script>

<template>
    <UFormGroup label="Type">
        <USelectMenu :options="actionTypes"
                     value-attribute="key"
                     v-model="action.type"/>
    </UFormGroup>

    <UFormGroup v-if="action.type == 'go'"
                label="Destination">
        <USelectMenu :options="sections"
                     option-attribute="title"
                     value-attribute="id"
                     searchable
                     v-model="action.destination"/>
    </UFormGroup>

    <UFormGroup v-if="['take_item', 'return_item'].includes(action.type)"
                label="Item">
        <USelectMenu :options="items"
                     option-attribute="name"
                     value-attribute="id"
                     searchable
                     v-model="action.item"/>
    </UFormGroup>
</template>

<style scoped>

</style>