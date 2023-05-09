<script setup>
import { RouterLink } from 'vue-router';
import { imgUrl } from "@/static";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const props = defineProps({
    newInfo: {
        type: Object,
        required: true
    }
})

</script>
<template>
    <RouterLink :to="`/${locale}/news/${newInfo?.detailpage[0]}`" class="news__slide">
        <img v-lazy="imgUrl + newInfo?.image" alt="" class="news__slide-banner">
        <div class="news__slide-content">
            <span class="news__slide-date">{{ newInfo?.post_time }}</span>
            <h3 class="news__slide-title">{{ newInfo?.title_ru || newInfo?.title_en }}</h3>
            <p class="news__slide-txt">
                {{ $t("news.more") }}
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0001 30.5834L30.5834 16.0001L16.0001 1.41675M30.5834 16.0001L1.41675 16.0001"
                        stroke="#D2D5DA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </p>
        </div>
    </RouterLink>
</template>

<style lang="scss" scoped></style>