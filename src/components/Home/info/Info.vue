<script setup>

</script>

<template>
    <section class="info" id="info">
        <div class="container">
            <div class="info__content">
                <div class="info__content-desc">
                    <h3 class="info__content-title">{{ $t("info.title") }}</h3>
                    <p class="info__content-txt">{{ $t("info.txt1") }}</p>
                    <p class="info__content-txt">{{ $t("info.desc.txt1") }} <b>{{ $t("info.desc.txt2") }}</b> {{ $t("info.desc.txt3") }}</p>
                    <div class="info__content-cards">
                        <div class="info__content-card">
                            <span class="info__content-num">2018</span>
                            <p class="info__content-text">{{ $t("info.cards.txt1") }}</p>
                        </div>
                        <div class="info__content-card">
                            <span class="info__content-num">15+</span>
                            <p class="info__content-text">{{ $t("info.cards.txt2") }}</p>
                        </div>
                        <div class="info__content-card">
                            <span class="info__content-num">60+</span>
                            <p class="info__content-text">{{ $t("info.cards.txt3") }}</p>
                        </div>
                    </div>
                </div>
                <div class="info__content-production">
                    <img src="@/assets/images/info/1.png" alt="" class="info__content-image">
                    <span class="info__content-span">{{ $t("info.delivery") }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>