<script setup>
import { ref } from 'vue';
import img1 from "@/assets/images/advantages/users.svg";
import img2 from "@/assets/images/advantages/route.svg";
import img3 from "@/assets/images/advantages/clock-rewind.svg";
import img4 from "@/assets/images/advantages/graphics.svg";
import img5 from "@/assets/images/advantages/check-verified.svg";
import img6 from "@/assets/images/advantages/box-perspective.svg";

const cards = ref([
    {
        img: img1,
    },
    {
        img: img2,
    },
    {
        img: img3,
    },
    {
        img: img4,
    },
    {
        img: img5,
    },
    {
        img: img6,
    },
])

</script>

<template>
    <section class="advantages">
        <div class="container">
            <h2 class="advantages__title title">{{ $t("advantages.title.one") }}
                <span>{{ $t("advantages.title.two") }}</span>
            </h2>
            <div class="advantages__cards">
                <div class="advantages__card" v-for="(item, idx) in cards" :key="idx">
                    <img :src="item?.img" alt="" class="advantages__card-icon">
                    <div class="advantages__card-desc">
                        <h3 class="advantages__card-title">{{ $t(`advantages.cards[${idx}].title`) }}</h3>
                        <p class="advantages__card-txt">{{ $t(`advantages.cards[${idx}].text`, {company: "General Amcent Group"}) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>