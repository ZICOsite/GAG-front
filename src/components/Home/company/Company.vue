<script setup>
import { onMounted, ref } from 'vue';
import CompanyItem from "./CompanyItem.vue";
import { useMainDirections } from '@/stores/mainDirectionsStore';
import { storeToRefs } from 'pinia';

const props = defineProps({
    start: {
        type: Number
    },
    end: {
        type: Number
    }
})

// products

const mainDirectionsStore = useMainDirections();
const { getFiveProducts } = storeToRefs(mainDirectionsStore)

onMounted(() => {
    mainDirectionsStore.getDirections();
})

// products

</script>

<template>
    <section class="company">
        <div class="container">
            <h2 class="company__title title">{{ $t("company.title.one") }} <span>{{ $t("company.title.two") }}</span> {{
                $t("company.title.three") }}</h2>
            <div class="company__cards">
                <CompanyItem v-for="(item, idx) in getFiveProducts(start, end)" :key="idx"
                    :product="item" />
                <slot name="extra">
                    All services
                </slot>
                <slot name="help">
                    Have you found the right product?
                </slot>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>