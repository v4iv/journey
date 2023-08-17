import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import common from '@/i18n/locales/en/common.json'

export const defaultNS = 'common'

export const resources = {
  en: {common},
} as const

i18n.use(initReactI18next).init({
  debug: import.meta.env.DEV,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  defaultNS,
  resources,
  saveMissing: import.meta.env.DEV,
})
