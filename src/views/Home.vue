<script setup>
import Intro from "@/components/Home/intro/Intro.vue";
import Thesis from "@/components/Home/thesis/Thesis.vue";
import Guarantee from "@/components/Home/guarantee/Guarantee.vue";
import Brand from "@/components/Home/brand/Brand.vue";
import Company from "@/components/Home/company/Company.vue";
import Info from "@/components/Home/info/Info.vue";
import Advantages from "@/components/Home/advantages/Advantages.vue";
import Partners from "@/components/Home/partners/Partners.vue";
import DeliveryTable from "@/components/delivery/DeliveryTable.vue";
import News from "@/components/Home/news/News.vue";
import Tr from "@/i18n/translation";
import { ref } from "vue";

// icon

const icon = ref(true)

function showYellowIcon() {
  icon.value = false;
}

function showBlackIcon() {
  icon.value = true;
}

// icon

</script>

<template>
  <main>
    <Intro />
    <Thesis />
    <Guarantee />
    <Brand />
    <Company :start="0" :end="5">
      <template #extra>
        <RouterLink :to="Tr.i18nRoute({name: 'company'})" class="company__services" @mouseover="showYellowIcon" @mouseout="showBlackIcon">
          <svg width="93" height="93" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Transition name="icon">
              <path v-if="icon"
                d="M15.6 8.9V13.22C15.6 14.2281 15.6 14.7321 15.4038 15.1172C15.2312 15.4559 14.9559 15.7312 14.6172 15.9038C14.2321 16.1 13.7281 16.1 12.72 16.1H8.4M15.6 8.9H11.28C10.2719 8.9 9.76786 8.9 9.38282 9.09619C9.04413 9.26876 8.76876 9.54413 8.59619 9.88282C8.4 10.2679 8.4 10.7719 8.4 11.78V16.1M15.6 8.9H18.12C19.1281 8.9 19.6321 8.9 20.0172 9.09619C20.3559 9.26876 20.6312 9.54413 20.8038 9.88282C21 10.2679 21 10.7719 21 11.78V18.62C21 19.6281 21 20.1321 20.8038 20.5172C20.6312 20.8559 20.3559 21.1312 20.0172 21.3038C19.6321 21.5 19.1281 21.5 18.12 21.5H11.28C10.2719 21.5 9.76786 21.5 9.38282 21.3038C9.04413 21.1312 8.76876 20.8559 8.59619 20.5172C8.4 20.1321 8.4 19.6281 8.4 18.62V16.1M15.6 8.9V6.38C15.6 5.37191 15.6 4.86786 15.4038 4.48282C15.2312 4.14413 14.9559 3.86876 14.6172 3.69619C14.2321 3.5 13.7281 3.5 12.72 3.5H5.88C4.87191 3.5 4.36786 3.5 3.98282 3.69619C3.64413 3.86876 3.36876 4.14413 3.19619 4.48282C3 4.86786 3 5.37191 3 6.38V13.22C3 14.2281 3 14.7321 3.19619 15.1172C3.36876 15.4559 3.64413 15.7312 3.98282 15.9038C4.36786 16.1 4.87191 16.1 5.88 16.1H8.4"
                stroke="#FFBF01" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path v-else fill-rule="evenodd" clip-rule="evenodd"
                d="M12.72 3H5.88C4.87191 3 4.36786 3 3.98282 3.19619C3.64413 3.36876 3.36876 3.64413 3.19619 3.98282C3 4.36786 3 4.87191 3 5.88V12.72C3 13.7281 3 14.2321 3.19619 14.6172C3.36876 14.9559 3.64413 15.2312 3.98282 15.4038C4.36786 15.6 4.87191 15.6 5.88 15.6H8.4V18.12C8.4 19.1281 8.4 19.6321 8.59619 20.0172C8.76876 20.3559 9.04413 20.6312 9.38282 20.8038C9.76786 21 10.2719 21 11.28 21H18.12C19.1281 21 19.6321 21 20.0172 20.8038C20.3559 20.6312 20.6312 20.3559 20.8038 20.0172C21 19.6321 21 19.1281 21 18.12V11.28C21 10.2719 21 9.76786 20.8038 9.38282C20.6312 9.04413 20.3559 8.76876 20.0172 8.59619C19.6321 8.4 19.1281 8.4 18.12 8.4H15.6V5.88C15.6 4.87191 15.6 4.36786 15.4038 3.98282C15.2312 3.64413 14.9559 3.36876 14.6172 3.19619C14.2321 3 13.7281 3 12.72 3ZM15.6 8.4H11.28C10.2719 8.4 9.76786 8.4 9.38282 8.59619C9.04413 8.76876 8.76876 9.04413 8.59619 9.38282C8.4 9.76786 8.4 10.2719 8.4 11.28V15.6H12.72C13.7281 15.6 14.2321 15.6 14.6172 15.4038C14.9559 15.2312 15.2312 14.9559 15.4038 14.6172C15.6 14.2321 15.6 13.7281 15.6 12.72V8.4Z"
                fill="#FFBF01" />
            </Transition>
          </svg>
          <h3 class="company__services-title">{{ $t("company.allServicesLink.txt1") }} <br> {{ $t("company.allServicesLink.txt2") }} &#8599;</h3>
        </RouterLink>
      </template>
      <template #help>
        <div v-show="false"></div>
      </template>
    </Company>
    <Info />
    <Advantages />
    <Partners />
    <section class="delivery">
      <div class="container">
        <h2 class="delivery__title title">{{ $t("delivery.title.one") }} <span>{{ $t("delivery.title.two") }}</span></h2>
        <DeliveryTable extraClass="_delivery__cards-list" />
        <RouterLink :to="Tr.i18nRoute({name: 'delivery'})" class="btn delivery__btn">{{ $t("delivery.all") }}
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0001 30.5834L30.5834 16.0001L16.0001 1.41675M30.5834 16.0001L1.41675 16.0001" stroke="#191B1F"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </RouterLink>
      </div>
    </section>
    <News />
  </main>
</template>

<style lang="scss" scoped>
.icon-enter-active,
.icon-leave-active {
  transition: opacity .3s ease;
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
}
</style>