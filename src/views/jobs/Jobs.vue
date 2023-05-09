<script setup>
import { onMounted, ref } from 'vue';
import { imgUrl, loading } from "@/static";
import { Products } from "@/assets/js/connect"

const db = new Products();

const faqs = ref([]);

const closeAllFaq = (item) => {
  if (!item.open) {
    faqs.value.forEach(el => el.open = false);
  }
  item.open = !item.open;
}

onMounted(async () => {
  loading.value = true;
  try {
    const allJobs = await db.getVacancies();
    const openKeys = allJobs.results.map(item => {
      const addKeyOpen = {...item};
      addKeyOpen.open = false;
      faqs.value.push(addKeyOpen);
    })
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
})

</script>

<template>
  <main>
    <section class="jobs">
      <div class="container">
        <div class="breadcrump">
          <ul class="breadcrump-list">
            <li class="breadcrump-item">
              <RouterLink to="/" class="breadcrump-link">{{ $t("breadcrumb.Home") }}</RouterLink>
            </li>
            <li class="breadcrump-item">
              <span class="breadcrump-link breadcrump-current">{{ $t("breadcrumb.vacancies") }}</span>
            </li>
          </ul>
        </div>
        <h2 class="jobs__title title"><span>{{ $t("vacancies.title.one") }}</span> {{ $t("vacancies.title.two") }}</h2>
        <div class="jobs__faq">
          <div class="jobs__faq-field" v-for="(faq, idx) in faqs" :key="idx">
            <div class="jobs__faq-open">
              <h3 class="jobs__faq-name" @click="closeAllFaq(faq)">
                <img :src="imgUrl + faq?.icon" alt="" class="jobs__faq-icon">
                {{ faq?.occupation_name_ru || faq?.occupation_name_en }}
                <svg :class="!faq?.open ? 'rotate' : ''" width="24" height="24" style="cursor: pointer" viewBox="0 0 24 24"
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 19L5 5" stroke="#3E434C" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M19 5L5 19" stroke="#3E434C" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </h3>
              <div class="jobs__faq-body invisible" ref="body" :class="faq?.open ? 'visible' : ''" :style="faq?.open ? `height: ${$refs.body[idx].scrollHeight}px;` : 'height: 0;'">
                <div class="jobs__faq-desc" v-for="(desc, idx) in faq?.desc" :key="idx">
                  <h4 class="jobs__faq-title">{{ desc?.title_ru || desc?.title_en }}:</h4>
                  <ul class="jobs__faq-list">
                    <li class="jobs__faq-item" v-for="item in desc?.list">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
