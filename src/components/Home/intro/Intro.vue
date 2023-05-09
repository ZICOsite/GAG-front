<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation, EffectCreative } from 'swiper';
import { imgUrl } from "@/static";
import { Products } from "@/assets/js/connect";
import { onMounted, ref } from 'vue';

import 'swiper/scss';

// slider

const modules = ref([Autoplay, Pagination, Navigation, EffectCreative]);

const progressLine = ref(null);
const onAutoplayTimeLeft = (s, time, progress) => {
    let calcSum = `${100 * (1 - progress)}%`;
    progressLine.value.style.setProperty('--progress', calcSum);
};

const creativeEffect = {
    prev: {
        shadow: true,
        translate: ['-20%', 0, -1],
    },
    next: {
        translate: ['100%', 0, 0],
    },
};

const autoplay = {
    delay: 2500,
    disableOnInteraction: false,
};

const pagination = {
    el: '.intro__pagination',
    type: 'fraction',
};

const navigation = { nextEl: '.intro__controllers-next', prevEl: '.intro__controllers-prev' };

const slidesInfo = ref(null);

const db = new Products();

onMounted(async () => {
    try {
        slidesInfo.value = await db.getSlidesInfo();
        localStorage.setItem("file", slidesInfo.value.document);
        db.file = db.getFile(slidesInfo.value.document);
    } catch (error) {
        console.log(error);
    }
})

// slider

</script>

<template>
    <section class="intro">
        <swiper :grabCursor="true" :effect="'creative'" :creativeEffect="creativeEffect" :centeredSlides="true"
            :autoplay="autoplay" :pagination="pagination" :loop="true" :navigation="navigation" :modules="modules"
            @autoplayTimeLeft="onAutoplayTimeLeft" class="intro__slider">
            <swiper-slide v-for="(slide, idx) in slidesInfo?.results" :key="idx">
                <div class="intro__slide">
                    <img :src="imgUrl + slide?.image" alt="" class="intro__slide-image">
                    <div class="container">
                        <h3 class="intro__slide-title">{{ slide?.title_ru || slide?.title_en }}</h3>
                        <p class="intro__slide-txt">{{ slide?.text_ru || slide?.text_en }}</p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="container">
            <div class="intro__extra">
                <a :href="slidesInfo?.document" class="intro__file" download>
                    <svg width="80" height="88" viewBox="0 0 80 88" fill="transparent" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 24.9564C1 23.4976 1.79413 22.1545 3.07232 21.4515L38.0723 2.20149C39.2727 1.54131 40.7273 1.54131 41.9277 2.20149L76.9277 21.4515C78.2059 22.1545 79 23.4976 79 24.9564V63.0436C79 64.5024 78.2059 65.8455 76.9277 66.5485L41.9277 85.7985C40.7273 86.4587 39.2727 86.4587 38.0723 85.7985L20.4819 76.1238L3.07233 66.5485C1.79413 65.8455 1 64.5024 1 63.0436V24.9564Z"
                            stroke="#F9FAFB" stroke-width="2" />
                        <path
                            d="M31.4286 60.0002C29.535 60.0002 28 58.43 28 56.4931V31.9436C28 30.0067 29.535 28.4365 31.4286 28.4365H43.4286L52 37.2042V56.4931C52 58.43 50.465 60.0002 48.5714 60.0002H31.4286Z"
                            stroke="#F9FAFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M43.4286 38.1818L52.0001 38.1818L41.7144 28V36.4848C41.7144 37.4221 42.4819 38.1818 43.4286 38.1818Z"
                            fill="#F9FAFB" />
                        <path d="M35 48.7997L40 53.8906M40 53.8906L45 48.7997M40 53.8906L40 43.7088" stroke="#F9FAFB"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {{ $t("download") }}
                </a>
                <div class="intro__navgiation">
                    <div class="intro__controllers">
                        <div class="intro__controllers-prev">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.0001 1.41675L1.41675 16.0001M1.41675 16.0001L16.0001 30.5834M1.41675 16.0001H30.5834"
                                    stroke="#F9FAFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="intro__pagination"></div>
                        <div class="intro__controllers-next">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.0001 30.5834L30.5834 16.0001L16.0001 1.41675M30.5834 16.0001L1.41675 16.0001"
                                    stroke="#F9FAFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div class="autoplay-progress">
                        <span ref="progressLine"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.autoplay-progress {
    width: 100%;
    height: 3px;
    background: #6A7181;
    border-radius: 2px;
    position: relative;

    @media (max-width: 480px) {
        position: absolute;
        bottom: -90%;
        left: 0;
    }

    span {
        --progress: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: var(--progress);
        height: 100%;
        background: #fff;
    }
}
</style>