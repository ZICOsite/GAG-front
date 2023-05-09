import { createApp } from 'vue/dist/vue.esm-bundler'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n';
import VueAwesomePaginate from "vue-awesome-paginate";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import './assets/styles/main.scss'

import VueLazyload from 'vue-lazyload'

import noPhoto from '@/assets/images/noPhoto.png'

const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueAwesomePaginate)
app.use(VueLazyload, {
    error: noPhoto
})

app.mount('#zico')
