<script setup lang="ts">
const navigation = [{
    label: 'Sections',
    to   : '/editor',
    exact: true
}, {
    label: 'Items',
    to   : '/editor/items'
}, {
    label: 'Player',
    to   : '/editor/player'
}];
</script>

<template>
    <div class="flex flex-col py-10 gap-5">
        <div class="flex flex-col">
            <UHorizontalNavigation :links="navigation"/>

            <UDivider class="mb-5"/>

            <NuxtPage/>
        </div>
    </div>
</template>

<style scoped>

</style>