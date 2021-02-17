import Vue from 'vue'
import App from './App.vue'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import VTooltip from 'v-tooltip'

import store from '@/store'

Vue.use(VTooltip, {
  popover: {
    defaultInnerClass: 'popover-inner'
  }
})
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO(`http://localhost:${process.env.VUE_APP_NODE_PORT}`)
  })
)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
