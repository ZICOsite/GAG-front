import { createI18n, useI18n } from "vue-i18n";
import ru from "./locales/ru.json";

export const i18n = createI18n({
    legacy: false,
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    globalInjection: true,
    messages: {ru}
})