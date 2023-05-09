<script setup>
import NewsItem from "./NewsItem.vue";
import Tr from "@/i18n/translation";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper';
import { onMounted, ref } from 'vue';

import 'swiper/scss';
import { RouterLink } from "vue-router";
import { useNewsStore } from "@/stores/newsStore";

const modules = ref([Pagination, Navigation]);

const pagination = {
    el: '.news__pagination',
    type: 'fraction',
};

const navigation = { nextEl: '.news__controllers-next', prevEl: '.news__controllers-prev' };

const breakpoints = {
    '418': {
        slidesPerView: 1.6,
    },
    '576': {
        slidesPerView: 2,
    },
    '768': {
        slidesPerView: 3,
    },
    '1024': {
        slidesPerView: 4,
    },
};

const newsStore = useNewsStore();
onMounted(() => {
    newsStore.getNews();
})

</script>

<template>
    <section class="news">
        <div class="container">
            <div class="news__top">
                <h2 class="news__title title"><span>{{ $t("news.title.one") }}</span> {{ $t("news.title.two") }}</h2>
                <div class="news__controllers">
                    <div class="news__controllers-prev">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.0001 1.41675L1.41675 16.0001M1.41675 16.0001L16.0001 30.5834M1.41675 16.0001H30.5834"
                                stroke="#191B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div class="news__pagination"></div>
                    <div class="news__controllers-next">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0001 30.5834L30.5834 16.0001L16.0001 1.41675M30.5834 16.0001L1.41675 16.0001"
                                stroke="#191B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            <swiper class="news__slider" :modules="modules" :spaceBetween="24" :pagination="pagination"
                :navigation="navigation" :breakpoints="breakpoints">
                <swiper-slide class="news__slides" v-for="(item, idx) in newsStore?.news" :key="idx">
                    <NewsItem :newInfo="item" />
                </swiper-slide>
            </swiper>
            <RouterLink :to="Tr.i18nRoute({name: 'news'})" class="news__btn btn">
                {{ $t("news.all") }}
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0001 30.5834L30.5834 16.0001L16.0001 1.41675M30.5834 16.0001L1.41675 16.0001"
                        stroke="#191B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </RouterLink>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>