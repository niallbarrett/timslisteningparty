import Vue from 'vue'
import App from './App.vue'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:4000')
  })
)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
