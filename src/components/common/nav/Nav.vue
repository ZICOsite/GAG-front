<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher.vue';
import Tr from "@/i18n/translation";
import { useSearchStore } from '@/stores/searchStore';

// icon

const icon = ref(true)

function showYellowIcon() {
    icon.value = false;
}

function showBlackIcon() {
    icon.value = true;
}

// icon

// burger and form search

const router = useRouter();
const route = useRoute();
const menu = ref(false);
const showSearch = ref(false);
const search = ref('');

const searchStore = useSearchStore();

function send() {
    searchStore.getSearch(1, search.value);
    router.push(Tr.i18nRoute({name: 'search'}));
    search.value = "";
    showSearch.value = false;
}

function showMenuPanel() {
    menu.value = !menu.value;
    showSearch.value = false;
    body.classList.toggle("hidden");
}

function closeMenuPanel() {
    menu.value = false;
    body.classList.remove("hidden");
}

function showSearchPanel() {
    if (menu.value) {
        showSearch.value = true;
        menu.value = false;
        body.classList.remove("hidden");
    } else {
        showSearch.value = true;
    }
}

// burger and form search

// page

const pages = ref([
    { path: "news", name: "nav.news" },
    { path: "jobs", name: "nav.vacansies" },
    { path: "contacts", name: "nav.contacts" },
])

// page

</script>

<template>
    <nav class="nav" id="nav">
        <div class="container">
            <div class="nav__main">
                <RouterLink :to="Tr.i18nRoute({name: 'Home'})" @click="closeMenuPanel" class="nav__logo"><img src="@/assets/images/logo.svg" alt="" width="105" height="57">
                </RouterLink>
                <form @submit.prevent="send" class="nav__form" v-if="showSearch">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z"
                            stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input type="text" class="nav__form-search" placeholder="Поиск по сайту" required v-model="search">
                    <svg v-if="search.length" @click="search = ''" width="24" height="24" style="cursor: pointer"
                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 19L5 5" stroke="#3E434C" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M19 5L5 19" stroke="#3E434C" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </form>
                <div :class="['nav__menu', { 'active': menu }]" v-else>
                    <ul class="nav__list">
                        <li class="nav__item">
                            <RouterLink :to="Tr.i18nRoute({name: 'company'})" @click="closeMenuPanel" class="nav__link nav__link_catalog" @mouseover="showYellowIcon"
                                @mouseout="showBlackIcon">
                                <svg width="24" height="24" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path v-if="icon"
                                        d="M15.6 8.9V13.22C15.6 14.2281 15.6 14.7321 15.4038 15.1172C15.2312 15.4559 14.9559 15.7312 14.6172 15.9038C14.2321 16.1 13.7281 16.1 12.72 16.1H8.4M15.6 8.9H11.28C10.2719 8.9 9.76786 8.9 9.38282 9.09619C9.04413 9.26876 8.76876 9.54413 8.59619 9.88282C8.4 10.2679 8.4 10.7719 8.4 11.78V16.1M15.6 8.9H18.12C19.1281 8.9 19.6321 8.9 20.0172 9.09619C20.3559 9.26876 20.6312 9.54413 20.8038 9.88282C21 10.2679 21 10.7719 21 11.78V18.62C21 19.6281 21 20.1321 20.8038 20.5172C20.6312 20.8559 20.3559 21.1312 20.0172 21.3038C19.6321 21.5 19.1281 21.5 18.12 21.5H11.28C10.2719 21.5 9.76786 21.5 9.38282 21.3038C9.04413 21.1312 8.76876 20.8559 8.59619 20.5172C8.4 20.1321 8.4 19.6281 8.4 18.62V16.1M15.6 8.9V6.38C15.6 5.37191 15.6 4.86786 15.4038 4.48282C15.2312 4.14413 14.9559 3.86876 14.6172 3.69619C14.2321 3.5 13.7281 3.5 12.72 3.5H5.88C4.87191 3.5 4.36786 3.5 3.98282 3.69619C3.64413 3.86876 3.36876 4.14413 3.19619 4.48282C3 4.86786 3 5.37191 3 6.38V13.22C3 14.2281 3 14.7321 3.19619 15.1172C3.36876 15.4559 3.64413 15.7312 3.98282 15.9038C4.36786 16.1 4.87191 16.1 5.88 16.1H8.4"
                                        stroke="#191B1F" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path v-else fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12.72 3H5.88C4.87191 3 4.36786 3 3.98282 3.19619C3.64413 3.36876 3.36876 3.64413 3.19619 3.98282C3 4.36786 3 4.87191 3 5.88V12.72C3 13.7281 3 14.2321 3.19619 14.6172C3.36876 14.9559 3.64413 15.2312 3.98282 15.4038C4.36786 15.6 4.87191 15.6 5.88 15.6H8.4V18.12C8.4 19.1281 8.4 19.6321 8.59619 20.0172C8.76876 20.3559 9.04413 20.6312 9.38282 20.8038C9.76786 21 10.2719 21 11.28 21H18.12C19.1281 21 19.6321 21 20.0172 20.8038C20.3559 20.6312 20.6312 20.3559 20.8038 20.0172C21 19.6321 21 19.1281 21 18.12V11.28C21 10.2719 21 9.76786 20.8038 9.38282C20.6312 9.04413 20.3559 8.76876 20.0172 8.59619C19.6321 8.4 19.1281 8.4 18.12 8.4H15.6V5.88C15.6 4.87191 15.6 4.36786 15.4038 3.98282C15.2312 3.64413 14.9559 3.36876 14.6172 3.19619C14.2321 3 13.7281 3 12.72 3ZM15.6 8.4H11.28C10.2719 8.4 9.76786 8.4 9.38282 8.59619C9.04413 8.76876 8.76876 9.04413 8.59619 9.38282C8.4 9.76786 8.4 10.2719 8.4 11.28V15.6H12.72C13.7281 15.6 14.2321 15.6 14.6172 15.4038C14.9559 15.2312 15.2312 14.9559 15.4038 14.6172C15.6 14.2321 15.6 13.7281 15.6 12.72V8.4Z"
                                        fill="#FFBF01" />
                                </svg>
                                {{ $t("nav.catalog") }}
                            </RouterLink>
                        </li>
                        <li class="nav__item">
                            <a href="#info" class="nav__link" v-if="route.name == 'Home'" @click="closeMenuPanel">{{ $t("nav.company") }}</a>
                            <RouterLink :to="Tr.i18nRoute({name: 'company'})" class="nav__link" @click="closeMenuPanel" v-else>
                                {{ $t("nav.company") }}
                            </RouterLink>
                        </li>
                        <li class="nav__item" v-for="(page, idx) in pages" :key="idx" @click="closeMenuPanel">
                            <RouterLink :to="Tr.i18nRoute({ name: page.path })" class="nav__link">
                                {{ $t(page.name) }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <Transition name="fade">
                    <span class="nav__bg" v-if="showSearch" @click="showSearch = false"></span>
                </Transition>
            </div>
            <ul class="nav__lang">
                <LanguageSwitcher />
                <li class="nav__lang-search" @click="showSearchPanel">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z"
                            stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </li>
                <div class="nav__bar" @click="showMenuPanel">
                    <div :class="['nav__bar-line', { 'active': menu }]"></div>
                </div>
            </ul>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>