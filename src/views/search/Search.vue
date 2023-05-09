<script setup>
import SearchProducts from "@/components/search-products/SearchProducts.vue";
import { useSearchStore } from '@/stores/searchStore';
import Tr from "@/i18n/translation";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const foundStore = useSearchStore();

const route = useRoute();
const router = useRouter();

const currentPage = ref(+route.query.page || 1);
const offset = ref(0);

const onClickHandler = (page) => {
    currentPage.value = page;
    offset.value = (12 * page) - 12;
    if (page === 1) {
        router.push(`${route.path}`);
    } else {
        router.push(`${route.path}?page=${page}`);
    }
    foundStore.getSearch(page, foundStore?.searchWord);
    window.scrollTo(0, 0);
};

onMounted(() => {
    foundStore.getSearch(currentPage.value, foundStore?.searchWord);
})

</script>

<template>
    <main>
        <section class="search results">
            <div class="container">
                <div class="breadcrump">
                    <ol class="breadcrump-list">
                        <li class="breadcrump-item">
                            <RouterLink :to="Tr.i18nRoute({ name: 'Home' })" class="breadcrump-link">{{
                                $t("breadcrumb.Home") }}</RouterLink>
                        </li>
                        <li class="breadcrump-item">
                            <RouterLink :to="Tr.i18nRoute({ name: 'search' })" class="breadcrump-link">{{
                                $t("breadcrumb.search") }}
                            </RouterLink>
                        </li>
                        <li class="breadcrump-item">
                            <span class="breadcrump-link breadcrump-current">{{ foundStore?.searchWord }}</span>
                        </li>
                    </ol>
                </div>
                <h2 class="search__title title">{{ $t("search.title.one") }} <span>{{ $t("search.title.two") }}</span></h2>
                <p class="search__txt" v-if="foundStore?.searchArr.length">{{ $t("search.txt.success.one") }} <i>"{{
                    foundStore?.searchWord }}"</i>, {{ $t("search.txt.success.two") }} {{ foundStore?.count }}
                </p>
                <p class="search__txt _error" v-else>{{ $t("search.txt.error.one") }}, <i>"{{ foundStore?.searchWord }}"</i>
                    {{ $t("search.txt.error.two") }}
                </p>
                <div class="results__cards">
                    <SearchProducts v-for="item in foundStore?.searchArr" :found="item" />
                </div>
                <vue-awesome-paginate v-if="foundStore?.searchArr.length" :total-items="foundStore?.count" :items-per-page="12" :max-pages-shown="5"
                    v-model="currentPage" :on-click="onClickHandler">
                    <template #prev-button>
                        <span>
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.0001 1.41675L1.41675 16.0001M1.41675 16.0001L16.0001 30.5834M1.41675 16.0001H30.5834"
                                    stroke="#191B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </template>
                    <template #next-button>
                        <span>
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.0001 30.5834L30.5834 16.0001L16.0001 1.41675M30.5834 16.0001L1.41675 16.0001"
                                    stroke="#191B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </template>
                </vue-awesome-paginate>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped></style>