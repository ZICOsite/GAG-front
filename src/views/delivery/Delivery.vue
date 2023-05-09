<script setup>
import DeliveryTable from "@/components/delivery/DeliveryTable.vue";
import Tr from "@/i18n/translation";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDeliveryStore } from "@/stores/deliveryStore";

const route = useRoute();
const router = useRouter();

const currentPage = ref(+route.query.page || 1);
const offset = ref(0);

const deliveryStore = useDeliveryStore();

const onClickHandler = (page) => {
  currentPage.value = page;
  offset.value = (12 * page) - 12;
  if (page === 1) {
    router.push(`${route.path}`);
  } else {
    router.push(`${route.path}?page=${page}`);
  }
  deliveryStore.getDelivery(page);
  window.scrollTo(0, 0);
};

onMounted(() => {
    deliveryStore.getDelivery(currentPage.value);
})

</script>

<template>
    <main>
        <section class="delivery _delivery">
            <div class="container">
                <div class="breadcrump">
                    <ol class="breadcrump-list">
                        <li class="breadcrump-item">
                            <RouterLink :to="Tr.i18nRoute({name: 'Home'})" class="breadcrump-link">{{ $t("breadcrumb.Home") }}</RouterLink>
                        </li>
                        <li class="breadcrump-item">
                            <span class="breadcrump-link breadcrump-current">{{ $t("breadcrumb.delivery") }}</span>
                        </li>
                    </ol>
                </div>
                <h2 class="delivery__title title">{{ $t("delivery.title2.one") }} <span>{{ $t("delivery.title2.two") }}</span> {{ $t("delivery.title2.three") }}</h2>
                <DeliveryTable />
                <vue-awesome-paginate :total-items="deliveryStore?.totalDeliveries" :items-per-page="12" :max-pages-shown="5"
                    v-model="currentPage" :on-click="onClickHandler">
                    <template #prev-button>
                        <span>
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.0001 1.41675L1.41675 16.0001M1.41675 16.0001L16.0001 30.5834M1.41675 16.0001H30.5834"
                                    stroke="#191B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </template>
                    <template #next-button>
                        <span>
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.0001 30.5834L30.5834 16.0001L16.0001 1.41675M30.5834 16.0001L1.41675 16.0001"
                                    stroke="#191B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </template>
                </vue-awesome-paginate>
            </div>
        </section>
    </main>
</template>

<style scoped></style>