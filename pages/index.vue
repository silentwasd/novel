<script setup lang="ts">
import type Section from '~/types/Section';
import type Action from "~/types/Action";

const currentSectionId = ref<string>('welcome');
const currentSection   = computed<Section | undefined>(() => sections.find(section => section.id ==
                                                                                      currentSectionId.value));

const history = ref<string>('');

const sections: Section[] = [
    {
        id         : 'rain',
        title      : 'Дождь',
        description: 'Дождь начался внезапно. Еще минуту назад вы шли по безлюдной дороге, мечтая о горячем чае и пледе, а теперь стоите под жалким кустом, который явно не справляется с функцией зонтика. Капли все крупнее, а ветер начинает бросать их прямо в лицо.\n' +
                     '\n' +
                     'Вы осматриваетесь. Вдалеке в тумане вы замечаете очертания большого особняка. Это место выглядит так, будто в нем давно никто не живет.',
        variants   : [{
            label : 'Пойти к особняку',
            action: {
                type       : 'go',
                destination: 'mansion'
            }
        }]
    },

    {
        id         : 'mansion',
        title      : 'У входа в особняк',
        description: 'Вы стоите перед массивной деревянной дверью, которая выглядит так, будто пережила минимум три войны и пять ураганов. На табличке над дверью надпись:\n' +
                     '"Добро пожаловать. Заходи, если не испугался."',
        variants   : [{
            label : 'Открыть дверь',
            action: {
                type       : 'go',
                destination: 'welcome'
            }
        }]
    },

    {
        id: 'welcome',
        title: 'Особняк вечной суеты',
        description: 'Вы тянетесь, чтобы постучать, но в этот момент дверь медленно начинает открываться сама. Скрип такой громкий, что кажется, будто где-то в особняке кто-то специально усилил звук для драматического эффекта.\n' +
                     '\n' +
                     'Как только дверь открывается, перед вами появляется... коврик с надписью:\n' +
                     '"Сними обувь. И перестань думать, что ты особенный."\n' +
                     '\n' +
                     'Из темноты доносится голос:\n' +
                     '"Проходи, дорогой! Не стесняйся. Если ты пришел за деньгами, у нас их нет. Но зато у нас есть приключения!"\n' +
                     '\n' +
                     'Вы осторожно делаете шаг внутрь. Но, как только вы переступаете порог, дверь захлопывается за вами с такой силой, что у вас перехватывает дыхание. С потолка падает записка, привязанная к воздушному шарику.\n' +
                     '\n' +
                     'Текст на записке:\n' +
                     '"Добро пожаловать в Особняк вечной суеты! Чтобы выбраться, просто найди выход. Ах да, выходов здесь… ну, почти нет. Удачи!"\n' +
                     '\n' +
                     'Внезапно свет включается, и перед вами открывается вестибюль. Пол потрескавшийся, стены украшены картинами с такими странными персонажами, что вам кажется, будто они наблюдают за вами. Из соседнего коридора слышен чавкающий звук.'
    }
];

function doAction(action: Action) {
    if (action.type == 'go') {
        currentSectionId.value = action.destination ?? '';
        return;
    }
}

watch(currentSection, section => {
    if (!section)
        return;

    history.value += `=== ${section.title} ===\n${section.description}\n\n`;
}, {immediate: true});
</script>

<template>
    <div class="flex flex-col gap-10 py-10">
        <UTextarea v-model="history"
                   :rows="15"
                   @keydown.prevent/>

        <div v-if="currentSection?.variants">
            <UButton v-for="variant in currentSection.variants"
                     :label="variant.label"
                     class="w-full"
                     size="xl"
                     color="gray"
                     @click="doAction(variant.action)"/>
        </div>
    </div>
</template>

<style scoped>

</style>