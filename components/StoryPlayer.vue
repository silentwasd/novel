<script setup lang="ts">
import type Section from "~/types/Section";
import type Action from "~/types/Action";
import type Item from "~/types/Item";
import type Variant from "~/types/Variant";

const props = defineProps<{
    sections: Section[],
    items: Item[],
    startSection: number
}>();

const currentSectionId = ref<number>(props.startSection);
const currentSection   = computed<Section | undefined>(() => props.sections.find(section => section.id ==
                                                                                            currentSectionId.value));

const inventory = ref<Item[]>([]);

const currentVariants = computed<Variant[]>(() => {
    if (!currentSection.value)
        return [];

    return currentSection.value.variants.filter(variant => {
        let visible = false;

        switch (variant.visibility.type) {
            case "has_item":
                visible = !!inventory.value.find(item => item.id == variant.visibility.item);
                break;

            case "always":
            default:
                visible = true;
        }

        return variant.visibility.negative ? !visible : visible;
    });
});

function doAction(action: Action) {
    switch (action.type) {
        case 'go':
            currentSectionId.value = action.destination;
            break;

        case 'take_item':
            inventory.value.push(props.items.find(item => item.id == action.item));
            break;
    }
}

const itemShown    = ref<boolean>(false);
const selectedItem = ref<Item>();
</script>

<template>
    <div v-if="currentSection" class="grid grid-cols-2 gap-5">
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2.5">
                <h1 class="text-xl font-semibold">{{ currentSection.title }}</h1>

                <p v-for="line in currentSection.description.split('\n')">{{ line }}</p>
            </div>

            <div class="flex flex-col gap-2.5">
                <UButton v-for="variant in currentVariants"
                         :label="variant.label"
                         color="gray"
                         class="w-full"
                         @click="doAction(variant.action)"/>
            </div>
        </div>

        <div class="flex flex-col gap-2.5">
            <h1 class="text-xl font-semibold">Inventory</h1>

            <UButton v-for="item in inventory"
                     color="gray"
                     :label="item.name"
                     @click="itemShown = true; selectedItem = item"/>
        </div>
    </div>

    <UModal v-model="itemShown">
        <UCard :ui="{ring: ''}">
            <h1 class="font-semibold text-lg">{{ selectedItem?.name }}</h1>

            <p v-for="line in selectedItem?.description.split('\n')">
                {{ line }}
            </p>
        </UCard>
    </UModal>
</template>

<style scoped>

</style>