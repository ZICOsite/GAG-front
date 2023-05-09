<script setup>
import Tr from "@/i18n/translation";
import { loading } from "@/static";
loading.value = false;
</script>

<template>
    <div class="error">
        <h2 class="error__title title">Страница <span>не найдена:(</span></h2>
        <p class="error__subtitle">Перейдите на <RouterLink class="error__link" :to="Tr.i18nRoute({name: 'Home'})">главную страницу</RouterLink></p>
        <img class="error__image" src="@/assets/images/error/404.png" alt="">
    </div>
</template>

<style lang="scss" scoped>
    .error {
        background: #E6E7EA;
        padding-top: 55px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__title {
            margin-bottom: 12px;
        }
        
        &__subtitle {
            margin-bottom: 28px;
            font-size: 18px;
        }

        &__link {
            color: #4473C5;
            text-decoration: underline;
        }

        &__image {
            @media (max-width: 768px) {
                width: 50%;
            }
        }
    }
</style>