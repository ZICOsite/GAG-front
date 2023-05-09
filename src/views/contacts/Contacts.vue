<script setup>

import { Products } from "@/assets/js/connect";
import { onMounted, ref } from "vue";

const db = new Products();

const contactsInfo = ref(null);

const fixedNums = ref(Function);

onMounted(async () => {
  try {
    const res = await db.getContacts();
    contactsInfo.value = res.results[0];
    fixedNums.value = (num) => {
      let emptyKey = num.split('');
      let res;
      for (let i = 0; i < emptyKey.length; i++) {
        if (emptyKey[i] == " ") delete emptyKey[i];
        res = emptyKey.join('');
      }
      return res;
    }
  } catch (error) {
    console.log(error);
  }
})

</script>

<template>
  <main>
    <section class="contacts">
      <div class="container">
        <div class="breadcrump">
          <ol class="breadcrump-list">
            <li class="breadcrump-item">
              <RouterLink to="/" class="breadcrump-link">{{ $t("breadcrumb.Home") }}</RouterLink>
            </li>
            <li class="breadcrump-item">
              <span class="breadcrump-link breadcrump-current">{{ $t("breadcrumb.contacts") }}</span>
            </li>
          </ol>
        </div>
        <div class="contacts__content">
          <div class="contacts__content-desc">
            <div class="contacts__content-col">
              <h3 class="contacts__content-title">{{ $t("contacts.title") }}</h3>
              <ul class="contacts__content-list">
                <li class="contacts__content-item">
                  <a href="#!" class="contacts__content-link">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.0012 22.0002L6.34436 16.4353C3.22017 13.3618 3.22017 8.37878 6.34437 5.30533C9.46856 2.23188 14.5339 2.23188 17.6581 5.30533C20.7823 8.37878 20.7823 13.3618 17.6581 16.4353L12.0012 22.0002Z"
                        stroke="#191B1F" stroke-width="1.5" stroke-linejoin="round" />
                      <circle cx="2" cy="2" r="2" transform="matrix(-1 0 0 1 14.0015 9)" fill="#191B1F" />
                    </svg>
                    <div class="contacts__content-address">
                      <span>{{ $t("office") }}</span>
                      {{ contactsInfo?.text_loc_ru || contactsInfo?.text_loc_en }}
                    </div>
                  </a>
                </li>
                <li class="contacts__content-item">
                  <a href="#!" class="contacts__content-link">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.0012 22.0002L6.34436 16.4353C3.22017 13.3618 3.22017 8.37878 6.34437 5.30533C9.46856 2.23188 14.5339 2.23188 17.6581 5.30533C20.7823 8.37878 20.7823 13.3618 17.6581 16.4353L12.0012 22.0002Z"
                        stroke="#191B1F" stroke-width="1.5" stroke-linejoin="round" />
                      <circle cx="2" cy="2" r="2" transform="matrix(-1 0 0 1 14.0015 9)" fill="#191B1F" />
                    </svg>
                    <div class="contacts__content-address">
                      <span>{{ $t("office2") }}</span>
                      {{ contactsInfo?.text_loc2_ru || contactsInfo?.text_loc2_en }}
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="contacts__content-col">
              <h3 class="contacts__content-title">{{ $t("footer.contacts") }}</h3>
              <ul class="contacts__content-list">
                <li class="contacts__content-item">
                  <a :href="'tel:' + fixedNums(contactsInfo?.tel1)" class="contacts__content-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.43898 6.96879C4.95901 13.7235 10.2765 19.041 17.0312 20.561C19.1865 21.046 21 19.2091 21 17V15.25C21 14.6977 20.5514 14.2547 20.0012 14.2063C18.9118 14.1104 17.8669 13.8593 16.8888 13.4751L15.1796 15.1843C12.3997 13.854 10.146 11.6003 8.81567 8.82037L10.5249 7.11118C10.1407 6.13313 9.88957 5.08823 9.79373 3.99877C9.74533 3.44861 9.30229 3 8.75 3H7C4.79086 3 2.95398 4.81355 3.43898 6.96879Z"
                        stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="contacts__content-number">
                      <span>{{ contactsInfo?.tel1 }}</span>
                      {{ $t("hotline") }}
                    </div>
                  </a>
                </li>
                <li class="contacts__content-item">
                  <a href="mailto:info@gmail.com" class="contacts__content-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
                        stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M21 7L12 13L3 7" stroke="#191B1F" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                    {{ contactsInfo?.email }}
                  </a>
                </li>
                <li class="contacts__content-item">
                  <a :href="'tel:' + fixedNums(contactsInfo?.tel2)" class="contacts__content-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.43898 6.96879C4.95901 13.7235 10.2765 19.041 17.0312 20.561C19.1865 21.046 21 19.2091 21 17V15.25C21 14.6977 20.5514 14.2547 20.0012 14.2063C18.9118 14.1104 17.8669 13.8593 16.8888 13.4751L15.1796 15.1843C12.3997 13.854 10.146 11.6003 8.81567 8.82037L10.5249 7.11118C10.1407 6.13313 9.88957 5.08823 9.79373 3.99877C9.74533 3.44861 9.30229 3 8.75 3H7C4.79086 3 2.95398 4.81355 3.43898 6.96879Z"
                        stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="contacts__content-number">
                      <span>{{ contactsInfo?.tel2 }}</span>
                      {{ $t("hotline") }}
                    </div>
                  </a>
                </li>
                <li class="contacts__content-item">
                  <a :href="'tel:' + fixedNums(contactsInfo?.tel3)" class="contacts__content-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.43898 6.96879C4.95901 13.7235 10.2765 19.041 17.0312 20.561C19.1865 21.046 21 19.2091 21 17V15.25C21 14.6977 20.5514 14.2547 20.0012 14.2063C18.9118 14.1104 17.8669 13.8593 16.8888 13.4751L15.1796 15.1843C12.3997 13.854 10.146 11.6003 8.81567 8.82037L10.5249 7.11118C10.1407 6.13313 9.88957 5.08823 9.79373 3.99877C9.74533 3.44861 9.30229 3 8.75 3H7C4.79086 3 2.95398 4.81355 3.43898 6.96879Z"
                        stroke="#191B1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="contacts__content-number">
                      <span>{{ contactsInfo?.tel3 }}</span>
                      {{ $t("contacts.region") }}
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style="position:relative;overflow:hidden;">
            <a href="https://yandex.uz/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps"
              style="color:#eee;font-size:12px;position:absolute;top:0px;">Ташкент</a><a
              href="https://yandex.uz/maps/10335/tashkent/?feedback=map%2Fedit&feedback-context=map.controls&ll=69.279737%2C41.311151&utm_medium=mapframe&utm_source=maps&z=12"
              style="color:#eee;font-size:12px;position:absolute;top:14px;">Яндекс Карты</a>
            <iframe
              src="https://yandex.uz/map-widget/v1/?feedback=map%2Fedit&feedback-context=map.controls&ll=69.279737%2C41.311151&utm_source=main_stripe_big&z=12"
              width="100%" height="100%" frameborder="1" allowfullscreen="true" style="position:relative;">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>