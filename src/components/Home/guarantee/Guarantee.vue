<script setup>
import { ref } from 'vue';
import img1 from "@/assets/images/guarantee/message-check.svg";
import img2 from "@/assets/images/guarantee/file.svg";
import img3 from "@/assets/images/guarantee/eye.svg";
import img4 from "@/assets/images/guarantee/package-pack.svg";
import img5 from "@/assets/images/guarantee/truck.svg";
import img6 from "@/assets/images/guarantee/flag.svg";

const cards = ref([
  {
    img: img1
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
  <section class="guarantee">
    <div class="container">
      <h2 class="guarantee__title title">
        {{ $t("guarantee.title.one") }}
        <span>{{ $t("guarantee.title.two") }}</span>
        {{ $t("guarantee.title.three") }}
      </h2>
      <div class="guarantee__cards">
        <div class="guarantee__card" v-for="(item, idx) in cards" :key="idx">
          <div class="guarantee__card-line">
            <img :src="item.img" alt="">
          </div>
          <h3 class="guarantee__card-title">{{ $t(`guarantee.cards[${idx}].title`) }}</h3>
          <p class="guarantee__card-txt">{{ $t(`guarantee.cards[${idx}].text`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>