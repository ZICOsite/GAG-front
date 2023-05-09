<script setup>
import { RouterLink, useRoute } from 'vue-router';
import Tr from "@/i18n/translation";
import { imgUrl } from "@/static";
import { useNewStore } from "@/stores/newStore";
import { onMounted } from 'vue';
import News from "@/components/Home/news/News.vue";

const route = useRoute();

const newStore = useNewStore();

onMounted(() => {
    newStore.getNew(+route.params.id)
})

</script>

<template>
    <main>
        <section class="new">
            <div class="container">
                <div class="breadcrump">
                    <ol class="breadcrump-list">
                        <li class="breadcrump-item">
                            <RouterLink :to="Tr.i18nRoute({name: 'Home'})" class="breadcrump-link">{{ $t("breadcrumb.Home") }}</RouterLink>
                        </li>
                        <li class="breadcrump-item">
                            <RouterLink :to="Tr.i18nRoute({name: 'news'})" class="breadcrump-link">{{ $t("breadcrumb.news") }}</RouterLink>
                        </li>
                        <li class="breadcrump-item">
                            <span class="breadcrump-link breadcrump-current">{{ $t("breadcrumb.expanding") }}</span>
                        </li>
                    </ol>
                </div>
                <div class="new__content">
                    <div class="new__content-top">
                        <span class="new__content-date">{{ newStore?.newSingle?.post_time }}</span>
                        <span class="new__content-time">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" stroke="#6A7181" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M11 8V13H16" stroke="#6A7181" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            {{ newStore?.newSingle?.reading_time_ru || newStore?.newSingle?.reading_time_en }}</span>
                    </div>
                    <h2 class="new__content-title">{{ newStore?.newSingle?.title_ru || newStore?.newSingle?.title_en }}</h2>
                    <img v-lazy="imgUrl + newStore?.newSingle?.image" alt="" class="new__content-banner">
                    <p class="new__content-success">{{ $t("news.success") }}</p>
                    <h3 class="new__content-title">{{ newStore?.newSingle?.title_ru || newStore?.newSingle?.title_en }}</h3>
                    <p class="new__content-txt">{{ newStore?.newSingle?.text_ru || newStore?.newSingle?.text_en }}</p>
                    <strong class="new__content-author">{{ $t("news.author") }}: <span>{{ newStore?.newSingle?.publication_author_ru || newStore?.newSingle?.publication_author_en }}</span></strong>
                </div>
            </div>
        </section>
        <News/>
    </main>
</template>