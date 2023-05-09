<script setup>
import { useI18n } from 'vue-i18n';
import Tr from "@/i18n/translation";
import { useRoute, useRouter } from 'vue-router';

// lang

const { t, locale } = useI18n();

const router = useRouter();
const route = useRoute();

const supportedLocales = Tr.supportedLocales;

const switchLanguage = async (event) => {
    const newLocale = event;
    
    await Tr.switchLanguage(newLocale);
    
    try {
        await router.replace({ params: { locale: newLocale } });
        window.location = route.fullPath
    } catch (error) {
        console.log(error);
        router.push("/");
    }
}

// lang

</script>

<template>
    <li class="nav__lang-item" v-for="sLocale in supportedLocales" :key="sLocale" :class="{ active: locale === sLocale }"
        @click="switchLanguage(sLocale)">
        {{ t(`locale.${sLocale}`) }}
    </li>
</template>