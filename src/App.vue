<script setup>
import Header from "@/components/common/header/Header.vue";
import Footer from "@/components/common/footer/Footer.vue";
import Loading from "@/components/UI/Loading.vue";
import { loading } from "@/static";
import { RouterView } from 'vue-router';
</script>

<template>
  <Loading v-if="loading" />
  <div class="wrapper">
    <Header />
    <RouterView v-slot="{Component}">
      <component :is="Component" :key="$route.fullPath"></component>
    </RouterView>
    <Footer />
  </div>
</template>