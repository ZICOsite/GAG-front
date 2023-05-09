<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Tr from "@/i18n/translation";
import SearchProducts from "@/components/search-products/SearchProducts.vue";
import { storeToRefs } from 'pinia';
import { useCompanyCatalogStore } from "@/stores/companyCatalogStore";
import { useMainDirections } from '@/stores/mainDirectionsStore';
import { useI18n } from 'vue-i18n';
import { Products } from "@/assets/js/connect"
import { computed } from "@vue/reactivity";

const db = new Products();

const { locale } = useI18n();

const router = useRouter();
const route = useRoute();

const currentPage = ref(+route.query.page || 1);
const offset = ref(0);

const viewCards = ref(false);

const companyCatalogStore = useCompanyCatalogStore();
const mainDirectionsStore = useMainDirections();
const { getTotalCount } = storeToRefs(mainDirectionsStore);

const tags = ref([]);

const closeAllTags = (item) => {
    if (!item.open) {
        tags.value.forEach(el => el.open = false);
    }
    item.open = !item.open;
}

const onClickHandler = (page) => {
    currentPage.value = page;
    offset.value = (12 * page) - 12;
    if (page === 1) {
        router.push(`${route.path}`);
    } else {
        router.push(`${route.path}?page=${page}`);
    }
    companyCatalogStore.getCatalog(route.params.key, +route.params.id, page);
    window.scrollTo(0, 0);
};

const titleBreadCrumb = computed(() => mainDirectionsStore.getTitle(+route.params.id, route.params.nextId));

onMounted(async () => {
    try {
        const allDir = await db.getDirections();
        const openKeys = allDir.results.map(item => {
            const addKeyOpen = { ...item };
            addKeyOpen.open = false;
            tags.value.push(addKeyOpen);
        })
    } catch (error) {
        console.log(error);
    }
    mainDirectionsStore.breadcrumpId = +route.params.id;
    await companyCatalogStore.getCatalog(route.params.key, +route.params.id, currentPage.value);
    if (route.params.id && !route.params.nextId) {
        mainDirectionsStore.getTitle(+route.params.id, null);
    } else {
        mainDirectionsStore.getTitle(+route.params.id, route.params.nextId);
    }
})

</script>

