<script setup>
import { imgUrl } from "@/static";
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const props = defineProps({
    product: {
        type: Object,
        required: true,
    }
})

</script>

<template>
    <RouterLink :to="`/${locale}/catalog/par_id=${product?.id}`" class="company__card">
        <h3 class="company__card-title">{{ product?.title_ru || product?.title_en }}</h3>
        <img :src="imgUrl + product?.image" alt="" class="company__card-image">
    </RouterLink>
</template>

<style lang="scss" scoped></style>