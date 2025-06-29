import { createI18n } from 'vue-i18n'
import en from './locale/en'
import es from './locale/es'

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
})

export default i18n
