<script setup>
import { ref } from 'vue';
import img1 from "@/assets/images/partners/1.png";
import img2 from "@/assets/images/partners/2.png";
import img3 from "@/assets/images/partners/3.png";
import img4 from "@/assets/images/partners/4.png";
import img5 from "@/assets/images/partners/5.png";
import img6 from "@/assets/images/partners/6.png";

const brands = ref([
    {
        img: img1
    },
    {
        img: img2
    },
    {
        img: img3
    },
    {
        img: img4
    },
    {
        img: img5
    },
    {
        img: img6
    },
])

</script>

<template>
    <section class="partners">
        <div class="container">
            <div class="partners__top">
                <h2 class="partners__title title">{{ $t("partners.title.one") }} <span>{{ $t("partners.title.two") }}</span></h2>
                <p class="partners__txt">{{ $t("partners.txt") }}</p>
            </div>
        </div>
        <div class="partners__marquee marquee">
            <div class="marquee__wrapper">
                <div class="marquee__item">
                    <div class="partners__brand" v-for="(item, idx) in brands" :key="idx">
                        <img :src="item.img" alt="" class="partners__brand-logo">
                    </div>
                </div>
                <div class="marquee__item">
                    <div class="partners__brand" v-for="(item, idx) in brands" :key="idx">
                        <img :src="item.img" alt="" class="partners__brand-logo">
                    </div>
                </div>
                <div class="marquee__item">
                    <div class="partners__brand" v-for="(item, idx) in brands" :key="idx">
                        <img :src="item.img" alt="" class="partners__brand-logo">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>