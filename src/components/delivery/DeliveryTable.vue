<script setup>

import { onMounted, ref } from "vue";
import { useDeliveryStore } from "@/stores/deliveryStore";
import { useRoute } from "vue-router";

const props = defineProps({
    extraClass: {
        type: String,
        default: "",
    }
})

const route = useRoute();

const currentPage = ref(+route.query.page || 1);

const deliveryStore = useDeliveryStore();

onMounted(() => {
    deliveryStore.getDelivery(currentPage.value); /* НЕ ТРОГАТЬ (отвечает за отображение заказов первую страницу) */
})

</script>

<template>
    <ul class="delivery__list">
        <li class="delivery__item">
            <svg v-if="route.name == 'delivery'" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 8.5L7 4.5M7 4.5L3 8.5M7 4.5L7 20.5" stroke="#6A7181" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M13 16.5L17 20.5M17 20.5L21 16.5M17 20.5L17 4.5" stroke="#6A7181" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ $t("delivery.list.data") }}
        </li>
        <li class="delivery__item">{{ $t("delivery.list.direction") }}</li>
        <li class="delivery__item">{{ $t("delivery.list.product") }}</li>
        <li class="delivery__item">{{ $t("delivery.list.count") }}</li>
        <li class="delivery__item">{{ $t("delivery.list.customer") }}</li>
    </ul>
    <div class="delivery__cards">
        <ul class="delivery__cards-list" :class="extraClass" v-for="(item, idx) in deliveryStore?.deliveries" :key="idx">
            <li class="delivery__cards-item">{{ item?.delivery_time }}</li>
            <li class="delivery__cards-item">{{ item?.directions }}</li>
            <li class="delivery__cards-item">{{ item?.product_name }}</li>
            <li class="delivery__cards-item">{{ item?.quantity || item?.quantity_ru }}</li>
            <li class="delivery__cards-item">{{ item?.customer || item?.customer_ru }}</li>
        </ul>
    </div>
</template>