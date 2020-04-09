import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n';

import LocaleEn    from "../locale/en.ts"
import LocaleCh from "../locale/chinese.ts"

Vue.use(Vuetify)
Vue.use(VueI18n)

const messages = {
  en: LocaleEn,
  zhHans: LocaleCh
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  messages,
})

export { i18n }

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
    en: function() { i18n.locale = 'en' },
    ch: function() { i18n.locale = 'zhHans' },
  },
})
