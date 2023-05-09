<script setup>
import Nav from "../nav/Nav.vue";
</script>

<template>
    <header class="header">
        <Nav />
    </header>
</template>

<style lang="scss" scoped>
    .header {
        position: sticky;
        top: 0;
        z-index: 999;
        background: #F9FAFB;
    }
</style>