<template>
    <section class="catalog">
        <div class="container">
            <div class="breadcrump">
                <ol class="breadcrump-list">
                    <li class="breadcrump-item">
                        <RouterLink :to="Tr.i18nRoute({ name: 'Home' })" class="breadcrump-link">{{ $t("breadcrumb.Home") }}
                        </RouterLink>
                    </li>
                    <li class="breadcrump-item">
                        <RouterLink :to="Tr.i18nRoute({ name: 'company' })" class="breadcrump-link">{{
                            $t("breadcrumb.direction") }}
                        </RouterLink>
                    </li>
                    <li class="breadcrump-item">
                        <span class="breadcrump-link breadcrump-current">{{ titleBreadCrumb }}</span>
                    </li>
                </ol>
            </div>
            <h2 class="catalog__title title">{{ titleBreadCrumb }}</h2>
            <div class="catalog__content">
                <aside class="catalog__sidebar">
                    <div class="catalog__category">
                        <h3 class="catalog__category-title">{{ $t("catalog.info_title") }}</h3>
                        <ul class="catalog__category-tags">
                            <li class="catalog__category-field" v-for="(tag, idx) in tags" :key="idx">
                                <div class="catalog__category-open">
                                    <h4 class="catalog__category-name" @click="closeAllTags(tag)">
                                        {{ tag?.title_en || tag?.title_ru }} ({{ getTotalCount(idx) }})
                                        <svg :class="!tag?.open ? 'rotate' : ''" width="24" height="24"
                                            style="cursor: pointer" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 19L5 5" stroke="#3E434C" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M19 5L5 19" stroke="#3E434C" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </h4>
                                    <ul class="catalog__category-body invisible" ref="body"
                                        :class="tag?.open ? 'visible' : ''"
                                        :style="tag?.open ? `height: ${$refs.body[idx].scrollHeight}px;` : 'height: 0;'">
                                        <li class="catalog__category-subcategory"
                                            v-for="(subcategory, idx2) in tag?.category" :key="idx2">
                                            <RouterLink :to="`/${locale}/catalog/cat_id=${subcategory.id}/${tag.id}`"
                                                class="catalog__category-subcategoryLink">
                                                {{
                                                    subcategory?.title_en || subcategory?.title_ru }}
                                                ({{ subcategory?.child_count }}) </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <a :href="db.file" class="catalog__sidebar-btn btn" download="">
                            {{ $t("catalog.download") }}
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 21.5C5.89543 21.5 5 20.6046 5 19.5V5.5C5 4.39543 5.89543 3.5 7 3.5H14L19 8.5V19.5C19 20.6046 18.1046 21.5 17 21.5H7Z"
                                    stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14 9.5L19 9.5L13 3.5V8.5C13 9.05228 13.4477 9.5 14 9.5Z" fill="#F9FAFB"
                                    stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9 15.5L12 18.5M12 18.5L15 15.5M12 18.5L12 12.5" stroke="#F9FAFB"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                    </div>
                    <div class="catalog__info">
                        <h3 class="catalog__info-title">{{ $t("company.help.title") }}</h3>
                        <p class="catalog__info-subtitle">{{ $t("company.help.txt") }}</p>
                        <a href="tel:+998909999999" class="catalog__info-tel">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.43898 6.96879C4.95901 13.7235 10.2765 19.041 17.0312 20.561C19.1865 21.046 21 19.2091 21 17V15.25C21 14.6977 20.5514 14.2547 20.0012 14.2063C18.9118 14.1104 17.8669 13.8593 16.8888 13.4751L15.1796 15.1843C12.3997 13.854 10.146 11.6003 8.81567 8.82037L10.5249 7.11118C10.1407 6.13313 9.88957 5.08823 9.79373 3.99877C9.74533 3.44861 9.30229 3 8.75 3H7C4.79086 3 2.95398 4.81355 3.43898 6.96879Z"
                                    stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="catalog__info-number">
                                +998 90 999 99 99
                                <span>{{ $t("hotline") }}</span>
                            </div>
                        </a>
                        <a href="tel:+998909999999" class="catalog__info-tel">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.43898 6.96879C4.95901 13.7235 10.2765 19.041 17.0312 20.561C19.1865 21.046 21 19.2091 21 17V15.25C21 14.6977 20.5514 14.2547 20.0012 14.2063C18.9118 14.1104 17.8669 13.8593 16.8888 13.4751L15.1796 15.1843C12.3997 13.854 10.146 11.6003 8.81567 8.82037L10.5249 7.11118C10.1407 6.13313 9.88957 5.08823 9.79373 3.99877C9.74533 3.44861 9.30229 3 8.75 3H7C4.79086 3 2.95398 4.81355 3.43898 6.96879Z"
                                    stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="catalog__info-number">
                                +998 90 999 99 99
                                <span>{{ $t("cooperation") }}</span>
                            </div>
                        </a>
                        <ul class="catalog__info-socialsMedia">
                            <li class="catalog__info-item">
                                <a href="#!" class="catalog__info-link _facebook">
                                    <svg width="30" height="34" viewBox="0 0 30 34" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.53494 7.06354C0.968273 7.95131 0 9.61293 0 11.4136V22.5864C0 24.3871 0.968275 26.0487 2.53494 26.9365L7.5 29.75L12.5349 32.6031C14.0641 33.4697 15.9359 33.4697 17.4651 32.6031L27.4651 26.9365C29.0317 26.0487 30 24.3871 30 22.5864V11.4136C30 9.61293 29.0317 7.95131 27.4651 7.06354L17.4651 1.39687C15.9359 0.530349 14.0641 0.53035 12.5349 1.39687L2.53494 7.06354Z"
                                            fill="#FFECB3" />
                                        <path
                                            d="M18.5413 17.8155L18.9041 15.301H16.6347V13.6699C16.6347 12.9818 16.9511 12.3107 17.9676 12.3107H19V10.1699C19 10.1699 18.0635 10 17.1685 10C15.2986 10 14.0776 11.2046 14.0776 13.3845V15.301H12V17.8155H14.0776V23.8947C14.4947 23.9643 14.9215 24 15.3562 24C15.7909 24 16.2176 23.9643 16.6347 23.8947V17.8155H18.5413Z"
                                            fill="#191B1F" />
                                    </svg>
                                </a>
                            </li>
                            <li class="catalog__info-item">
                                <a href="#!" class="catalog__info-link _whatsapp">
                                    <svg width="30" height="34" viewBox="0 0 30 34" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.53494 7.06354C0.968273 7.95131 0 9.61293 0 11.4136V22.5864C0 24.3871 0.968275 26.0487 2.53494 26.9365L7.5 29.75L12.5349 32.6031C14.0641 33.4697 15.9359 33.4697 17.4651 32.6031L27.4651 26.9365C29.0317 26.0487 30 24.3871 30 22.5864V11.4136C30 9.61293 29.0317 7.95131 27.4651 7.06354L17.4651 1.39687C15.9359 0.530349 14.0641 0.53035 12.5349 1.39687L2.53494 7.06354Z"
                                            fill="#FFECB3" />
                                        <path
                                            d="M7.00321 25L8.08481 21.0256C7.37212 19.8039 6.99769 18.4144 7.00001 17C7.00001 12.5816 10.5816 9 15 9C19.4184 9 23 12.5816 23 17C23 21.4184 19.4184 25 15 25C13.5862 25.0023 12.1973 24.6281 10.976 23.916L7.00321 25ZM12.1128 13.2464C12.0095 13.2528 11.9085 13.28 11.816 13.3264C11.7292 13.3755 11.65 13.437 11.5808 13.5088C11.4848 13.5992 11.4304 13.6776 11.372 13.7536C11.0763 14.1384 10.9173 14.6107 10.92 15.096C10.9216 15.488 11.024 15.8696 11.184 16.2264C11.5112 16.948 12.0496 17.712 12.7608 18.42C12.932 18.5904 13.0992 18.7616 13.2792 18.9208C14.1619 19.698 15.2138 20.2584 16.3512 20.5576L16.8064 20.6272C16.9544 20.6352 17.1024 20.624 17.2512 20.6168C17.4842 20.6048 17.7117 20.5417 17.9176 20.432C18.0224 20.378 18.1246 20.3193 18.224 20.256C18.224 20.256 18.2584 20.2336 18.324 20.184C18.432 20.104 18.4984 20.0472 18.588 19.9536C18.6544 19.8848 18.712 19.804 18.756 19.712C18.8184 19.5816 18.8808 19.3328 18.9064 19.1256C18.9256 18.9672 18.92 18.8808 18.9176 18.8272C18.9144 18.7416 18.8432 18.6528 18.7656 18.6152L18.3 18.4064C18.3 18.4064 17.604 18.1032 17.1792 17.9096C17.1344 17.8901 17.0864 17.879 17.0376 17.8768C16.9829 17.8712 16.9276 17.8773 16.8754 17.8949C16.8232 17.9124 16.7754 17.9409 16.7352 17.9784V17.9768C16.7312 17.9768 16.6776 18.0224 16.0992 18.7232C16.066 18.7678 16.0203 18.8015 15.9678 18.82C15.9154 18.8386 15.8587 18.8411 15.8048 18.8272C15.7527 18.8133 15.7016 18.7956 15.652 18.7744C15.5528 18.7328 15.5184 18.7168 15.4504 18.6872L15.4464 18.6856C14.9887 18.4858 14.565 18.2159 14.1904 17.8856C14.0896 17.7976 13.996 17.7016 13.9 17.6088C13.5853 17.3074 13.311 16.9664 13.084 16.5944L13.0368 16.5184C13.0029 16.4673 12.9755 16.4122 12.9552 16.3544C12.9248 16.2368 13.004 16.1424 13.004 16.1424C13.004 16.1424 13.1984 15.9296 13.2888 15.8144C13.3641 15.7187 13.4343 15.6191 13.4992 15.516C13.5936 15.364 13.6232 15.208 13.5736 15.0872C13.3496 14.54 13.1176 13.9952 12.8792 13.4544C12.832 13.3472 12.692 13.2704 12.5648 13.2552C12.5216 13.2504 12.4784 13.2456 12.4352 13.2424C12.3278 13.2371 12.2201 13.2389 12.1128 13.2464Z"
                                            fill="#191B1F" />
                                    </svg>
                                </a>
                            </li>
                            <li class="catalog__info-item">
                                <a href="#!" class="catalog__info-link _instagram">
                                    <svg width="30" height="34" viewBox="0 0 30 34" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.53494 7.06354C0.968273 7.95131 0 9.61293 0 11.4136V22.5864C0 24.3871 0.968275 26.0487 2.53494 26.9365L7.5 29.75L12.5349 32.6031C14.0641 33.4697 15.9359 33.4697 17.4651 32.6031L27.4651 26.9365C29.0317 26.0487 30 24.3871 30 22.5864V11.4136C30 9.61293 29.0317 7.95131 27.4651 7.06354L17.4651 1.39687C15.9359 0.530349 14.0641 0.53035 12.5349 1.39687L2.53494 7.06354Z"
                                            fill="#FFECB3" />
                                        <path
                                            d="M18.5 10H11.5C9.567 10 8 11.567 8 13.5V20.5C8 22.433 9.567 24 11.5 24H18.5C20.433 24 22 22.433 22 20.5V13.5C22 11.567 20.433 10 18.5 10Z"
                                            fill="#191B1F" />
                                        <path
                                            d="M17.7697 16.5892C17.856 17.1718 17.7565 17.7668 17.4853 18.2895C17.214 18.8123 16.7849 19.2362 16.2588 19.501C15.7327 19.7658 15.1366 19.858 14.5551 19.7644C13.9737 19.6708 13.4365 19.3963 13.0201 18.9798C12.6036 18.5634 12.3291 18.0262 12.2355 17.4448C12.142 16.8633 12.2341 16.2672 12.4989 15.7411C12.7637 15.215 13.1876 14.7859 13.7104 14.5146C14.2331 14.2434 14.8281 14.1439 15.4107 14.2302C16.0049 14.3184 16.5551 14.5953 16.9798 15.0201C17.4046 15.4448 17.6815 15.995 17.7697 16.5892Z"
                                            stroke="#FFECB3" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M19.1962 13.0987C19.207 13.1715 19.1946 13.2459 19.1607 13.3112C19.1268 13.3766 19.0731 13.4296 19.0074 13.4627C18.9416 13.4958 18.8671 13.5073 18.7944 13.4956C18.7217 13.4839 18.6546 13.4496 18.6025 13.3975C18.5505 13.3455 18.5161 13.2783 18.5044 13.2057C18.4927 13.133 18.5043 13.0585 18.5374 12.9927C18.5705 12.9269 18.6235 12.8733 18.6888 12.8394C18.7541 12.8055 18.8285 12.793 18.9013 12.8038C18.9756 12.8148 19.0444 12.8495 19.0975 12.9026C19.1506 12.9557 19.1852 13.0244 19.1962 13.0987Z"
                                            stroke="#FFECB3" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </a>
                            </li>
                            <li class="catalog__info-item">
                                <a href="#!" class="catalog__info-link _telegram">
                                    <svg width="30" height="34" viewBox="0 0 30 34" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.53494 7.06354C0.968273 7.95131 0 9.61293 0 11.4136V22.5864C0 24.3871 0.968275 26.0487 2.53494 26.9365L7.5 29.75L12.5349 32.6031C14.0641 33.4697 15.9359 33.4697 17.4651 32.6031L27.4651 26.9365C29.0317 26.0487 30 24.3871 30 22.5864V11.4136C30 9.61293 29.0317 7.95131 27.4651 7.06354L17.4651 1.39687C15.9359 0.530349 14.0641 0.53035 12.5349 1.39687L2.53494 7.06354Z"
                                            fill="#FFECB3" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M7.96243 16.5964C11.7205 14.7618 14.2265 13.5523 15.4804 12.968C19.0604 11.2995 19.8043 11.0097 20.2892 11.0001C20.3959 10.998 20.6343 11.0276 20.7887 11.168C20.9192 11.2866 20.9551 11.4468 20.9722 11.5592C20.9894 11.6716 21.0108 11.9277 20.9938 12.1278C20.7998 14.4118 19.9603 19.9545 19.5332 22.5127C19.3525 23.5951 18.9967 23.958 18.6522 23.9936C17.9036 24.0707 17.3351 23.4392 16.6101 22.9067C15.4755 22.0733 14.8345 21.5545 13.7332 20.7413C12.4604 19.8015 13.2855 19.285 14.0108 18.4409C14.2006 18.22 17.4991 14.8583 17.5629 14.5533C17.5709 14.5152 17.5783 14.373 17.503 14.298C17.4276 14.2229 17.3163 14.2486 17.236 14.269C17.1223 14.2979 15.3097 15.6403 11.7984 18.2961C11.2839 18.6919 10.8179 18.8848 10.4004 18.8747C9.9401 18.8635 9.05469 18.5831 8.39648 18.3433C7.58916 18.0493 6.94752 17.8938 7.00339 17.3944C7.03249 17.1343 7.35217 16.8683 7.96243 16.5964Z"
                                            fill="#191B1F" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <a href="mailto:info@gmail.com" class="catalog__info-mail">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
                                    stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21 7L12 13L3 7" stroke="#191B1F" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            info@gmail.com
                        </a>
                    </div>
                </aside>
                <div class="catalog__cards">
                    <div class="catalog__cards-info">
                        <p class="catalog__cards-txt">{{ companyCatalogStore?.count }} {{ $t("catalog.count") }}</p>
                        <div class="catalog__cards-view">
                            <svg class="catalog__cards-grid" @click="viewCards = false" width="26" height="26"
                                viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="26" height="26" rx="2.16667" :fill="!viewCards ? '#1B2E4F' : '#E6E7EA'" />
                                <rect x="4.33301" y="4.33325" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                                <rect x="4.33301" y="10.8333" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                                <rect x="4.33301" y="17.3333" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                                <rect x="10.833" y="4.33325" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                                <rect x="10.833" y="10.8333" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                                <rect x="10.833" y="17.3333" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                                <rect x="17.333" y="4.33325" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                                <rect x="17.333" y="10.8333" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                                <rect x="17.333" y="17.3333" width="4.33333" height="4.33333" rx="1.08333"
                                    :fill="!viewCards ? '#FFBF01' : '#6A7181'" />
                            </svg>
                            <svg class="catalog__cards-burger" @click="viewCards = true" width="26" height="26"
                                viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="26" height="26" rx="2.16667" :fill="viewCards ? '#1B2E4F' : '#E6E7EA'" />
                                <path d="M2.16699 19.5H23.8337" :stroke="viewCards ? '#FFBF01' : '#6A7181'"
                                    stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.16699 13H23.8337" :stroke="viewCards ? '#FFBF01' : '#6A7181'"
                                    stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.16699 6.5H23.8337" :stroke="viewCards ? '#FFBF01' : '#6A7181'"
                                    stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div class="catalog__results" :class="{ '_list': viewCards }">
                        <SearchProducts v-for="(item, idx) in companyCatalogStore?.products" :key="idx" :found="item" />
                        <vue-awesome-paginate v-if="companyCatalogStore?.count" :total-items="companyCatalogStore?.count"
                            :items-per-page="12" :max-pages-shown="5" v-model="currentPage" :on-click="onClickHandler"
                            :class="{ 'catalog__paginate': !viewCards }">
                            <template #prev-button>
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.0001 1.41675L1.41675 16.0001M1.41675 16.0001L16.0001 30.5834M1.41675 16.0001H30.5834"
                                            stroke="#191B1F" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </template>
                            <template #next-button>
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.0001 30.5834L30.5834 16.0001L16.0001 1.41675M30.5834 16.0001L1.41675 16.0001"
                                            stroke="#191B1F" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </template>
                        </vue-awesome-paginate>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>