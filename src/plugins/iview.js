import Vue from 'vue'
import iView from 'iview'
import i18n from '@/locales'

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value),//兼容iveiw
    transfer: true,
    size: 'large',
    select: {
        arrow: 'md-arrow-dropdown',
        arrowSize: 20
    }
})

import 'iview/dist/styles/iview.css'
