<script setup lang="ts">
import type Item from "~/types/Item";

const items = useLocalStorage<Item[]>('items', () => [], {
    initOnMounted: true
});

const nextItemId = useLocalStorage<number>('nextItemId', () => 1, {
    initOnMounted: true
});

const editItemShown = ref<boolean>(false);
const editItemState = ref<Item>({
    id         : 0,
    name       : '',
    description: ''
});

function newItem() {
    editItemState.value = {
        id         : nextItemId.value++,
        name       : '',
        description: ''
    };
}

function editItem(item: Item) {
    editItemState.value = {
        ...item
    };
}

function updateItem() {
    const index = items.value.findIndex(item => item.id == editItemState.value.id);

    if (index >= 0) {
        items.value[index] = {...editItemState.value};
    } else {
        items.value.push({...editItemState.value});
    }

    editItemShown.value = false;
}
</script>

<template>
    <div class="flex flex-col gap-5">
        <UButton label="Add item"
                 icon="i-heroicons-plus"
                 color="gray"
                 @click="newItem(); editItemShown = true"/>

        <div v-for="item in items"
             class="bg-gray-800 border border-gray-700 rounded p-2.5 flex flex-col gap-1.5">
            <p class="text-sm">ID: {{ item.id }}</p>

            <h1 class="font-semibold">{{ item.name }}</h1>

            <p class="line-clamp-3 text-xs">{{ item.description }}</p>

            <div class="mt-1 flex items-center gap-2.5">
                <UButton color="gray"
                         label="Edit"
                         icon="i-heroicons-pencil-solid"
                         @click="editItemShown = true; editItem(item)"/>

                <UButton color="gray"
                         label="Delete"
                         icon="i-heroicons-trash-solid"
                         @click="items = items.filter(_item => item != _item)"/>
            </div>
        </div>
    </div>

    <UModal v-model="editItemShown">
        <UForm :state="editItemState" @submit="updateItem">
            <UCard :ui="{ring: ''}">
                <div class="flex flex-col gap-2.5">
                    <UFormGroup label="Name">
                        <UInput v-model="editItemState.name"/>
                    </UFormGroup>

                    <UFormGroup label="Description">
                        <UTextarea v-model="editItemState.description"
                                   :rows="10"/>
                    </UFormGroup>
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