import Vue from 'vue'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US';

Vue.use(iView, {
    transfer: true,
    size: 'large',
    select: {
        arrow: 'md-arrow-dropdown',
        arrowSize: 20
    }
},locale)

import 'iview/dist/styles/iview.css'
