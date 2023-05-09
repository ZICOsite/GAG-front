<template>
    <div class="preloader">
        <svg width="182" height="207" viewBox="0 0 182 207" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_386_6662)">
                <path d="M181.998 155.332L134.553 182.321L181.899 51.8064L181.998 155.332Z" fill="#71A5FF" />
                <path d="M91.1781 0L138.605 27.0415L0.0859375 51.9378L91.1781 0Z" fill="#71A5FF" />
                <path d="M181.892 51.8098L181.941 105.776L91.1699 0L181.892 51.8098Z" fill="#4473C5" />
                <path d="M0 155.28V101.265L91.1838 207L0 155.28Z" fill="#71A5FF" />
                <path d="M0.0840017 51.9376L47.4762 24.9111L0 155.275L0.0840017 51.9376Z" fill="#4473C5" />
                <path d="M91.1858 207L43.7363 180.083L181.999 155.337L91.1858 207Z" fill="#4473C5" />
            </g>
            <defs>
                <clipPath id="clip0_386_6662">
                    <rect width="182" height="207" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.preloader {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: 100px;
    display: grid;
    place-items: center;
    z-index: 10000;

    svg {
        animation: rotate 10s linear infinite;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>