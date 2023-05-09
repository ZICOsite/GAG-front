<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { imgUrl } from "@/static";

const props = defineProps({
    found: {
        type: Object,
        default: null
    }
})

const { locale } = useI18n();

</script>

<template>
    <RouterLink :to="`/${locale}/details/${found?.product_detailpage[0]}`" class="results__card">
        <div class="results__card-image">
            <img v-lazy="imgUrl + found?.image" alt="" class="results__card-img">
        </div>
        <div class="results__card-desc">
            <h3 class="results__card-title">{{ found?.title_en || found?.title_ru }}</h3>
            <div class="results__card-details">
                <p class="results__card-txt"><span>{{ $t("catalog.desc.manufacturer") }}: </span>{{ found?.producer_en ||
                    found?.producer_ru }}</p>
                <p class="results__card-txt"><span>{{ $t("catalog.desc.diameter") }}: </span>{{ found?.diameter_en ||
                    found?.diameter_ru }}</p>
                <p class="results__card-txt"><span>{{ $t("catalog.desc.model") }}: </span>{{ found?.model_en ||
                    found?.model_ru }}</p>
                <p class="results__card-txt"><span>{{ $t("catalog.desc.pressure") }}: </span>{{ found?.pressure_en ||
                    found?.pressure_ru }}</p>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss" scoped></style>