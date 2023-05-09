<script setup>
import { onMounted, ref } from "vue";
import { Products } from "@/assets/js/connect";
import { imgUrl } from "@/static";
import 'swiper/scss';
// import BrandItem from "./BrandItem.vue";

const db = new Products();

const tags = ref([]);
const adaptive = ref(true);

const closeAllTags = (item) => {
    if (!item.open) {
        tags.value.forEach(el => el.open = false);
    }
    item.open = !item.open;
}

const www = (item) => {
    let bodyScroll = document.querySelectorAll(`.brand__category-body`)
    if (bodyScroll[item] != undefined) {
        return bodyScroll[item].style.height = bodyScroll[item].scrollHeight + "px"
    } else {
        return "450px"
    }
}

function onResize(e) {
    if (e.currentTarget.innerWidth <= 1024) adaptive.value = false
    else adaptive.value = true
}

onMounted(async () => {
    try {
        const allDir = await db.getBrands();
        const openKeys = allDir.results.map(item => {
            const addKeyOpen = { ...item };
            addKeyOpen.open = false;
            tags.value.push(addKeyOpen);
        })
        tags.value[0].open = true
        window.addEventListener("resize", onResize)
        window.addEventListener("load", onResize)
    } catch (error) {
        console.log(error);
    }
})

</script>

<template>
    <section class="brand">
        <div class="container">
            <h2 class="brand__title title">
                {{ $t("brand.title.one") }}
                <span>{{ $t("brand.title.two") }}</span>
            </h2>
            <div class="brand__content">
                <div class="brand__category">
                    <h3 class="brand__category-title">{{ $t("catalog.info_title") }}</h3>
                    <div class="brand__category-manufacturers">
                        <ul class="brand__category-tags">
                            <li class="brand__category-field" v-for="(tag, idx) in tags" :key="idx">
                                <div class="brand__category-open">
                                    <h4 class="brand__category-name" @click="closeAllTags(tag)">
                                        {{ tag?.title_en || tag?.title_ru }}
                                        <svg :class="!tag?.open ? 'rotate' : ''" width="24" height="24"
                                            style="cursor: pointer" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 19L5 5" stroke="#3E434C" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M19 5L5 19" stroke="#3E434C" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </h4>
                                    <Teleport v-if="adaptive" to="#brand__category-logos">
                                        <ul class="brand__category-body invisible" ref="body"
                                            :class="tag?.open ? 'visible' : ''"
                                            :style="tag?.open ? `height: ${www(idx)}` : 'height: 0;'">
                                            <li class="brand__category-subcategory">
                                                <img v-for="(item, idx) in tag?.carousel_images" :key="item.id"
                                                    :src="imgUrl + item" alt="" loading="lazy">
                                            </li>
                                        </ul>
                                    </Teleport>
                                    <ul v-else class="brand__category-body invisible" ref="body"
                                        :class="tag?.open ? 'visible' : ''"
                                        :style="tag?.open ? `height: 450px;` : 'height: 0;'">
                                        <li class="brand__category-subcategory">
                                            <img v-for="(item, idx) in tag?.carousel_images" :key="item.id"
                                                :src="imgUrl + item" alt="" loading="lazy">
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div class="brand__category-logos" id="brand__category-logos"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>